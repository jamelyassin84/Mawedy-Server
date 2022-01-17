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

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private jwtService: JwtService,
	) {}

	async login(body: AuthLoginDto) {
		let user: any
		if (body.type === 'admin') {
			user = await this.validateAdmin(body)
		}
		if (body.type === 'clinic') {
			user = await this.validateClinic(body)
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
		return {
			user: user,
			token: this.jwtService.sign({
				userId: user.id,
			}),
		}
	}

	async validateAdmin(body: AuthLoginDto): Promise<Admin> {
		const { username, password } = body
		const user = await this.adminService.findByUsername(username)
		if (!(await user?.validatePassword(password))) {
			throw new UnauthorizedException('Username or password is incorrect')
		}
		return user
	}

	async validateClinic(body: AuthLoginDto): Promise<Clinic | any> {
		// const user = await this.adminService.findByUsername(email)
		// if (!(await user?.validatePassword(password))) {
		// 	throw new UnauthorizedException()
		// }
		return {}
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
}
