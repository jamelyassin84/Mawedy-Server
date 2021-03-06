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

	async findAll(param: any): Promise<ClinicAppointment[]> {
		const { clinic } = param

		if (clinic) {
			return await ClinicAppointment.find({
				where: { clinic: clinic },
				relations: [
					'patient',
					'doctor',
					'clinicPromotion',
					'clinicMedicalService',
					'followUp',
					'patientBookingList',
				],
			})
		}
		return await ClinicAppointment.find({
			relations: [
				'patient',
				'doctor',
				'clinicPromotion',
				'clinicMedicalService',
				'followUp',
				'patientBookingList',
			],
		})
	}

	async findOne(id: number): Promise<ClinicAppointment> {
		try {
			return await ClinicAppointment.findOne(id)
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: ClinicAppointmentDto | any): Promise<ClinicAppointment> {
		const { doctor, clinic, service, patient } = body

		try {
			const appointment = ClinicAppointment.create({
				...body,
				clinicMedicalService: service,
			}) as any

			await appointment.save()

			const booking = await this.patientBookingListService.create({
				hasCanceled: false,
				hasResult: false,
				doctor: doctor,
				patient: patient,
				clinic: clinic,
				clinicAppointment: appointment,
				referenceNumber: appointment.referenceNumber,
			})

			await this.patientBookingFollowUpService.create({
				should_follow_up: false,
				patientBookingList: booking,
				clinicAppointment: appointment,
			})

			return appointment
		} catch (error) {
			console.log(error)
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
