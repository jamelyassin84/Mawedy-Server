import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthLoginDto } from './auth-login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('AUTH')
export class AuthenticationController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() authLoginDto: AuthLoginDto) {
		return this.authService.login(authLoginDto)
	}
}
