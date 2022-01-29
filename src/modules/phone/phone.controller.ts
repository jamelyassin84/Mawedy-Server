import { ROUTES } from 'src/routes/routes'
import { Phone } from './phone.entity'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { PhonesService } from './phone.service'
import { PhoneDto } from './phone.dto'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Phones')
@Controller(ROUTES.PHONES)
export class PhonesController {
	constructor(private readonly service: PhonesService) {}

	@Post()
	create(@Body() body: PhoneDto): Promise<Phone> {
		return this.service.create(body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<Phone> {
		return this.service.remove(+param.id)
	}

	@Get('clinic/:id')
	async getPhoneByClinic(@Param() param): Promise<Phone[]> {
		return this.service.getPhoneByClinic(+param.id)
	}
}
