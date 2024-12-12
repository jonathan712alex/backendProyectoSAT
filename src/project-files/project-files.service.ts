/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProjectFilesService {
  private readonly folderPath = path.resolve('C:\\Users\\MUGF001N\\Documents\\documentaciones'); // Ruta de la carpeta

  getFolders(): string[] {
    const directories = fs.readdirSync(this.folderPath, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);
    return directories;
  }

  getFilesInFolder(folderName: string): string[] {
    const folderPath = path.join(this.folderPath, folderName); // Carpeta específica
    const files = fs.readdirSync(folderPath).filter(item => !fs.statSync(path.join(folderPath, item)).isDirectory());
    return files;
  }

  // Esta es la nueva función que debes agregar para obtener la ruta completa del archivo
  async getFilePath(folderName: string, fileName: string): Promise<string> {
    const folderPath = path.join(this.folderPath, folderName);
    const filePath = path.join(folderPath, fileName);

    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
      return filePath;
    } else {
      throw new Error(`El archivo ${fileName} no existe en la carpeta ${folderName}`);
    }
  }

  // Función para descargar el archivo (usando la ruta completa)
  async downloadFile(folderName: string, fileName: string): Promise<Buffer> {
    const filePath = await this.getFilePath(folderName, fileName); // Obtener la ruta del archivo
    return fs.readFileSync(filePath);  // Leer el archivo en Buffer
  }
}
