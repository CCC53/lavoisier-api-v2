import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadProvider } from './upload.provider';
import { UploadController } from './upload.controller';
import { HistorialClinicoModule } from '../historial-clinico/historial-clinico.module';

@Module({
  imports: [HistorialClinicoModule],
  controllers: [UploadController],
  providers: [UploadService, UploadProvider]
})
export class UploadModule {}
