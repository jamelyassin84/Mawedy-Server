import { Controller, Get, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('Public Path')
@Controller('/public ')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	root(@Res() res) {
		return 'tae'
	}
}
