import { Controller } from '@nestjs/common';
import { ClinicPromotionPhotoService } from './clinic-promotion-photo.service';

@Controller('clinic-promotion-photo')
export class ClinicPromotionPhotoController {
  constructor(private readonly clinicPromotionPhotoService: ClinicPromotionPhotoService) {}
}
