import { Module } from '@nestjs/common';
import { ClinicRatingsViaGoogleService } from './clinic-ratings-via-google.service';
import { ClinicRatingsViaGoogleController } from './clinic-ratings-via-google.controller';

@Module({
  controllers: [ClinicRatingsViaGoogleController],
  providers: [ClinicRatingsViaGoogleService]
})
export class ClinicRatingsViaGoogleModule {}
