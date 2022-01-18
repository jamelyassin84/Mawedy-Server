import { ClinicRating } from './clinic-rating.entity'
import { ClinicRatingDto } from './clinic-rating.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicRatingsService {
	constructor() {}

	async findAll(): Promise<ClinicRating[]> {
		const data = await ClinicRating.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicRating> {
		try {
			const data = await ClinicRating.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicRatingDto | any): Promise<ClinicRating> {
		try {
			const data = ClinicRating.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicRating.findOne({
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
		body: ClinicRatingDto | any,
	): Promise<ClinicRating | any> {
		try {
			const data = await ClinicRating.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicRating> {
		try {
			const data = await ClinicRating.findOneOrFail(id)
			ClinicRating.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
