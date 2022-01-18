import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicDepartmentDto } from './clinic-department.dto'
import { ClinicDepartment } from './clinic-department.enitiy'

@Injectable()
export class ClinicDepartmentsService {
	constructor() {}

	async findAll(): Promise<ClinicDepartment[]> {
		const data = await ClinicDepartment.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicDepartment> {
		try {
			const data = await ClinicDepartment.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicDepartmentDto | any): Promise<ClinicDepartment> {
		try {
			const data = ClinicDepartment.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicDepartment.findOne({
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
		body: ClinicDepartmentDto | any,
	): Promise<ClinicDepartment | any> {
		try {
			const data = await ClinicDepartment.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicDepartment> {
		try {
			const data = await ClinicDepartment.findOneOrFail(id)
			ClinicDepartment.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
