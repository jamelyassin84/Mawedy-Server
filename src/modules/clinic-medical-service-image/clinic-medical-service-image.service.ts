import { ClinicMedicalServiceImageDto } from './clinic-medical-service-image.dto'
import { ClinicMedicalServiceImage } from './clinic-medical-service-image.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicMedicalServiceImageService {
	constructor() {}

	async findAll(): Promise<ClinicMedicalServiceImage[]> {
		const data = await ClinicMedicalServiceImage.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicMedicalServiceImage> {
		try {
			const data = await ClinicMedicalServiceImage.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicMedicalServiceImageDto | any,
	): Promise<ClinicMedicalServiceImage> {
		try {
			const data = ClinicMedicalServiceImage.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicMedicalServiceImage.findOne({
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
		body: ClinicMedicalServiceImageDto | any,
	): Promise<ClinicMedicalServiceImage | any> {
		try {
			const data = await ClinicMedicalServiceImage.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicMedicalServiceImage> {
		try {
			const data = await ClinicMedicalServiceImage.findOneOrFail(id)
			ClinicMedicalServiceImage.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
