/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

@Injectable()
export class FileService {
  
  //C:\\Users\\MUGF001N\\Documents\\diccionarios
  private readonly rootPath: string = 'C:\\Users\\jonat\\Desktop\\Nueva carpeta\\diccionarios';

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

  


  async getDescriptionFieldForTable(
    folderName: string,
    fileName: string,
    tableName: string,
  ): Promise<any[]> {
    const filePath = path.join(this.rootPath, folderName, fileName);
  
    if (!fs.existsSync(filePath)) {
      throw new Error('Archivo no encontrado');
    }
  
    const workbook = XLSX.readFile(filePath);
  
    // Usamos la primera hoja, ya que solo hay una hoja en este archivo
    const sheetName = workbook.SheetNames[0];  // Tomamos la primera hoja
    const worksheet = workbook.Sheets[sheetName];
  
    // Configuramos para que tome los encabezados desde la fila 7 (índice 6)
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // Aseguramos que se lea como array
      defval: '', // Para llenar celdas vacías con un valor vacío
      range: 6,  // Esto indica que comience desde la fila 7 (índice 6)
    });
  
    // Verificamos si hay datos
    if (data.length === 0 || !data.some((row) => Array.isArray(row) && row.length > 0)) {
      throw new Error('La hoja no tiene datos');
    }
  
    // Extraemos los encabezados desde la fila 7
    const headers = data[0] as string[]; // Asumimos que la primera fila contiene los encabezados
  
    const tableIndex = headers.indexOf('Descripción de la Tabla');
    const descriptionFieldIndex = headers.indexOf('Descripción del campo');
  
    if (tableIndex === -1 || descriptionFieldIndex === -1) {
      throw new Error('No se encontraron las columnas necesarias');
    }
  
    // Filtramos los datos de acuerdo a la tabla proporcionada
    const descriptionFields = data.slice(1) // Ignoramos la primera fila de encabezado
      .filter(row => row[tableIndex] === tableName)
      .map(row => row[descriptionFieldIndex]);
  
    return descriptionFields;
  }
  
}
