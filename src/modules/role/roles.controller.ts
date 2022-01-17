import { RolesService } from './roles.service'
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
import { ROUTES } from 'src/routes/routes'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { RoleDto } from './roles.dto'
import { Role } from './roles.entity'
@ApiTags('Roles')
@Controller(ROUTES.ROLES)
export class RolesController {
	constructor(protected service: RolesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Role[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Role> {
		return this.service.findOne(+id)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() body: RoleDto): Promise<Role> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: RoleDto): Promise<Role> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Role> {
		return this.service.remove(+param.id)
	}
}
