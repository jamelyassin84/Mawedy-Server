import { ClinicAccountDto } from './clinic-account.dto'

import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicAccount } from './clinic-account.entity'

@Injectable()
export class ClinicAccountService {
	constructor() {}

	async findAll(): Promise<ClinicAccount[]> {
		const clinicAccounts = await ClinicAccount.find({
			relations: ['roles'],
		})
		return clinicAccounts
	}

	async findOne(id: number): Promise<ClinicAccount> {
		try {
			const clinicAccount = await ClinicAccount.findOneOrFail(id)
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
			const data = {
				clinicAccount: clinicAccount as any,
				...body,
				isActive: true,
			}
			return await ClinicAccount.findOne({
				where: { id: clinicAccount.id },
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

	async findByUsername(username: string): Promise<ClinicAccount> {
		return await ClinicAccount.findOneOrFail({
			where: {
				username: username,
			},
		})
	}
}
