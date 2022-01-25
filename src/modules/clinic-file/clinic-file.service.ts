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
			return data
		} catch (error) {
			// throw new ServiceUnavailableException(
			// 	'Something went wrong. Please try again',
			// )
			console.log(error)
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
