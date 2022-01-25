import { ClinicFilesService } from './../clinic-file/clinic-file.service'
import { MawedyInboxService } from './../mawedy-inbox/mawedy-inbox.service'
import { ClinicSubscription } from './../clinic-subscription/clinic-subscription.entity'
import { ClinicAccountService } from './../clinic-account/clinic-account.service'
import { DevicesService } from './../device/device.service'
import { PhonesService } from './../phone/phone.service'
import { EmailsService } from './../email/email.service'
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
	UnauthorizedException,
} from '@nestjs/common'
import { Clinic } from './clinic.entity'
import { ClinicDto } from './clinic.dto'
import { ClinicSubscriptionsService } from '../clinic-subscription/clinic-subscription.service'
import { MulterModule } from '@nestjs/platform-express'

@Injectable()
export class ClinicService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected deviceService: DevicesService,
		protected clinicSubscriptionsService: ClinicSubscriptionsService,
		private clinicAccountService: ClinicAccountService,
		private inboxService: MawedyInboxService,
		private clinicFilesService: ClinicFilesService,
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
		})
		return clinics
	}

	async findOne(id: number): Promise<Clinic> {
		try {
			return await Clinic.findOne(id, {
				relations: [
					'approver',
					'emails',
					'phones',
					'devices',
					'clinicAccounts',
				],
			})
		} catch (error) {
			console.log(error)
			throw new NotFoundException(
				'This Clinic might be moved or deleted.',
			)
		}
	}

	async create(
		body: ClinicDto | any,
		files: Express.Multer.File[],
	): Promise<Clinic | any> {
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

			for (let file of files) {
				await this.clinicFilesService.create({
					clinic: clinic,
					name: 'trade-license',
					url: process.env.CLINIC_FILES + file.filename,
				})
			}

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

			return this.findOne(clinic.id)
		} catch (error) {
			throw new Error(error)
		}
	}

	async update(id: number, body: ClinicDto | any): Promise<Clinic | any> {
		try {
			const clinic = await Clinic.update(id, body)
			return clinic
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic might be moved or deleted.',
			)
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
				'This Clinic might be moved or deleted.',
			)
		}
	}
}
