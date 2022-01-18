import { AppInboxDto } from './mawedy-inbox.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { AppInbox } from './mawedy-inbox.entity'

@Injectable()
export class MawedyInboxService {
	constructor() {}

	async findAll(): Promise<AppInbox[]> {
		const data = await AppInbox.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<AppInbox> {
		try {
			const data = await AppInbox.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: AppInboxDto | any): Promise<AppInbox> {
		try {
			const data = AppInbox.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await AppInbox.findOne({
				where: { id: params.id },
				relations: ['emails', 'phones', 'devices'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: AppInboxDto | any): Promise<AppInbox | any> {
		try {
			const data = await AppInbox.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<AppInbox> {
		try {
			const data = await AppInbox.findOneOrFail(id)
			AppInbox.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
