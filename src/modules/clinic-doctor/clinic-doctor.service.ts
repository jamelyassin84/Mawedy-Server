import { ClinicDoctorDto } from './clinic-doctor.dto'

import { ClinicDoctor } from './clinic-doctor.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicDoctorsService {
	constructor() {}

	async findAll(): Promise<ClinicDoctor[]> {
		const data = await ClinicDoctor.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findAllByClinic(id: number): Promise<ClinicDoctor[]> {
		try {
			return await ClinicDoctor.find({
				where: {
					clinic: id,
				},
				relations: ['doctors', 'clinic'],
			})
		} catch (error) {
			console.error(error)
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async findOne(id: number): Promise<ClinicDoctor> {
		try {
			const data = await ClinicDoctor.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicDoctorDto | any): Promise<ClinicDoctor> {
		try {
			const data = ClinicDoctor.create(body) as any
			await data.save()
			return data
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicDoctorDto | any,
	): Promise<ClinicDoctor | any> {
		try {
			const data = await ClinicDoctor.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicDoctor> {
		try {
			const data = await ClinicDoctor.findOneOrFail(id)
			ClinicDoctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
