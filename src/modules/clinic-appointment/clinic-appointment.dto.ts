import { AppointmentStatus } from './clinic-appointment.entity'
import { PatientType } from './../patient/patient.dto'
import { ClinicSubscription } from './../clinic-subscription/clinic-subscription.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { BaseEntity } from 'typeorm'
import { Patient } from '../patient/patient.entity'

export class ClinicAppointmentDto extends BaseEntity {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	bookedThrough: PatientType = 'app'

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	date: Date

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	time: Date

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	appointment_type: PatientType = 'app'

	@ApiProperty()
	comments: string = 'app'

	@ApiProperty()
	status: AppointmentStatus = null

	@ApiProperty()
	booking_reference: number = null

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	doctor_id: number

	@ApiProperty()
	patientId: number

	@ApiProperty()
	clinicId: number

	clinic?: Clinic
	patient?: Patient
}
