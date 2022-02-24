import { Doctor } from './../doctor/doctor.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { BaseEntity } from 'typeorm'
import { ClinicMedicalService } from '../clinic-medical-service/clinic-medical-service.entity'
import { PatientType } from '../patients/patient/patient.dto'
import { Patient } from '../patients/patient/patient.entity'

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
