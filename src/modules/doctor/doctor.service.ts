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

@Injectable()
export class DoctorService {
	constructor(
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
		protected clinicDoctorsService: ClinicDoctorsService,
	) {}

	async findAll(): Promise<Doctor[]> {
		return await Doctor.find({
			relations: ['emails', 'phones', 'clinic'],
		})
	}

	async findAllBtyClinic(id: number): Promise<Doctor> {
		try {
			return await Doctor.findOne({
				where: {
					clinic: id,
				},
				relations: ['emails', 'phones', 'clinic'],
			})
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async findOne(id: number): Promise<Doctor> {
		try {
			return await Doctor.findOne(id, {
				relations: ['emails', 'phones', 'clinic'],
			})
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

			await this.emailService.create(data)

			await this.phoneService.create(data)

			const doctor = Doctor.create(body) as any

			await doctor.save()

			await this.phoneService.create(data)

			return this.findOne(doctor.id)
		} catch (error) {
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
			await this.create({
				clinic: body.id,
				avatar:
					process.env.API_URL +
					ROUTES.DOCTOR +
					'/photo/' +
					file.filename,
			})
		}
	}
}
