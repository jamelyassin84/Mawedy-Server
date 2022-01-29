import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ROUTES } from 'src/routes/routes'
import { ClinicAvatarDto } from './clinic-avatar.dto'
import { ClinicAvatar } from './clinic-avatar.entity'

@Injectable()
export class ClinicAvatarsService {
	constructor() {}

	async findAll(): Promise<ClinicAvatar[]> {
		const data = await ClinicAvatar.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<ClinicAvatar> {
		try {
			const data = await ClinicAvatar.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: any): Promise<ClinicAvatar> {
		try {
			const data = ClinicAvatar.create(body) as any
			await data.save()
			return data
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: any): Promise<ClinicAvatar | any> {
		try {
			const data = await ClinicAvatar.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicAvatar> {
		try {
			const data = await ClinicAvatar.findOneOrFail(id)
			ClinicAvatar.delete(id)
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
					ROUTES.CLINIC_AVATARS +
					'/photo/' +
					file.filename,
			})
		}
	}
}
