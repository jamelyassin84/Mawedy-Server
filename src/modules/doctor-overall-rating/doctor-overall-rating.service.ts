import { DoctorOverAllRatingDto } from './doctor-overall-rating.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { DoctorOverAllRating } from './doctor-overall-rating.entity'

@Injectable()
export class DoctorOverallRatingService {
	constructor() {}

	async findAll(): Promise<DoctorOverAllRating[]> {
		const data = await DoctorOverAllRating.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<DoctorOverAllRating> {
		try {
			const data = await DoctorOverAllRating.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: DoctorOverAllRatingDto | any,
	): Promise<DoctorOverAllRating> {
		try {
			const data = DoctorOverAllRating.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await DoctorOverAllRating.findOne({
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
		body: DoctorOverAllRatingDto | any,
	): Promise<DoctorOverAllRating | any> {
		try {
			const data = await DoctorOverAllRating.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<DoctorOverAllRating> {
		try {
			const data = await DoctorOverAllRating.findOneOrFail(id)
			DoctorOverAllRating.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
