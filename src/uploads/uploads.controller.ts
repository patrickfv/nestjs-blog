import { Controller, UploadedFile, UseGuards, UseInterceptors, Post } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadsService.uploadFile(file)
        return { url }
    }
}
