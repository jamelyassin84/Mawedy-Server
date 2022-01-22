import { ClinicDoctorWorkingScheduleDto } from './clinic-doctor-working-schedule.dto'
import { ClinicDoctorWorkingSchedule } from './clinic-doctor-working-schedule.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicDoctorWorkingScheduleService {
	constructor() {}

	async findAll(): Promise<ClinicDoctorWorkingSchedule[]> {
		const data = await ClinicDoctorWorkingSchedule.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicDoctorWorkingSchedule> {
		try {
			const data = await ClinicDoctorWorkingSchedule.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicDoctorWorkingScheduleDto | any,
	): Promise<ClinicDoctorWorkingSchedule> {
		try {
			const data = ClinicDoctorWorkingSchedule.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicDoctorWorkingSchedule.findOne({
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
		body: ClinicDoctorWorkingScheduleDto | any,
	): Promise<ClinicDoctorWorkingSchedule | any> {
		try {
			const data = await ClinicDoctorWorkingSchedule.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicDoctorWorkingSchedule> {
		try {
			const data = await ClinicDoctorWorkingSchedule.findOneOrFail(id)
			ClinicDoctorWorkingSchedule.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
