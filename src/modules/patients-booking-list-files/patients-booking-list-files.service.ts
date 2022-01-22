import { PatientBookingListFileDto } from './patients-booking-list-files.dto'
import { PatientBookingListFile } from './patients-booking-list-files.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'

@Injectable()
export class PatientsBookingListFilesService {
	constructor() {}

	async findAll(): Promise<PatientBookingListFile[]> {
		const data = await PatientBookingListFile.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<PatientBookingListFile> {
		try {
			const data = await PatientBookingListFile.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: PatientBookingListFileDto | any,
	): Promise<PatientBookingListFile> {
		try {
			const data = PatientBookingListFile.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await PatientBookingListFile.findOne({
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
		body: PatientBookingListFileDto | any,
	): Promise<PatientBookingListFile | any> {
		try {
			const data = await PatientBookingListFile.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientBookingListFile> {
		try {
			const data = await PatientBookingListFile.findOneOrFail(id)
			PatientBookingListFile.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
