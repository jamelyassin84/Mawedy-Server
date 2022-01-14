import { Module } from '@nestjs/common';
import { ClinicPromotionPhotoService } from './clinic-promotion-photo.service';
import { ClinicPromotionPhotoController } from './clinic-promotion-photo.controller';

@Module({
  controllers: [ClinicPromotionPhotoController],
  providers: [ClinicPromotionPhotoService]
})
export class ClinicPromotionPhotoModule {}
