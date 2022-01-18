import { ClinicSubscriptionDto } from './clinic-subscription.dto'
import { ClinicSubscription } from './clinic-subscription.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicSubscriptionsService {
	constructor() {}

	async findAll(): Promise<ClinicSubscription[]> {
		const clinicSubscriptions = await ClinicSubscription.find({
			relations: ['roles'],
		})
		return clinicSubscriptions
	}

	async findOne(id: number): Promise<ClinicSubscription> {
		try {
			const clinicSubscription = await ClinicSubscription.findOneOrFail(
				id,
			)
			return clinicSubscription
		} catch (error) {
			throw new NotFoundException(
				'ClinicSubscription might be moved or deleted.',
			)
		}
	}

	async create(
		body: ClinicSubscriptionDto | any,
	): Promise<ClinicSubscription> {
		try {
			const clinicSubscription = ClinicSubscription.create(body) as any
			await clinicSubscription.save()
			return await ClinicSubscription.findOne({
				where: { id: clinicSubscription.id },
				relations: ['roles', 'emails', 'phones', 'devices'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicSubscriptionDto | any,
	): Promise<ClinicSubscription | any> {
		try {
			const clinicSubscription = await ClinicSubscription.update(id, body)
			return clinicSubscription
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicSubscription> {
		try {
			const clinicSubscription = await ClinicSubscription.findOneOrFail(
				id,
			)
			ClinicSubscription.delete(id)
			return clinicSubscription
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async findByUsername(username: string): Promise<ClinicSubscription> {
		return await ClinicSubscription.findOneOrFail({
			where: {
				username: username,
			},
		})
	}
}
