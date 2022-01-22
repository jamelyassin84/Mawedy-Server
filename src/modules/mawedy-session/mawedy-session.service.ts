import { AppSessionDto } from './mawedy-session.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { AppSession } from './mawedy-session.entity'

@Injectable()
export class MawedySessionService {
	constructor() {}

	async findAll(): Promise<AppSession[]> {
		const data = await AppSession.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<AppSession> {
		try {
			const data = await AppSession.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: AppSessionDto | any): Promise<AppSession> {
		try {
			const data = AppSession.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await AppSession.findOne({
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
		body: AppSessionDto | any,
	): Promise<AppSession | any> {
		try {
			const data = await AppSession.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<AppSession> {
		try {
			const data = await AppSession.findOneOrFail(id)
			AppSession.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
