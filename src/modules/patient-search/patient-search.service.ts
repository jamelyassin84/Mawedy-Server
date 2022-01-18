import { PatientSearchDto } from './patient-search.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { PatientSearch } from './patient-search.entity'

@Injectable()
export class PatientSearchService {
	constructor() {}

	async findAll(): Promise<PatientSearch[]> {
		const data = await PatientSearch.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<PatientSearch> {
		try {
			const data = await PatientSearch.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: PatientSearchDto | any): Promise<PatientSearch> {
		try {
			const data = PatientSearch.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await PatientSearch.findOne({
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
		body: PatientSearchDto | any,
	): Promise<PatientSearch | any> {
		try {
			const data = await PatientSearch.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientSearch> {
		try {
			const data = await PatientSearch.findOneOrFail(id)
			PatientSearch.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
