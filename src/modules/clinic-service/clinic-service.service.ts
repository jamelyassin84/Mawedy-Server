import { ClinicServiceEntityDto } from './clinic-service.dto'
import { ClinicServiceEntity } from './clinic-service.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicServiceService {
	constructor() {}

	async findAll(): Promise<ClinicServiceEntity[]> {
		const data = await ClinicServiceEntity.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicServiceEntity> {
		try {
			const data = await ClinicServiceEntity.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicServiceEntityDto | any,
	): Promise<ClinicServiceEntity> {
		try {
			const data = ClinicServiceEntity.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicServiceEntity.findOne({
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
		body: ClinicServiceEntityDto | any,
	): Promise<ClinicServiceEntity | any> {
		try {
			const data = await ClinicServiceEntity.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicServiceEntity> {
		try {
			const data = await ClinicServiceEntity.findOneOrFail(id)
			ClinicServiceEntity.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
