import { ApiProperty } from '@nestjs/swagger'
import { Clinic } from '../clinic/clinic.entity'
export class PatientBookingListDto {
	@ApiProperty()
	hasCanceled?: boolean = false

	@ApiProperty()
	hasResult?: boolean = false

	@ApiProperty()
	clinicAppointmentId: number

	@ApiProperty()
	referenceNumber: number

	@ApiProperty()
	patientBookingListReferId: number

	clinic: Clinic
}
