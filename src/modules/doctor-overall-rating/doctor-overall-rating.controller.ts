import { Controller } from '@nestjs/common';
import { DoctorOverallRatingService } from './doctor-overall-rating.service';

@Controller('doctor-overall-rating')
export class DoctorOverallRatingController {
  constructor(private readonly doctorOverallRatingService: DoctorOverallRatingService) {}
}
