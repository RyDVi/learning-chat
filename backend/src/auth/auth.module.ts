import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WsAuthGuard } from './guards/wsauth.guard';
import { WsAuthService } from './wsauth.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, WsAuthGuard, WsAuthService],
  exports: [AuthService, WsAuthService],
})
export class AuthModule {}
