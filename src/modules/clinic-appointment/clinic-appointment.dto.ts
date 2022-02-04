import { Doctor } from './../doctor/doctor.entity'
import { AppointmentStatus } from './clinic-appointment.entity'
import { PatientType } from './../patient/patient.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { BaseEntity } from 'typeorm'
import { Patient } from '../patient/patient.entity'
import { ClinicMedicalService } from '../clinic-medical-service/clinic-medical-service.entity'

export class ClinicAppointmentDto extends BaseEntity {
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
	comments: string | null = null

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	doctor: Doctor

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	clinic?: Clinic

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	service?: ClinicMedicalService

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	patient?: Patient
}
