import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogginController } from './loggin/loggin.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FileService } from './file/file.service';
import { FileController } from './file/file.controller';
import { ProjectFilesService } from './project-files/project-files.service';
import { ProjectFilesController } from './project-files/project-files.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, AuthModule],
  controllers: [
    AppController,
    LogginController,
    FileController,
    ProjectFilesController,
  ],
  providers: [AppService, FileService, ProjectFilesService],
})
export class AppModule {}
