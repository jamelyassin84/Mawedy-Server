import { PhonesService } from './../phone/phone.service'
import { Injectable } from '@nestjs/common'
import { Phone } from '../phone/phone.entity'

@Injectable()
export class ClinicV2Service {
	constructor(private phone: PhonesService) {}

	async addPhoneNumber(clinic: {
		id: number
		phone: string
	}): Promise<Phone> {
		await this.phone.deletePhonesByClinic(clinic.id)
		return await this.phone.create({
			clinic: clinic.id,
			phone: clinic.phone,
			areaCode: 971,
		})
	}
}
