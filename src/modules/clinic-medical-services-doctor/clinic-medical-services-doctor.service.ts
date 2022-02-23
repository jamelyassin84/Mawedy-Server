import { ClinicMedicalServiceDoctorDto } from './clinic-medical-services-doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicMedicalServiceDoctor } from './clinic-medical-services-doctor.entity'
import { Doctor } from '../doctor/doctor.entity'

@Injectable()
export class ClinicMedicalServicesDoctorsService {
	constructor() {}

	async getDoctors(id: number) {
		return await ClinicMedicalServiceDoctor.find({
			where: {
				clinicMedicalService: id,
			},
			relations: ['doctor'],
		})
	}

	async create(
		body: ClinicMedicalServiceDoctorDto | any,
	): Promise<ClinicMedicalServiceDoctor> {
		try {
			const data = ClinicMedicalServiceDoctor.create(body) as any
			await data.save()
			return data
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async remove(id: number): Promise<ClinicMedicalServiceDoctor> {
		try {
			const data = await ClinicMedicalServiceDoctor.findOneOrFail(id)
			ClinicMedicalServiceDoctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
