import { ClinicMedicalServiceDto } from './clinic-medical-service.dto'
import { ClinicMedicalService } from './clinic-medical-service.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicMedicalServiceService {
	constructor() {}

	async findAll(): Promise<ClinicMedicalService[]> {
		const data = await ClinicMedicalService.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicMedicalService> {
		try {
			const data = await ClinicMedicalService.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicMedicalServiceDto | any,
	): Promise<ClinicMedicalService> {
		try {
			const data = ClinicMedicalService.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicMedicalService.findOne({
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
		body: ClinicMedicalServiceDto | any,
	): Promise<ClinicMedicalService | any> {
		try {
			const data = await ClinicMedicalService.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicMedicalService> {
		try {
			const data = await ClinicMedicalService.findOneOrFail(id)
			ClinicMedicalService.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
