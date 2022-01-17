import { DeviceDto } from './device.dto'
import { DevicesService } from './device.service'
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
import { ROUTES } from 'src/routes/routes'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { Device } from './device.entity'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@Controller(ROUTES.DEVICES)
@ApiTags('Devices')
export class DevicesController {
	constructor(private readonly service: DevicesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Device[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Device> {
		return this.service.findOne(+id)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() body: DeviceDto): Promise<Device> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: DeviceDto | any,
	): Promise<Device> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Device> {
		return this.service.remove(+param.id)
	}
}
