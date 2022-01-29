import { getConnection } from 'typeorm'
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

	async remove(id: number): Promise<Phone> {
		try {
			const phone = await Phone.findOneOrFail(id)
			return phone
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete phone might be moved or deleted.',
			)
		}
	}

	async getPhoneByClinic(id: number): Promise<Phone[]> {
		try {
			return await Phone.find({
				where: {
					clinic: id,
				},
			})
		} catch (error) {
			throw new NotFoundException('Unable to fetch phones.')
		}
	}

	async deletePhonesByClinic(id: number) {
		await getConnection().query(`DELETE FROM phone WHERE  clinicID = ${id}`)
	}
}
