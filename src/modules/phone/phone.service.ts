import { Phone } from './phone.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { PhoneDto } from './phone.dto'

@Injectable()
export class PhonesService {
	constructor() {}

	async findAll(): Promise<Phone[]> {
		const phones = await Phone.find()
		return phones
	}

	async findOne(id: number): Promise<Phone> {
		try {
			const phone = await Phone.findOneOrFail(id)
			return phone
		} catch (error) {
			throw new NotFoundException('User might be moved or deleted.')
		}
	}

	async create(body: PhoneDto | any): Promise<Phone> {
		try {
			const phone = Phone.create(body) as any
			await phone.save()
			return phone
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: Phone): Promise<Phone | any> {
		try {
			const phone = await Phone.update(id, body)
			return phone
		} catch (error) {
			throw new NotFoundException(
				'Unable to update user might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Phone> {
		try {
			const phone = await Phone.findOneOrFail(id)
			return phone
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete user might be moved or deleted.',
			)
		}
	}
}
