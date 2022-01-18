import { NotificationDto } from './notification.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Notification } from './notification.entity'

@Injectable()
export class NotificationService {
	constructor() {}

	async findAll(): Promise<Notification[]> {
		const data = await Notification.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<Notification> {
		try {
			const data = await Notification.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: NotificationDto | any): Promise<Notification> {
		try {
			const data = Notification.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await Notification.findOne({
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
		body: NotificationDto | any,
	): Promise<Notification | any> {
		try {
			const data = await Notification.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Notification> {
		try {
			const data = await Notification.findOneOrFail(id)
			Notification.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
