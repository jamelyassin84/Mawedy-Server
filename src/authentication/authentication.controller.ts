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
	async login(@Body() authLoginDto: AuthLoginDto) {
		return this.authService.login(authLoginDto)
	}
}
