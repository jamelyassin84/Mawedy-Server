import { Controller } from '@nestjs/common';
import { PatientsBookingListFilesService } from './patients-booking-list-files.service';

@Controller('patients-booking-list-files')
export class PatientsBookingListFilesController {
  constructor(private readonly patientsBookingListFilesService: PatientsBookingListFilesService) {}
}
