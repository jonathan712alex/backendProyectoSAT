/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Lista estática de usuarios
  private users = [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'jonathan', password: 'password' },
    { id: 3, username: 'frank', password: 'password' },
  ];

  // Validar usuario y contraseña
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      const { password, ...result } = user; // No devolver la contraseña
      return result;
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  // Generar token JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
