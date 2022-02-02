import { PatientAvatarDto } from './patient-avatar.dto'
import { PatientAvatar } from './patient-avatar.enitity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ROUTES } from 'src/routes/routes'

@Injectable()
export class PatientAvatarService {
	constructor() {}

	async create(body: any): Promise<PatientAvatar> {
		try {
			const data = PatientAvatar.create(body) as any
			await data.save()
			return data
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async remove(id: number): Promise<PatientAvatar> {
		try {
			const data = await PatientAvatar.findOneOrFail(id)
			PatientAvatar.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async upload(body: any, files: Express.Multer.File[] = []): Promise<void> {
		console.log(body.id)
		for (let file of files) {
			await this.create({
				patient: body.id,
				url:
					process.env.API_URL +
					ROUTES.PATIENT_AVATARS +
					'/avatars/' +
					file.filename,
			})
		}
	}
}
