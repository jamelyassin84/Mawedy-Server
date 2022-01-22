import { PatientMedicalRecordDto } from './patient-medical-record.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { PatientMedicalRecord } from './patient-medical-record.entity'

@Injectable()
export class PatientMedicalRecordService {
	constructor() {}

	async findAll(): Promise<PatientMedicalRecord[]> {
		const data = await PatientMedicalRecord.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<PatientMedicalRecord> {
		try {
			const data = await PatientMedicalRecord.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: PatientMedicalRecordDto | any,
	): Promise<PatientMedicalRecord> {
		try {
			const data = PatientMedicalRecord.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await PatientMedicalRecord.findOne({
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
		body: PatientMedicalRecordDto | any,
	): Promise<PatientMedicalRecord | any> {
		try {
			const data = await PatientMedicalRecord.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<PatientMedicalRecord> {
		try {
			const data = await PatientMedicalRecord.findOneOrFail(id)
			PatientMedicalRecord.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
