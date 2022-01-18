import { ClinicSubscriptionRevenueDto } from './clinic-subscription-revenue.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicSubscriptionRevenue } from './clinic-subscription-revenue.entity'

@Injectable()
export class ClinicSubscriptionsRevenueService {
	constructor() {}

	async findAll(): Promise<ClinicSubscriptionRevenue[]> {
		const data = await ClinicSubscriptionRevenue.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicSubscriptionRevenue> {
		try {
			const data = await ClinicSubscriptionRevenue.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicSubscriptionRevenueDto | any,
	): Promise<ClinicSubscriptionRevenue> {
		try {
			const data = ClinicSubscriptionRevenue.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicSubscriptionRevenue.findOne({
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
		body: ClinicSubscriptionRevenueDto | any,
	): Promise<ClinicSubscriptionRevenue | any> {
		try {
			const data = await ClinicSubscriptionRevenue.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicSubscriptionRevenue> {
		try {
			const data = await ClinicSubscriptionRevenue.findOneOrFail(id)
			ClinicSubscriptionRevenue.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
