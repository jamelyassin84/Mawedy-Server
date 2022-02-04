import { PatientBookingListDto } from './patient-booking-list.dto'
import { PatientBookingList } from './patient-booking-list.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class PatientBookingListService {
	constructor() {}

	async findAll(): Promise<PatientBookingList[]> {
		return await PatientBookingList.find()
	}

	async findOne(id: number): Promise<PatientBookingList> {
		try {
			const data = await PatientBookingList.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: PatientBookingListDto | any,
	): Promise<PatientBookingList> {
		try {
			const data = PatientBookingList.create(body) as any
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
		body: PatientBookingListDto | any,
	): Promise<PatientBookingList | any> {
		try {
			const data = await PatientBookingList.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientBookingList> {
		try {
			const data = await PatientBookingList.findOneOrFail(id)
			PatientBookingList.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
