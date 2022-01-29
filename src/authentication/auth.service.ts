import { PatientService } from './../modules/patient/patient.service'
import { ClinicAccountService } from './../modules/clinic-account/clinic-account.service'
import { ClinicAccount } from './../modules/clinic-account/clinic-account.entity'
import { Clinic } from './../modules/clinic/clinic.entity'
import { Admin } from './../modules/admin/admin.entity'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/modules/admin/admin.service'
import { AuthLoginDto } from './auth-login.dto'
import { Patient } from 'src/modules/patient/patient.entity'
import { UserType } from './auth-login.dto'
import { Device } from 'src/modules/device/device.entity'
import { DevicesService } from 'src/modules/device/device.service'
import { ClinicService } from 'src/modules/clinic/clinic.service'

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private clinicService: ClinicService,
		private jwtService: JwtService,
		protected deviceService: DevicesService,
	) {}

	async login(body: AuthLoginDto) {
		let user: Clinic | Admin | ClinicAccount | Patient
		if (body.type === 'admin') {
			user = await this.validateAdmin(body)
		}
		if (body.type === 'clinic') {
			user = await this.validateClinic(body)
			if (!user.isApproved) {
				throw new UnauthorizedException(
					'We are currently reviewing your account and will get back to you once it is approved.',
				)
			}
		}
		if (body.type === 'clinic-accounts') {
			user = await this.validateClinicAccount(body)
		}
		if (body.type === 'patient') {
			user = await this.validatePatient(body)
		}
		if (Object.keys(user).length === 0) {
			throw new BadRequestException('Please specify type of Mawedy User.')
		}
		this.logDevice(body.type, user)
		return {
			user: user,
			token: this.jwtService.sign(user?.createdAt.toString()),
		}
	}

	async validateAdmin(body: AuthLoginDto): Promise<Admin> {
		const { username, password } = body

		const admin = await this.adminService.findByUsername(username)
		if (!admin) {
			throw new UnauthorizedException('Username is incorrect')
		}

		if (!(await admin?.validatePassword(password))) {
			throw new UnauthorizedException('Password is incorrect')
		}

		return admin
	}

	async validateClinic(body: AuthLoginDto): Promise<Clinic> {
		const { username, password } = body
		const clinic = await this.clinicService.findByUsername(username)
		if (!clinic) {
			throw new UnauthorizedException('Username is incorrect')
		}

		if (!(await clinic?.validatePassword(password))) {
			throw new UnauthorizedException('Password is incorrect')
		}
		return clinic
	}

	async validateClinicAccount(
		body: AuthLoginDto,
	): Promise<ClinicAccount | any> {
		// const user = await this.adminService.findByUsername(email)
		// if (!(await user?.validatePassword(password))) {
		// 	throw new UnauthorizedException()
		// }
		return {}
	}
	async validatePatient(body: AuthLoginDto): Promise<Patient | any> {
		// const user = await this.adminService.findByUsername(email)
		// if (!(await user?.validatePassword(password))) {
		// 	throw new UnauthorizedException()
		// }
		return {}
	}

	async logDevice(userType: UserType, data): Promise<Device> {
		if (userType === 'admin') {
			data = { ...data, admin: data.id }
		}

		if (userType === 'clinic') {
			data = { ...data, clinic: data.id }
		}

		if (userType === 'clinic-accounts') {
			data = { ...data, clinicAccount: data.id }
		}

		if (userType === 'patient') {
			data = { ...data, patient: data.id }
		}

		if (userType === 'doctor') {
			data = { ...data, doctor: data.id }
		}

		const device = await this.deviceService.create(data)

		return device
	}
}
