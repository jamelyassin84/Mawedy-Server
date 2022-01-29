import { EmailDto } from './email.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Email } from './email.entity'

@Injectable()
export class EmailsService {
	constructor() {}

	async create(body: EmailDto | any): Promise<Email> {
		try {
			const email = Email.create(body) as any
			await email.save()
			return email
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async remove(id: number): Promise<Email> {
		try {
			const email = await Email.findOneOrFail(id)
			return email
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete email might be moved or deleted.',
			)
		}
	}

	async checkIfEmailExist(email: string): Promise<boolean> {
		const hasEmail = await Email.findOne({ where: { email: email } })
		if (hasEmail === null || hasEmail === undefined) {
			return false
		}
		return true
	}
}
