import { ClinicAppointmentDto } from './clinic-appointment.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicAppointment } from './clinic-appointment.entity'

@Injectable()
export class ClinicAppointmentsService {
	constructor() {}

	async findAll(): Promise<ClinicAppointment[]> {
		const data = await ClinicAppointment.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicAppointment> {
		try {
			const data = await ClinicAppointment.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicAppointmentDto | any): Promise<ClinicAppointment> {
		try {
			const data = ClinicAppointment.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicAppointment.findOne({
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
		body: ClinicAppointmentDto | any,
	): Promise<ClinicAppointment | any> {
		try {
			const data = await ClinicAppointment.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicAppointment> {
		try {
			const data = await ClinicAppointment.findOneOrFail(id)
			ClinicAppointment.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
