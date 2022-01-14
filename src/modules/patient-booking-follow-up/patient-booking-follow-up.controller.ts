import { Controller } from '@nestjs/common';
import { PatientBookingFollowUpService } from './patient-booking-follow-up.service';

@Controller('patient-booking-follow-up')
export class PatientBookingFollowUpController {
  constructor(private readonly patientBookingFollowUpService: PatientBookingFollowUpService) {}
}
