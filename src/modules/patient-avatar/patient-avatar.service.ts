import { PatientAvatarDto } from './patient-avatar.dto'
import { PatientAvatar } from './patient-avatar.enitity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class PatientAvatarService {
	constructor() {}

	async findAll(): Promise<PatientAvatar[]> {
		const data = await PatientAvatar.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<PatientAvatar> {
		try {
			const data = await PatientAvatar.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: PatientAvatarDto | any): Promise<PatientAvatar> {
		try {
			const data = PatientAvatar.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await PatientAvatar.findOne({
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
		body: PatientAvatarDto | any,
	): Promise<PatientAvatar | any> {
		try {
			const data = await PatientAvatar.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
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
}
