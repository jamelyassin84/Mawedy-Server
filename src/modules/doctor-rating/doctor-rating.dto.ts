import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

export class DoctorRatingDto {
	@IsNotEmpty()
	@ApiProperty()
	rating: number = 0

	clinic?: Clinic
	patient: Patient
}
