import { ClinicPhoto } from './clinic-photos.entity'
import { ClinicPhotoDto } from './clinic-photos.dto'
import { Injectable, ServiceUnavailableException } from '@nestjs/common'

@Injectable()
export class ClinicPhotosService {
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

	async upload(body: any, files: Express.Multer.File[] = []): Promise<void> {
		for (let file of files) {
			await this.create({
				clinic: body.id,
				avatar: file.filename,
			})
		}
	}
}
