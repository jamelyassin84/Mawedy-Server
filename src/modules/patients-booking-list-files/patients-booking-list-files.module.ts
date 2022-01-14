import { Module } from '@nestjs/common';
import { PatientsBookingListFilesService } from './patients-booking-list-files.service';
import { PatientsBookingListFilesController } from './patients-booking-list-files.controller';

@Module({
  controllers: [PatientsBookingListFilesController],
  providers: [PatientsBookingListFilesService]
})
export class PatientsBookingListFilesModule {}
