import { resolveAPI } from './../../routes/routes'
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
import { AdminService } from './admin.service'
import { ROUTES } from '../../routes/routes'
import { Admin } from './admin.entity'
import { CreateAdminDto } from './admin.dto'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import {
	ApiBearerAuth,
	ApiHeaders,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Admins')
@Controller(resolveAPI(ROUTES.ADMIN))
export class AdminController {
	constructor(protected service: AdminService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Admin[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Admin> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
		return this.service.create(createAdminDto)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() createAdminDto: CreateAdminDto,
	): Promise<Admin> {
		return this.service.update(param.id, createAdminDto)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Admin> {
		return this.service.remove(+param.id)
	}
}
