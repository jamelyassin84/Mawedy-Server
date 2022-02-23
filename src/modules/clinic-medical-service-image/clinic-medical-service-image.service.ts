import { ClinicMedicalServiceImage } from './clinic-medical-service-image.entity'
import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { ROUTES } from 'src/routes/routes'
import { getConnection } from 'typeorm'

@Injectable()
export class ClinicMedicalServiceImageService {
	constructor() {}

	async create(body: any): Promise<ClinicMedicalServiceImage> {
		try {
			const data = ClinicMedicalServiceImage.create(body) as any
			await data.save()
			return data
		} catch (error) {
			console.log(error)
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async upload(body: any, files: Express.Multer.File[] = []): Promise<void> {
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(ClinicMedicalServiceImage)
			.where('clinicMedicalServiceId = :id', {
				id: body.clinicMedicalServiceId,
			})
			.execute()

		for (let file of files) {
			await this.create({
				clinicMedicalService: body.clinicMedicalServiceId,
				url:
					process.env.API_URL +
					ROUTES.CLINIC_MEDICAL_SERVICES_IMAGES +
					'/photo/' +
					file.filename,
			})
		}
	}
}
