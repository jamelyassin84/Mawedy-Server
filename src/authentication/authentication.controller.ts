import { RealIP } from 'nestjs-real-ip'
import { resolveAPI } from './../routes/routes'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthLoginDto } from './auth-login.dto'
import { AuthService } from './auth.service'
import { ROUTES } from '../routes/routes'

@Controller(resolveAPI(ROUTES.AUTH))
@ApiTags('Auth')
export class AuthenticationController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() body: AuthLoginDto, @RealIP() ipAddress: string) {
		return this.authService.login({ ...body, ipAddress: ipAddress })
	}

	@Post('logout')
	async logOut(@Body() body: any) {
		return this.authService.logOut(body)
	}
}
