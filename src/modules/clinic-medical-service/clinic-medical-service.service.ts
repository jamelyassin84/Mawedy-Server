import { ClinicMedicalServicesDoctorsService } from './../clinic-medical-services-doctor/clinic-medical-services-doctor.service'
import { ClinicMedicalServiceDto } from './clinic-medical-service.dto'
import { ClinicMedicalService } from './clinic-medical-service.entity'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicDepartmentDoctorService } from '../clinic-department-doctor/clinic-department-doctor.service'

@Injectable()
export class ClinicMedicalServiceService {
	constructor(
		private clinicMedicalServicesDoctorsService: ClinicMedicalServicesDoctorsService,
		private clinicDepartmentDoctorService: ClinicDepartmentDoctorService,
	) {}

	async findAll(): Promise<ClinicMedicalService[]> {
		const data = await ClinicMedicalService.find()
		return data
	}

	async findOne(id: number): Promise<ClinicMedicalService> {
		try {
			const data = await ClinicMedicalService.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(
		body: ClinicMedicalServiceDto | any,
	): Promise<ClinicMedicalService> {
		try {
			const medicalService = ClinicMedicalService.create(body) as any

			const data = {
				...body,
				isActive: true,
				department: body.department,
				clinic: body.clinic,
			}
			await medicalService.save()

			for (let doctor of body.doctors) {
				await this.clinicMedicalServicesDoctorsService.create({
					clinic: body.clinic,
					clinicDepartment: body.department,
					clinicMedicalService: medicalService,
					doctor: doctor,
				})
				await this.clinicDepartmentDoctorService.create({
					clinic: body.clinic,
					doctor: doctor,
				})
			}

			return medicalService
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicMedicalServiceDto | any,
	): Promise<ClinicMedicalService | any> {
		try {
			const data = await ClinicMedicalService.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicMedicalService> {
		try {
			const data = await ClinicMedicalService.findOneOrFail(id)
			ClinicMedicalService.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async getByDepartment(id: number): Promise<ClinicMedicalService[]> {
		try {
			return await ClinicMedicalService.find({
				where: {
					department: id,
				},
				relations: ['images'],
			})
		} catch (error) {
			return []
		}
	}
}
