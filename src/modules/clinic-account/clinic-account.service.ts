import { PhonesService } from './../phone/phone.service'
import { EmailsService } from './../email/email.service'
import { ClinicAccountDto } from './clinic-account.dto'

import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common'
import { ClinicAccount } from './clinic-account.entity'
import { DevicesService } from '../device/device.service'

@Injectable()
export class ClinicAccountService {
	constructor(protected emailService: EmailsService, protected phoneService: PhonesService, protected deviceService: DevicesService) {}

	async findAll(): Promise<ClinicAccount[]> {
		const clinicAccounts = await ClinicAccount.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return clinicAccounts
	}

	async findOne(id: number): Promise<ClinicAccount> {
		try {
			const clinicAccount = await ClinicAccount.findOneOrFail(id)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException('ClinicAccount might be moved or deleted.')
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

	async update(id: number, body: ClinicAccountDto | any): Promise<ClinicAccount | any> {
		try {
			const clinicAccount = await ClinicAccount.update(id, body)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException('Unable to update clinic account might be moved or deleted.')
		}
	}

	async remove(id: number): Promise<ClinicAccount> {
		try {
			const clinicAccount = await ClinicAccount.findOneOrFail(id)
			ClinicAccount.delete(id)
			return clinicAccount
		} catch (error) {
			throw new NotFoundException('Unable to delete clinic account might be moved or deleted.')
		}
	}

	async findByUsername(username: string): Promise<ClinicAccount> {
		return await ClinicAccount.findOneOrFail({
			where: {
				username: username,
			},
		})
	}
}
