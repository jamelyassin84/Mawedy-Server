import { Admin } from './../modules/admin/admin.entity'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from 'src/modules/admin/admin.service'
import { AuthLoginDto } from './auth-login.dto'

@Injectable()
export class AuthService {
	constructor(
		private adminService: AdminService,
		private jwtService: JwtService,
	) {}

	async login(authLoginDto: AuthLoginDto) {
		const user = await this.validateUser(authLoginDto)
		const payload = {
			userId: user.id,
		}

		return {
			access_token: this.jwtService.sign(payload),
		}
	}

	async validateUser(authLoginDto: AuthLoginDto): Promise<Admin> {
		const { email, password } = authLoginDto

		const user = await this.adminService.findByUsername(email)
		if (!(await user?.validatePassword(password))) {
			throw new UnauthorizedException()
		}

		return user
	}
}
