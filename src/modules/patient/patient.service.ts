import { ClinicPatientService } from './../clinic-patient/clinic-patient.service'
import { PatientDto } from './patient.dto'

import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Patient } from './patient.entity'
import { EmailsService } from '../email/email.service'
import { PhonesService } from '../phone/phone.service'

@Injectable()
export class PatientService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected clinicPatientService: ClinicPatientService,
	) {}

	async findAll(): Promise<Patient[]> {
		const patients = await Patient.find({
			relations: ['phones', 'emails', 'avatars', 'clinicPatient'],
		})
		return patients
	}

	async findOne(id: number): Promise<Patient> {
		try {
			return await Patient.findOneOrFail(id, {
				relations: ['phones', 'emails', 'avatars', 'clinicPatient'],
			})
		} catch (error) {
			throw new NotFoundException('patient might be moved or deleted.')
		}
	}

	async create(body: PatientDto | any): Promise<Patient> {
		try {
			const patient = Patient.create(body) as any

			await patient.save()

			await this.emailService.create({
				patient: patient,
				email: body.email,
				userType: 'doctor',
			})

			await this.phoneService.create(
				Object.assign({
					patient: patient,
					phone: body.phone,
					userType: 'doctor',
				}),
			)

			this.clinicPatientService.create({
				patient: patient,
				clinic: body.clinic,
			})

			return patient
		} catch (error) {
			console.log(error)
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: PatientDto | any): Promise<Patient | any> {
		try {
			const patient = await Patient.update(id, body)
			return patient
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Patient> {
		try {
			const patient = await Patient.findOneOrFail(id)
			Patient.delete(id)
			return patient
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async findByUsername(username: string): Promise<Patient> {
		return await Patient.findOneOrFail({
			where: {
				username: username,
			},
		})
	}
}
