import { Controller } from '@nestjs/common';
import { DoctorRatingService } from './doctor-rating.service';

@Controller('doctor-rating')
export class DoctorRatingController {
  constructor(private readonly doctorRatingService: DoctorRatingService) {}
}
