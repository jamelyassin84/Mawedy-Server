import { ClinicPromotionDto } from './clinic-promotion.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicPromotion } from './clinic-promotion.entity'

@Injectable()
export class ClinicPromotionService {
	constructor() {}

	async findAll(): Promise<ClinicPromotion[]> {
		const data = await ClinicPromotion.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPromotion> {
		try {
			const data = await ClinicPromotion.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicPromotionDto | any): Promise<ClinicPromotion> {
		try {
			const data = ClinicPromotion.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicPromotion.findOne({
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
		body: ClinicPromotionDto | any,
	): Promise<ClinicPromotion | any> {
		try {
			const data = await ClinicPromotion.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPromotion> {
		try {
			const data = await ClinicPromotion.findOneOrFail(id)
			ClinicPromotion.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
