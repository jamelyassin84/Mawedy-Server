import { ClinicPromotionPhotoDto } from './clinic-promotion-photo.dto'
import { ClinicPromotionPhoto } from './clinic-promotion-photo.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicPromotionPhotoService {
	constructor() {}

	async findAll(): Promise<ClinicPromotionPhoto[]> {
		const data = await ClinicPromotionPhoto.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPromotionPhoto> {
		try {
			const data = await ClinicPromotionPhoto.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicPromotionPhotoDto | any,
	): Promise<ClinicPromotionPhoto> {
		try {
			const data = ClinicPromotionPhoto.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicPromotionPhoto.findOne({
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
		body: ClinicPromotionPhotoDto | any,
	): Promise<ClinicPromotionPhoto | any> {
		try {
			const data = await ClinicPromotionPhoto.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPromotionPhoto> {
		try {
			const data = await ClinicPromotionPhoto.findOneOrFail(id)
			ClinicPromotionPhoto.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
