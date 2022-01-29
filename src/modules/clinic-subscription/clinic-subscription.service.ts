import {
	ClinicSubscriptionDto,
	SubscriptionType,
} from './clinic-subscription.dto'
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
			return clinicSubscription
		} catch (error) {
			throw new Error(error)
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

	resolveSubscription(subscriptionType: SubscriptionType): number {
		if (subscriptionType === 'trial') {
			return 2
		}
		if (subscriptionType === 'app') {
			return 2
		}
		if (subscriptionType === 'premium') {
			return 2
		}
		if (subscriptionType === 'solution') {
			return 2
		}
	}

	resolvePrice(subscriptionType: SubscriptionType): number {
		if (subscriptionType === 'trial') {
			return 150
		}
		if (subscriptionType === 'app') {
			return 150
		}
		if (subscriptionType === 'premium') {
			return 150
		}
		if (subscriptionType === 'solution') {
			return 150
		}
	}

	resolveNextMonth(timestamp: any): any {
		var now = new Date(timestamp)
		return new Date(now.getFullYear(), now.getMonth() + 1, 1)
	}
}
