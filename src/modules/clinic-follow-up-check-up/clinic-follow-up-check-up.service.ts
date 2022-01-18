import { ClinicFollowUpDto } from './clinic-follow-up-check-up.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicFollowUp } from './clinic-follow-up-check-up.entity'

@Injectable()
export class ClinicFollowUpCheckUpService {
	constructor() {}

	async findAll(): Promise<ClinicFollowUp[]> {
		const data = await ClinicFollowUp.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicFollowUp> {
		try {
			const data = await ClinicFollowUp.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicFollowUpDto | any): Promise<ClinicFollowUp> {
		try {
			const data = ClinicFollowUp.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicFollowUp.findOne({
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
		body: ClinicFollowUpDto | any,
	): Promise<ClinicFollowUp | any> {
		try {
			const data = await ClinicFollowUp.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicFollowUp> {
		try {
			const data = await ClinicFollowUp.findOneOrFail(id)
			ClinicFollowUp.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
