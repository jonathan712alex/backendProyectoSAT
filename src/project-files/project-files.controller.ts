/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ProjectFilesService } from './project-files.service';
import { Response } from 'express';

@Controller('project-files')
export class ProjectFilesController {
  constructor(private readonly projectFilesService: ProjectFilesService) {}

  @Get('folders')
  getFolders(): string[] {
    return this.projectFilesService.getFolders();
  }

  @Get('files/:folderName')
  getFilesInFolder(@Param('folderName') folderName: string): string[] {
    return this.projectFilesService.getFilesInFolder(folderName);
  }

  @Get('download/:folderName/:fileName')
  async downloadFile(
    @Param('folderName') folderName: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    try {
      // Obtener el contenido del archivo en Buffer
      const fileBuffer = await this.projectFilesService.downloadFile(folderName, fileName);

      // Establecer los encabezados de la respuesta para la descarga
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${fileName}`,
        'Content-Length': fileBuffer.length,
      });

      // Enviar el archivo como respuesta
      res.end(fileBuffer);
    } catch (error) {
      res.status(404).send(error.message);  // Si no se encuentra el archivo, devolver un error
    }
  }
}
