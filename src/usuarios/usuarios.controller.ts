// usuarios.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('autenticar')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('verificar')
  verificarUsuario(@Body() body: { usuario: string; password: string }) {
    const { usuario, password } = body;

    // Verificar si el usuario y la contraseña coinciden
    let esValido = this.usuariosService.verificarUsuario(usuario, password);
    //esValido=true;
    if (esValido) {
      return { mensaje: 'Usuario autenticado correctamente', exito: true };
    } else {
      return { mensaje: 'Usuario o contraseña incorrectos', exito: false };
    }
  }
}
