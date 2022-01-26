import { ClinicFileDto } from './clinic-file.dto'
import { ClinicFile } from './clinic-file.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Clinic } from '../clinic/clinic.entity'

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
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async uploadClinicFiles(
		body: any,
		files: Express.Multer.File[] = [],
	): Promise<void> {
		for (let file of files) {
			await this.create({
				clinic: body.id,
				name: file.filename,
				url:
					process.env.PUBLIC_PATH +
					process.env.CLINIC_DIR +
					file.filename,
			})
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
