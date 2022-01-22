import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Device } from './device.entity'

@Injectable()
export class DevicesService {
	constructor() {}

	async findAll(): Promise<Device[]> {
		return await Device.find()
	}

	async findOne(id: number): Promise<Device> {
		try {
			const device = await Device.findOneOrFail(id)
			return device
		} catch (error) {
			throw new NotFoundException('Device might be moved or deleted.')
		}
	}

	async create(body: any): Promise<Device> {
		try {
			const device = Device.create(body) as any
			await device.save()
			return device
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: any): Promise<Device | any> {
		try {
			const device = await Device.update(id, body)
			return device
		} catch (error) {
			throw new NotFoundException(
				'Unable to update device might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Device> {
		try {
			const device = await Device.findOneOrFail(id)
			return device
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete device might be moved or deleted.',
			)
		}
	}
}
