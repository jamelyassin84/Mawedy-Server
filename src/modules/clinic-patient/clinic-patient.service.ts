import { ClinicPatient } from './clinic-patient.entity'
import { ClinicPatientDto } from './clinic-patient.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicPatientService {
	constructor() {}

	async findAll(): Promise<ClinicPatient[]> {
		const data = await ClinicPatient.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPatient> {
		try {
			const data = await ClinicPatient.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicPatientDto | any): Promise<ClinicPatient> {
		try {
			const data = ClinicPatient.create(body) as any
			return data.save()
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicPatientDto | any,
	): Promise<ClinicPatient | any> {
		try {
			const data = await ClinicPatient.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPatient> {
		try {
			const data = await ClinicPatient.findOneOrFail(id)
			ClinicPatient.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
