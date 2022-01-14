import { Controller } from '@nestjs/common';
import { ClinicRatingsViaGoogleService } from './clinic-ratings-via-google.service';

@Controller('clinic-ratings-via-google')
export class ClinicRatingsViaGoogleController {
  constructor(private readonly clinicRatingsViaGoogleService: ClinicRatingsViaGoogleService) {}
}
