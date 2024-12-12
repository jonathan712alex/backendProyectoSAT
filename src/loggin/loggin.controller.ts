import { Controller, Post, Body } from '@nestjs/common';

@Controller('loggin')
export class LogginController {

    @Post('verificar')
    verificarUsuario( @Body() body: {user:string; password:string}){
        const {user , password} =body;

        if ( user && password) {
            return{
                mensaje: 'Usuario: '+user+'Password: '+password,
                exito:true,
            };
            
        } else {
            return{
                mensaje:'Logeo incorrecto',
                exito:false,
            };
        }
    }

}
