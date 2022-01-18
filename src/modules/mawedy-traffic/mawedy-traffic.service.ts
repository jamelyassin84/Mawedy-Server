import { AppTrafficDto } from './mawedy-traffic.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { AppTraffic } from './mawedy-traffic.entity'

@Injectable()
export class MawedyTrafficService {
	constructor() {}

	async findAll(): Promise<AppTraffic[]> {
		const data = await AppTraffic.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<AppTraffic> {
		try {
			const data = await AppTraffic.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: AppTrafficDto | any): Promise<AppTraffic> {
		try {
			const data = AppTraffic.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await AppTraffic.findOne({
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
		body: AppTrafficDto | any,
	): Promise<AppTraffic | any> {
		try {
			const data = await AppTraffic.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<AppTraffic> {
		try {
			const data = await AppTraffic.findOneOrFail(id)
			AppTraffic.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
