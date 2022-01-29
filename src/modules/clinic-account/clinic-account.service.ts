import { PhonesService } from './../phone/phone.service'
import { EmailsService } from './../email/email.service'
import { ClinicAccountDto } from './clinic-account.dto'

import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicAccount } from './clinic-account.entity'
import { DevicesService } from '../device/device.service'
import { MulterModule } from '@nestjs/platform-express'

@Injectable()
export class ClinicAccountService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected deviceService: DevicesService,
	) {}

	async findOne(id: number): Promise<ClinicAccount> {
		try {
			const clinicAccount = await ClinicAccount.findOne(id)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException(
				'ClinicAccount might be moved or deleted.',
			)
		}
	}

	async create(body: ClinicAccountDto | any): Promise<ClinicAccount> {
		try {
			const clinicAccount = ClinicAccount.create(body) as any
			await clinicAccount.save()
			return clinicAccount
		} catch (error) {
			throw new Error(error)
		}
	}

	async update(
		id: number,
		body: ClinicAccountDto | any,
	): Promise<ClinicAccount | any> {
		try {
			const clinicAccount = await ClinicAccount.update(id, body)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicAccount> {
		try {
			const clinicAccount = await ClinicAccount.findOneOrFail(id)
			ClinicAccount.delete(id)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async findByClinic(id: number): Promise<ClinicAccount[]> {
		return await ClinicAccount.find({
			where: {
				clinic: id,
			},
		})
	}

	async logIn(id: number) {
		//TODO:Update Profile Picture
		await ClinicAccount.update(id, {
			isLoggedIn: true,
		})

		return await this.findOne(id)
	}
}
