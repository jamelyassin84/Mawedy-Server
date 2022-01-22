import { MawedyImagesDto } from './mawedy-image.dto'
import { MawedyImages } from './mawedy-image.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class MawedyImagesService {
	constructor() {}

	async findAll(): Promise<MawedyImages[]> {
		const data = await MawedyImages.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<MawedyImages> {
		try {
			const data = await MawedyImages.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: MawedyImagesDto | any): Promise<MawedyImages> {
		try {
			const data = MawedyImages.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await MawedyImages.findOne({
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
		body: MawedyImagesDto | any,
	): Promise<MawedyImages | any> {
		try {
			const data = await MawedyImages.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<MawedyImages> {
		try {
			const data = await MawedyImages.findOneOrFail(id)
			MawedyImages.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
