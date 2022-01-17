import { resolveAPI } from './../../routes/routes'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { ROUTES } from '../../routes/routes'
import { Admin } from './admin.entity'
import { CreateAdminDto } from './admin.dto'

@Controller(resolveAPI(ROUTES.ADMIN))
export class AdminController {
	constructor(protected service: AdminService) {}

	@Get()
	async findAll(): Promise<Admin[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Admin> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
		return this.service.create(createAdminDto)
	}

	// @Patch(':id')
	// async update(@Param() param, @Body() body): Promise<Admin> {
	// 	return this.service.update(param.id, body)
	// }

	// @Delete(':id')
	// async remove(@Param() param): Promise<Admin> {
	// 	return this.service.remove(param.id)
	// }
}
