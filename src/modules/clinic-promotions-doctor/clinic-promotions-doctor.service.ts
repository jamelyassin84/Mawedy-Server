import { ClinicPromotionDoctorDto } from './clinic-promotions-doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicPromotionDoctor } from './clinic-promotions-doctor.entity'

@Injectable()
export class ClinicPromotionsDoctorsService {
	constructor() {}

	async findAll(): Promise<ClinicPromotionDoctor[]> {
		const data = await ClinicPromotionDoctor.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPromotionDoctor> {
		try {
			const data = await ClinicPromotionDoctor.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicPromotionDoctorDto | any,
	): Promise<ClinicPromotionDoctor> {
		try {
			const data = ClinicPromotionDoctor.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicPromotionDoctor.findOne({
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
		body: ClinicPromotionDoctorDto | any,
	): Promise<ClinicPromotionDoctor | any> {
		try {
			const data = await ClinicPromotionDoctor.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPromotionDoctor> {
		try {
			const data = await ClinicPromotionDoctor.findOneOrFail(id)
			ClinicPromotionDoctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
