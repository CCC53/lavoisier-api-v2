import { Response } from 'express';
import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors, ParseUUIDPipe, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { ValidRoles } from '../personal/enum/valid.roles';
import { Personal } from '../personal/entities/personal.entity';
import { UploadService } from './upload.service';

@Controller('upload') @UseGuards(JwtGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post(':historialId') @UseInterceptors(FileInterceptor('file')) 
  async upload(@ValidateRole(ValidRoles.nutriologo) user: Personal, @Param('historialId', ParseUUIDPipe) historialId: string, @Res() res: Response,
    @UploadedFile() file: Express.Multer.File) {
      const historialClinico = await this.uploadService.updateHistorial(file, historialId);
      res.json({
        historialClinico
      });
  }
}