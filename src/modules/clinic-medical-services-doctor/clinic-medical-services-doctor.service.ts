import { ClinicMedicalServiceDoctorDto } from './clinic-medical-services-doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicMedicalServiceDoctor } from './clinic-medical-services-doctor.entity'

@Injectable()
export class ClinicMedicalServicesDoctorsService {
	constructor() {}

	async findAll(): Promise<ClinicMedicalServiceDoctor[]> {
		const data = await ClinicMedicalServiceDoctor.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicMedicalServiceDoctor> {
		try {
			const data = await ClinicMedicalServiceDoctor.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicMedicalServiceDoctorDto | any,
	): Promise<ClinicMedicalServiceDoctor> {
		try {
			const data = ClinicMedicalServiceDoctor.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicMedicalServiceDoctor.findOne({
				where: { id: params.id },
				relations: ['emails', 'phones', 'devices'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicMedicalServiceDoctorDto | any,
	): Promise<ClinicMedicalServiceDoctor | any> {
		try {
			const data = await ClinicMedicalServiceDoctor.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicMedicalServiceDoctor> {
		try {
			const data = await ClinicMedicalServiceDoctor.findOneOrFail(id)
			ClinicMedicalServiceDoctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
