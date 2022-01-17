import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthLoginDto } from './auth-login.dto'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthenticationController {
	constructor(private readonly authService: AuthService) {}

	@Post('admin/login')
	async login(@Body() authLoginDto: AuthLoginDto) {
		return this.authService.login(authLoginDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/test')
	async test() {
		return 'Success!'
	}
}
