import { Module } from '@nestjs/common';
import { DoctorOverallRatingService } from './doctor-overall-rating.service';
import { DoctorOverallRatingController } from './doctor-overall-rating.controller';

@Module({
  controllers: [DoctorOverallRatingController],
  providers: [DoctorOverallRatingService]
})
export class DoctorOverallRatingModule {}
