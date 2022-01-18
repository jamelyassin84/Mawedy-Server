import { DevicesService } from './../device/device.service'
import { PhonesService } from './../phone/phone.service'
import { EmailsService } from './../email/email.service'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Clinic } from './clinic.entity'
import { ClinicDto } from './clinic.dto'

@Injectable()
export class ClinicService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected deviceService: DevicesService,
	) {}

	async findAll(): Promise<Clinic[]> {
		const clinics = await Clinic.find({
			relations: [
				'approver',
				'emails',
				'phones',
				'devices',
				'clinicAccounts',
			],
		})
		return clinics
	}

	async findOne(id: number): Promise<Clinic> {
		try {
			const clinic = await Clinic.findOneOrFail(id)
			return clinic
		} catch (error) {
			throw new NotFoundException(
				'This Clinic might be moved or deleted.',
			)
		}
	}

	async create(body: ClinicDto | any): Promise<Clinic> {
		try {
			const clinic = Clinic.create(body) as any
			await clinic.save()
			const data = {
				clinic: clinic as any,
				...body,
				isActive: true,
			}
			await this.emailService.create(data)
			await this.phoneService.create(data)
			await this.deviceService.create(data)
			return await Clinic.findOne({
				where: { id: clinic.id },
				relations: [
					'approver',
					'emails',
					'phones',
					'devices',
					'clinicAccounts',
				],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
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
