import { ClinicTiming } from './../clinic-timings/clinic-timings.entity'
import { ClinicTimingsService } from './../clinic-timings/clinic-timings.service'
import { MawedyInboxService } from './../mawedy-inbox/mawedy-inbox.service'
import { ClinicSubscription } from './../clinic-subscription/clinic-subscription.entity'
import { ClinicAccountService } from './../clinic-account/clinic-account.service'
import { DevicesService } from './../device/device.service'
import { PhonesService } from './../phone/phone.service'
import { EmailsService } from './../email/email.service'
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Clinic } from './clinic.entity'
import { ClinicDto } from './clinic.dto'
import { ClinicSubscriptionsService } from '../clinic-subscription/clinic-subscription.service'
import { getConnection } from 'typeorm'

@Injectable()
export class ClinicService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected deviceService: DevicesService,
		protected clinicSubscriptionsService: ClinicSubscriptionsService,
		private clinicAccountService: ClinicAccountService,
		private inboxService: MawedyInboxService,
		private clinicTimingService: ClinicTimingsService,
	) {}

	async findAll(): Promise<Clinic[]> {
		const clinics = await Clinic.find({
			relations: [
				'approver',
				'emails',
				'phones',
				'devices',
				'clinicAccounts',
				'clinicSubscription',
			],
			order: {
				createdAt: 'DESC',
			},
		})
		return clinics
	}

	async findOne(id: number): Promise<Clinic> {
		try {
			const clinic = await Clinic.findOne(id, {
				relations: [
					'approver',
					'emails',
					'phones',
					'devices',
					'clinicAccounts',
					'files',
					'photos',
					'avatar',
				],
			})

			const timing = await ClinicTiming.find({
				where: {
					clinicId: clinic.id,
				},
			})

			return Object.assign(clinic, { clinicTimings: timing })
		} catch (error) {
			console.log(error)
			throw new NotFoundException(
				'This Clinic might be moved or deleted.',
			)
		}
	}

	async create(body: any): Promise<Clinic | any> {
		if (await this.emailService.checkIfEmailExist(body.email)) {
			throw new ForbiddenException('The email you entered already exist')
		}

		try {
			const clinic = Clinic.create(body) as any
			await clinic.save()

			const data = {
				clinic: clinic,
				...body,
				isActive: true,
			}

			await this.emailService.create(data)

			await this.phoneService.create(data)

			await this.deviceService.create(data)

			await this.inboxService.create({
				clinic: clinic,
				message: body.message,
			})

			let clinicSubscription: ClinicSubscription

			for (let user of body.users) {
				clinicSubscription =
					await this.clinicSubscriptionsService.create({
						clinic: clinic,
						name: user.name,
						subscriptionType: body.subscriptionType,
						subscribedAt: Date.now(),
						validUntil:
							this.clinicSubscriptionsService.resolveNextMonth(
								Date.now(),
							),
						numberOfAccounts:
							this.clinicSubscriptionsService.resolveSubscription(
								body.subscriptionType,
							),
						maxNumberOfAccounts:
							this.clinicSubscriptionsService.resolveSubscription(
								body.subscriptionType,
							),
						price: this.clinicSubscriptionsService.resolvePrice(
							body.subscriptionType,
						),
						currency: 'AED',
					})

				await this.clinicAccountService.create({
					name: user.name,
					clinic: clinic,
					clinicSubscription: clinicSubscription,
				})
			}

			return await this.findOne(clinic.id)
		} catch (error) {
			throw new Error(error)
		}
	}

	async update(id: number, body: any): Promise<Clinic | any> {
		try {
			delete body.emails
			delete body.clinicAccounts
			delete body.devices
			delete body.files
			delete body.phones
			delete body.avatar
			delete body.photos

			await getConnection().query(
				`DELETE FROM clinic_timing WHERE  clinicID = ${body.id}`,
			)

			for (let timing of body.clinicTimings) {
				await this.clinicTimingService.create(
					Object.assign(timing, { clinicId: body.id }),
				)
			}
			delete body.clinicTimings

			const clinic = await Clinic.update(id, body)
			return clinic
		} catch (error) {
			console.log(error)
			// throw new NotFoundException(
			// 	'Unable to update clinic might be moved or deleted.',
			// )
		}
	}

	async remove(id: number): Promise<Clinic> {
		try {
			const clinic = await Clinic.findOneOrFail(id)
			Clinic.delete(id)
			return clinic
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic might be moved or deleted.',
			)
		}
	}

	async findByUsername(username: string): Promise<Clinic> {
		try {
			return await Clinic.findOneOrFail({
				where: {
					username: username,
				},
			})
		} catch (error) {
			throw new NotFoundException(
				'There are no clinics associated with this username.',
			)
		}
	}

	// findSubscription(subscriptionType: SubscriptionType): Promise<Clinic> {
	// 	return
	// }

	async read(id: number) {
		await this.inboxService.update(id, {
			isRead: true,
		})
	}

	async activate(id: number) {
		//TODO:Add Approver
		await this.update(id, {
			isApproved: true,
		})
		//TODO:Generate Password
		//TODO:send email
	}
}
