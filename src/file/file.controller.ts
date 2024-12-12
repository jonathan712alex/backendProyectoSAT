import { Controller, Get, Param, NotFoundException, Res, Query } from '@nestjs/common';
import { FileService } from './file.service';
import * as path from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // Endpoint para obtener los archivos de una carpeta
  @Get(':folderName')
  async getFiles(@Param('folderName') folderName: string): Promise<string[]> {
    const files = await this.fileService.listFiles(folderName);

    if (!files || files.length === 0) {
      throw new NotFoundException('No se encontraron archivos en esta carpeta');
    }

    return files; // Devuelve la lista de archivos
  }

  // Endpoint para servir un archivo Excel específico y obtener los datos de la segunda hoja
  @Get('view/:folderName/:filename')
  async getFile(
    @Param('folderName') folderName: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const directoryPath = path.join('C:/Users/MUGF001N/Documents/diccionarios', folderName);
    const filePath = path.join(directoryPath, filename);

    if (fs.existsSync(filePath)) {
      try {
        const sheetData = await this.fileService.getSecondSheetWithData(folderName, filename);
        res.setHeader('Content-Type', 'application/json');
        res.send(sheetData);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    } else {
      throw new NotFoundException('Archivo no encontrado');
    }
  }

  
}
