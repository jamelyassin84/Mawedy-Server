import { Module } from '@nestjs/common';
import { DoctorRatingService } from './doctor-rating.service';
import { DoctorRatingController } from './doctor-rating.controller';

@Module({
  controllers: [DoctorRatingController],
  providers: [DoctorRatingService]
})
export class DoctorRatingModule {}
