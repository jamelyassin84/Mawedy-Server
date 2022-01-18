import { ClinicDepartmentDoctor } from './clinic-department-doctor.entity'
import { ClinicDepartmentDoctorDto } from './clinic-department-doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicDepartmentDoctorService {
	constructor() {}

	async findAll(): Promise<ClinicDepartmentDoctor[]> {
		const data = await ClinicDepartmentDoctor.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicDepartmentDoctor> {
		try {
			const data = await ClinicDepartmentDoctor.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicDepartmentDoctorDto | any,
	): Promise<ClinicDepartmentDoctor> {
		try {
			const data = ClinicDepartmentDoctor.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicDepartmentDoctor.findOne({
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
		body: ClinicDepartmentDoctorDto | any,
	): Promise<ClinicDepartmentDoctor | any> {
		try {
			const data = await ClinicDepartmentDoctor.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicDepartmentDoctor> {
		try {
			const data = await ClinicDepartmentDoctor.findOneOrFail(id)
			ClinicDepartmentDoctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
