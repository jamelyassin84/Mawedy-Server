import { ClinicFileDto } from './clinic-file.dto'
import { ClinicFile } from './clinic-file.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class ClinicFilesService {
	constructor() {}

	async findAll(): Promise<ClinicFile[]> {
		const data = await ClinicFile.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicFile> {
		try {
			const data = await ClinicFile.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicFileDto | any): Promise<ClinicFile> {
		try {
			const data = ClinicFile.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await ClinicFile.findOne({
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
		body: ClinicFileDto | any,
	): Promise<ClinicFile | any> {
		try {
			const data = await ClinicFile.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicFile> {
		try {
			const data = await ClinicFile.findOneOrFail(id)
			ClinicFile.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
