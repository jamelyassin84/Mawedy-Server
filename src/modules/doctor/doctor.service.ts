import { DoctorDto } from './doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Doctor } from './doctor.entity'

@Injectable()
export class DoctorService {
	constructor() {}

	async findAll(): Promise<Doctor[]> {
		const data = await Doctor.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<Doctor> {
		try {
			const data = await Doctor.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: DoctorDto | any): Promise<Doctor> {
		try {
			const data = Doctor.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await Doctor.findOne({
				where: { id: params.id },
				relations: ['emails', 'phones', 'devices'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: DoctorDto | any): Promise<Doctor | any> {
		try {
			const data = await Doctor.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Doctor> {
		try {
			const data = await Doctor.findOneOrFail(id)
			Doctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
