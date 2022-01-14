import { Controller } from '@nestjs/common';
import { PatientSearchService } from './patient-search.service';

@Controller('patient-search')
export class PatientSearchController {
  constructor(private readonly patientSearchService: PatientSearchService) {}
}
