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

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Phone[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Phone> {
		return this.service.findOne(+id)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() body: PhoneDto): Promise<Phone> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: PhoneDto | any): Promise<Phone> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Phone> {
		return this.service.remove(+param.id)
	}
}
