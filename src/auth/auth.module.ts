import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // clave segura
      signOptions: { expiresIn: '1h' }, // Token válido por 1 hora
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
