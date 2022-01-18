import { ApiProperty } from '@nestjs/swagger'
import { Clinic } from '../clinic/clinic.entity'
export class PatientBookingListDto {
	@ApiProperty()
	has_canceled: boolean = false

	@ApiProperty()
	has_result: boolean = false

	@ApiProperty()
	doctorId: number

	@ApiProperty()
	clinicAppointmentId: number

	@ApiProperty()
	referenceNumber: number

	@ApiProperty()
	patientBookingListReferId: number

	clinic: Clinic
}
