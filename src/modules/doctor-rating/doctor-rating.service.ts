import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { DoctorRatingDto } from './doctor-rating.dto'
import { DoctorRating } from './doctor-rating.entity'

@Injectable()
export class DoctorRatingService {
	constructor() {}

	async findAll(): Promise<DoctorRating[]> {
		const data = await DoctorRating.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<DoctorRating> {
		try {
			const data = await DoctorRating.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: DoctorRatingDto | any): Promise<DoctorRating> {
		try {
			const data = DoctorRating.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await DoctorRating.findOne({
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
		body: DoctorRatingDto | any,
	): Promise<DoctorRating | any> {
		try {
			const data = await DoctorRating.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<DoctorRating> {
		try {
			const data = await DoctorRating.findOneOrFail(id)
			DoctorRating.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
