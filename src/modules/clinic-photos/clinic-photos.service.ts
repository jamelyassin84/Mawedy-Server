import { ClinicPhotoDto } from './clinic-photos.dto'
import { ClinicPhoto } from './clinic-photos.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ROUTES } from 'src/routes/routes'

@Injectable()
export class ClinicPhotosService {
	constructor() {}

	async findAll(): Promise<ClinicPhoto[]> {
		const data = await ClinicPhoto.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicPhoto> {
		try {
			const data = await ClinicPhoto.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicPhotoDto | any): Promise<ClinicPhoto> {
		try {
			const data = ClinicPhoto.create(body) as any
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
		body: ClinicPhotoDto | any,
	): Promise<ClinicPhoto | any> {
		try {
			const data = await ClinicPhoto.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicPhoto> {
		try {
			const data = await ClinicPhoto.findOneOrFail(id)
			ClinicPhoto.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async upload(body: any, files: Express.Multer.File[] = []): Promise<void> {
		for (let file of files) {
			await this.create({
				clinic: body.id,
				avatar:
					process.env.API_URL +
					ROUTES.CLINIC_PHOTOS +
					'/photo/' +
					file.filename,
			})
		}
	}
}
