import { ClinicRatingViaGoogleDto } from './clinic-ratings-via-google.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicRatingViaGoogle } from './clinic-ratings-via-google.entity'

@Injectable()
export class ClinicRatingsViaGoogleService {
	constructor() {}

	async findAll(): Promise<ClinicRatingViaGoogle[]> {
		const data = await ClinicRatingViaGoogle.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicRatingViaGoogle> {
		try {
			const data = await ClinicRatingViaGoogle.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicRatingViaGoogleDto | any,
	): Promise<ClinicRatingViaGoogle> {
		try {
			const data = ClinicRatingViaGoogle.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicRatingViaGoogle.findOne({
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
		body: ClinicRatingViaGoogleDto | any,
	): Promise<ClinicRatingViaGoogle | any> {
		try {
			const data = await ClinicRatingViaGoogle.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicRatingViaGoogle> {
		try {
			const data = await ClinicRatingViaGoogle.findOneOrFail(id)
			ClinicRatingViaGoogle.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
