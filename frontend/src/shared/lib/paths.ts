import { path } from "static-path";

const root = path("/");

const auth = root.path("/auth");
const login = auth.path("/login");
const register = auth.path("/register");

const main = root.path("/main");
const chat = main.path("/chat/:chatId");

export { root, auth, login, register, main, chat };
