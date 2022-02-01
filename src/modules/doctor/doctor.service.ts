import { DoctorDto } from './doctor.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { Doctor } from './doctor.entity'
import { EmailsService } from '../email/email.service'
import { PhonesService } from '../phone/phone.service'
import { ClinicDoctorsService } from '../clinic-doctor/clinic-doctor.service'
import { ROUTES } from 'src/routes/routes'
import { ClinicDoctorWorkingScheduleService } from '../clinic-doctor-working-schedule/clinic-doctor-working-schedule.service'

@Injectable()
export class DoctorService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected clinicDoctorsService: ClinicDoctorsService,
		protected clinicDoctorWorkingScheduleService: ClinicDoctorWorkingScheduleService,
	) {}

	async findAll(): Promise<Doctor[]> {
		try {
			return await Doctor.find({
				relations: [
					'emails',
					'phones',
					'clinicDoctorWorkingSchedules',
					'clinicDoctors',
				],
			})
		} catch (error) {
			console.error(error)
		}
	}

	async findAllByClinic(id: number): Promise<any[]> {
		try {
			return await this.clinicDoctorsService.findAllByClinic(id)
		} catch (error) {
			console.error(error)
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async findOne(id: number): Promise<Doctor> {
		try {
			return await Doctor.findOne(id)
			//  {
			// 	relations: ['emails', 'phones', 'workingSchedules', 'clinic'],
			// }
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: DoctorDto | any): Promise<Doctor> {
		try {
			const data = {
				...body,
				clinic: body.clinicID,
			}

			const doctor = Doctor.create(body) as any

			await doctor.save()

			for (let schedule of body.workingSchedules) {
				this.clinicDoctorWorkingScheduleService.create(
					Object.assign({ data, doctor: doctor }, schedule),
				)
			}

			this.clinicDoctorsService.create({
				clinic: body.clinicID,
				doctor: body.doctor,
			})

			await this.phoneService.create(
				Object.assign({ ...body, doctor: doctor }),
			)

			await this.emailService.create(
				Object.assign({ ...body, doctor: doctor }),
			)

			return this.findOne(doctor.id)
		} catch (error) {
			console.log(error)
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: DoctorDto | any): Promise<Doctor | any> {
		try {
			return await Doctor.update(id, body)
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Doctor> {
		try {
			const data = await Doctor.findOneOrFail(id)
			Doctor.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}

	async upload(body: any, files: Express.Multer.File[] = []): Promise<void> {
		for (let file of files) {
			this.update(body.id, {
				avatar:
					process.env.API_URL +
					ROUTES.DOCTOR +
					'/photo/' +
					file.filename,
			})
		}
	}
}
