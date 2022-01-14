import { Controller } from '@nestjs/common';
import { PatientBookingListService } from './patient-booking-list.service';

@Controller('patient-booking-list')
export class PatientBookingListController {
  constructor(private readonly patientBookingListService: PatientBookingListService) {}
}
