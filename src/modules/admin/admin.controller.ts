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

@Controller(resolveAPI(ROUTES.ADMIN))
export class AdminController {
	constructor(protected service: AdminService) {}

	@Get()
	async findAll(@Param() param): Promise<Admin[]> {
		return this.service.findAll()
	}

	@Get(':id')
	async findOne(@Param() param): Promise<Admin> {
		return this.service.findOne(param.id)
	}

	@Post()
	async create(@Body() body): Promise<Admin> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(@Param() param, @Body() body): Promise<any> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<any> {
		return this.service.remove(param.id)
	}
}
