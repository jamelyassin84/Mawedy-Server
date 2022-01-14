import { Module } from '@nestjs/common';
import { PatientSearchService } from './patient-search.service';
import { PatientSearchController } from './patient-search.controller';

@Module({
  controllers: [PatientSearchController],
  providers: [PatientSearchService]
})
export class PatientSearchModule {}
