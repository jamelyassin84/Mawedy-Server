import { ApiProperty } from '@nestjs/swagger'
export class PatientBookingFollowUpDto {
	@ApiProperty()
	should_follow_up: boolean = false
	patientBookingListId: number
}
