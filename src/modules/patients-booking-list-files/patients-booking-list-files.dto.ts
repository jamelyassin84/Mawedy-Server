import { PatientBookingList } from './../patient-booking-list/patient-booking-list.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class PatientBookingListFileDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	url: string

	patientBookingList: PatientBookingList
}
