import { Usuario } from './usuarios.interface';
import { Injectable } from '@nestjs/common';


@Injectable()

export class UsuariosService{


    private usuarios: Usuario[] = [

        { usuario:'jonathan' , password:'pass'},
        { usuario:'alex' , password:'pass'},
        { usuario:'salcedo' , password:'pass'},
        { usuario:'frank@sat.gob.mx' , password:'pass'}
];

verificarUsuario (usuario:string , password:string): boolean{
    const usuarioValido = this.usuarios.find(
        (u) => u.usuario === usuario && u.password === password
      );

      return !!usuarioValido;
}


}