import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {
  private readonly rootPath: string = 'C:\\Users\\MUGF001N\\Documents\\diccionarios';

  // Método para listar los archivos de una carpeta específica
  async listFiles(folderName: string): Promise<string[]> {
    const folderPath = path.join(this.rootPath, folderName);

    try {
      const files = await fs.promises.readdir(folderPath);
      return files.filter((file) => (file.endsWith('.xlsx') || file.endsWith('.xls')) && file.startsWith('DL'));
    } catch (error) {
      console.error('Error al leer la carpeta:', error);
      return [];
    }
  }

  // Método para leer la segunda hoja de un archivo Excel
  async getSecondSheetWithData(folderName: string, fileName: string): Promise<any[]> {
    const filePath = path.join(this.rootPath, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('Archivo no encontrado');
    }

    const workbook = XLSX.readFile(filePath);

    if (workbook.SheetNames.length < 2) {
      throw new Error('El archivo no tiene una segunda hoja');
    }

    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    if (data.length === 0 || !data.some((row) => Array.isArray(row) && row.length > 0)) {
      throw new Error('La segunda hoja no tiene datos');
    }

    return data;
  }
}
