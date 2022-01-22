import { Module } from '@nestjs/common';
import { ClinicServiceService } from './clinic-service.service';
import { ClinicServiceController } from './clinic-service.controller';

@Module({
  controllers: [ClinicServiceController],
  providers: [ClinicServiceService]
})
export class ClinicServiceModule {}
