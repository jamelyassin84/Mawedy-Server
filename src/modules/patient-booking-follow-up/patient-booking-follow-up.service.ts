import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { PatientBookingFollowUpDto } from './patient-booking-follow-up.dto'
import { PatientBookingFollowUp } from './patient-booking-follow-up.entity'

@Injectable()
export class PatientBookingFollowUpService {
	constructor() {}

	async findAll(): Promise<PatientBookingFollowUp[]> {
		return await PatientBookingFollowUp.find()
	}

	async findOne(id: number): Promise<PatientBookingFollowUp> {
		try {
			const data = await PatientBookingFollowUp.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: PatientBookingFollowUpDto | any,
	): Promise<PatientBookingFollowUp> {
		try {
			const data = PatientBookingFollowUp.create(body) as any
			await data.save()
			return data
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: PatientBookingFollowUpDto | any,
	): Promise<PatientBookingFollowUp | any> {
		try {
			const data = await PatientBookingFollowUp.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientBookingFollowUp> {
		try {
			const data = await PatientBookingFollowUp.findOneOrFail(id)
			PatientBookingFollowUp.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
