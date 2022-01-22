import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

export class ClinicDoctorWorkingScheduleDto {
	@IsNotEmpty()
	@ApiProperty()
	day: Day

	@ApiProperty()
	time: string

	@ApiProperty()
	isActive: boolean = true

	clinic?: Clinic
	doctor?: Doctor
}

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
