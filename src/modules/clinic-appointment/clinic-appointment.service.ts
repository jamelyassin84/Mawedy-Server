import { PatientBookingListService } from './../patient-booking-list/patient-booking-list.service'
import { ClinicAppointmentDto } from './clinic-appointment.dto'
import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { ClinicAppointment } from './clinic-appointment.entity'
import { PatientBookingFollowUpService } from '../patient-booking-follow-up/patient-booking-follow-up.service'

@Injectable()
export class ClinicAppointmentsService {
	constructor(
		private patientBookingFollowUpService: PatientBookingFollowUpService,
		private patientBookingListService: PatientBookingListService,
	) {}

	async findAll(): Promise<ClinicAppointment[]> {
		return await ClinicAppointment.find()
	}

	async findOne(id: number): Promise<ClinicAppointment> {
		try {
			return await ClinicAppointment.findOne(id)
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicAppointmentDto | any): Promise<ClinicAppointment> {
		const { doctor, clinic } = body

		try {
			const appointment = ClinicAppointment.create(body) as any
			await appointment.save()

			const booking = this.patientBookingListService.create({
				hasCanceled: false,
				hasResult: false,
				doctor: doctor,
				clinic: clinic,
				clinicAppointment: appointment,
			})

			this.patientBookingFollowUpService.create({
				should_follow_up: false,
				patientBookingList: booking,
			})

			return appointment
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: ClinicAppointmentDto | any,
	): Promise<ClinicAppointment | any> {
		try {
			return await ClinicAppointment.update(id, body)
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<ClinicAppointment> {
		try {
			const data = await ClinicAppointment.findOneOrFail(id)
			ClinicAppointment.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
