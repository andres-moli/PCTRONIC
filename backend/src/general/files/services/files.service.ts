import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { FileInfo } from '../entities/file-info.entity';
import { CreateFileInput } from '../dto/inputs/create-file.input';
import { FileModes } from '../enums/file-modes.enum';
import { FilesManagerService } from './files-manager.service';
import { getMimeTypeFromExtension } from '../functions/content-type';
import { DataService } from '../../../patterns/crud-pattern/mixins/data-service.mixin';
import { IContext } from '../../../patterns/crud-pattern/interfaces/context.interface';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
// src/firebase/firebase.service.ts
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import sharp from 'sharp';
const serviceAccountPath = join(process.cwd(), 'firebase', 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'andres-e8af5.firebasestorage.app',
});

export const bucket = admin.storage().bucket();

@Injectable()
export class FilesService extends DataService(FileInfo) {

    constructor(
        private filesManagerService: FilesManagerService,
    ){ super();}

    async create(context:IContext, createFileInput:CreateFileInput): Promise<FileInfo>{
        const file = {} as FileInfo;

        const mongoData = this.filesManagerService.parseFileName(createFileInput.fileName);
        file.fileExtension  = mongoData.fileType
        file.fileMode = process.env.DB_FILE_MODE as FileModes
        file.fileName = mongoData.fileName
        file.fileMongoId = createFileInput.fileMongoId
        file.fileBuffer = createFileInput.fileBuffer ? Buffer.from(createFileInput.fileBuffer, 'base64') : null;
        // file.fileUrl = process.env.DB_FILE_MODE as FileModes === FileModes.url ? this.
        const repository = this.getRepository(context);

        const result = await repository.save(file);
        delete result.fileBuffer;
        return result;
    }


    async saveImageUrl(context: IContext, file: Express.Multer.File): Promise<FileInfo> {
    const repository = this.getRepository(context);

    if (!file) {
        throw new Error('No se envió ningún archivo');
    }

    const isImage = file.mimetype.startsWith('image/');
    const isPDF = file.mimetype === 'application/pdf';

    if (!isImage && !isPDF) {
        throw new Error('Solo se permiten imágenes o archivos PDF');
    }

    const uuid = uuidv4();
    const originalExt = isImage ? '.webp' : '.pdf';
    const fileName = `${Date.now()}-${uuid}${originalExt}`;

    let bufferToUpload: Buffer;
    let contentType: string;

    if (isImage) {
        bufferToUpload = await sharp(file.buffer)
        .webp({ quality: 1 })
        .toBuffer();
        contentType = 'image/webp';
    } else {
        bufferToUpload = file.buffer;
        contentType = 'application/pdf';
    }

    const firebaseFile = bucket.file(fileName);

    await firebaseFile.save(bufferToUpload, {
        metadata: {
        contentType,
        metadata: {
            firebaseStorageDownloadTokens: uuid,
        },
        },
        resumable: false,
    });

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;

    const fileInfo = {
        fileName: fileName.replace(originalExt, ''),
        fileExtension: originalExt.slice(1), // 'webp' o 'pdf'
        fileMode: process.env.DB_FILE_MODE as FileModes,
        fileUrl: publicUrl,
        isFireBase: true,
    };

    return await repository.save(fileInfo);
    }

    async deleteFile(context: IContext, id: string){
        const repository = this.getRepository(context);
    
        // Busca el archivo por ID
        const fileInfo = await repository.findOneBy({ id });
    
        if (!fileInfo) {
            throw new Error(`Archivo con ID ${id} no encontrado.`);
        }
    
        // Construye la ruta absoluta del archivo
        const filePath = join(__dirname, '..', '..', '..', '..', fileInfo.fileUrl);
    
        // Elimina el archivo físico si existe
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }
    
        // Elimina el registro en la base de datos
        await repository.softDelete({ id });
        return 'TODO BIEN'
    }
    async download(context:IContext, id: string, res: Response): Promise<void> {
        const repository = this.getRepository(context);
        const entity = await repository.findOne({ where: { id }, select: ["fileBuffer", "fileExtension", "fileMode", "fileMongoId", "fileName"] });

        res.header('Content-Type', await getMimeTypeFromExtension(entity.fileExtension));
        res.header('Content-Disposition', `attachment; filename=${entity.fileName}.${entity.fileExtension}`);

        switch(entity.fileMode){
            case FileModes.mongo:
                const fileStream = await this.filesManagerService.readStream(entity.fileMongoId?.trim());
                if (!fileStream) {
                  throw new InternalServerErrorException('File not found');
                }
            
                fileStream.once('error', (error) => {
                    throw new InternalServerErrorException('File can´t read, ' + error);
                });
            
                fileStream.pipe(res);
                break;
            case FileModes.buffer:
                res.send(entity.fileBuffer);
                break;
            case FileModes.url:
                break;
            default:
                throw new BadRequestException('File mode not found');
        }
    }

}
