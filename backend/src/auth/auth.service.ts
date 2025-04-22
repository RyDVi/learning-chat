import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './dto/payload';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: RegisterDto) {
    const { email, password } = dto;

    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return this.auth(res, user.id.toString());
  }

  async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.auth(res, user.id.toString());
  }

  async refresh(req: Request, res: Response) {
    const refreshToken: string = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

    if (!payload) throw new UnauthorizedException('Invalid refresh token');
    const user = await this.prismaService.user.findUnique({
      where: { id: BigInt(payload.id) },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not exist');
    }

    return this.auth(res, user.id.toString());
  }

  logout(res: Response) {
    this.setCookie(res, 'refreshToken', 'refreshToken', new Date(0));
    return { message: 'Logged out successfully' };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.JWT_ACCESS_TOKEN_TTL,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.JWT_REFRESH_TOKEN_TTL,
      }),
    };
  }

  private setCookie(res: Response, key: string, value: string, expires: Date) {
    res.cookie(key, value, {
      expires,
      httpOnly: true,
      secure: !isDev(this.configService),
      domain: this.COOKIE_DOMAIN,
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      'refreshToken',
      refreshToken,
      new Date(Date.now() + 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: BigInt(id),
      },
    });

    if (!user) {
      throw new NotFoundException('User is not exist');
    }

    return user;
  }
}
