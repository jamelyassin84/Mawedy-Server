import { PatientFavoriteClinicDto } from './patient-favorited-clinic.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { PatientFavoriteClinic } from './patient-favorited-clinic.entity'

@Injectable()
export class PatientFavoritedClinicService {
	constructor() {}

	async findAll(): Promise<PatientFavoriteClinic[]> {
		const data = await PatientFavoriteClinic.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<PatientFavoriteClinic> {
		try {
			const data = await PatientFavoriteClinic.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: PatientFavoriteClinicDto | any,
	): Promise<PatientFavoriteClinic> {
		try {
			const data = PatientFavoriteClinic.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await PatientFavoriteClinic.findOne({
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
		body: PatientFavoriteClinicDto | any,
	): Promise<PatientFavoriteClinic | any> {
		try {
			const data = await PatientFavoriteClinic.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientFavoriteClinic> {
		try {
			const data = await PatientFavoriteClinic.findOneOrFail(id)
			PatientFavoriteClinic.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
