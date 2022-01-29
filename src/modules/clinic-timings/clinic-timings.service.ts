import { ClinicTimingDto } from './clinic-timings.dto'
import { ClinicTiming } from './clinic-timings.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicTimingsService {
	constructor() {}

	async findAll(): Promise<ClinicTiming[]> {
		const data = await ClinicTiming.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicTiming> {
		try {
			const data = await ClinicTiming.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicTimingDto | any): Promise<ClinicTiming> {
		try {
			const data = ClinicTiming.create(body) as any
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
		body: ClinicTimingDto | any,
	): Promise<ClinicTiming | any> {
		try {
			const data = await ClinicTiming.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicTiming> {
		try {
			const data = await ClinicTiming.findOneOrFail(id)
			ClinicTiming.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
