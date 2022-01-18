import { ClinicPromotionAnalyticDto } from './clinic-promotion-analytic.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicPromotionAnalytic } from './clinic-promotion-analytic.entity'

@Injectable()
export class ClinicPromotionsAnalyticsService {
	constructor() {}

	async findAll(): Promise<ClinicPromotionAnalytic[]> {
		const data = await ClinicPromotionAnalytic.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPromotionAnalytic> {
		try {
			const data = await ClinicPromotionAnalytic.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicPromotionAnalyticDto | any,
	): Promise<ClinicPromotionAnalytic> {
		try {
			const data = ClinicPromotionAnalytic.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicPromotionAnalytic.findOne({
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
		body: ClinicPromotionAnalyticDto | any,
	): Promise<ClinicPromotionAnalytic | any> {
		try {
			const data = await ClinicPromotionAnalytic.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPromotionAnalytic> {
		try {
			const data = await ClinicPromotionAnalytic.findOneOrFail(id)
			ClinicPromotionAnalytic.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
