import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { HistorialClinicoService } from '../historial-clinico/historial-clinico.service';

@Injectable()
export class UploadService {
    private folder: string = process.env.UPLOAD_FOLDER;
    private logger = new Logger("Upload Service");

    constructor(private historialService: HistorialClinicoService) {}

    private async upload(file: Express.Multer.File, historialId: string) {
        try {
            const date = new Date().getTime();
            const name = `${historialId}-${date}`;
            const upload = await cloudinary.uploader.upload_stream({ folder: this.folder, public_id: name });
            toStream(file.buffer).pipe(upload);
            const public_id = `${this.folder}/${name}`
            return cloudinary.url(public_id);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    private async removeFile(fileUrl: string) {
        try {
            const [, , , , , , , , image] = fileUrl.split('/');
            const [name] = image.split('.');
            const id = `${this.folder}/${name}`;
            await cloudinary.uploader.destroy(id);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateHistorial(file: Express.Multer.File, historialId: string ) {
        try {
            const historial = await this.historialService.findOne(historialId);
            const fileUrl = await this.upload(file, historialId);
            if (historial.alimentacion) {
                await this.removeFile(historial.alimentacion);
            }
            return await this.historialService.uploadAlimentacion(historialId, fileUrl);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}