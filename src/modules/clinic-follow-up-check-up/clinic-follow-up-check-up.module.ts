import { Module } from '@nestjs/common';
import { ClinicFollowUpCheckUpService } from './clinic-follow-up-check-up.service';
import { ClinicFollowUpCheckUpController } from './clinic-follow-up-check-up.controller';

@Module({
  controllers: [ClinicFollowUpCheckUpController],
  providers: [ClinicFollowUpCheckUpService]
})
export class ClinicFollowUpCheckUpModule {}
