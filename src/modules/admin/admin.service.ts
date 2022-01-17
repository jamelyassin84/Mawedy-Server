import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { RolesService } from '../role/roles.service'
import { AdminRoles, CreateAdminDto } from './admin.dto'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
	constructor(protected roleService: RolesService) {}

	async findAll(): Promise<Admin[]> {
		const admins = await Admin.find({ relations: ['roles'] })
		admins.forEach((admin) => delete admin.password)
		return admins
	}

	async findOne(id: number): Promise<Admin> {
		try {
			const admin = await Admin.findOneOrFail(id)
			return admin
		} catch (error) {
			throw new NotFoundException('User might be moved or deleted.')
		}
	}

	async create(body: CreateAdminDto): Promise<Admin> {
		try {
			const admin = Admin.create(body)
			await admin.save()
			await this.roleService.create({
				admin: admin,
				role: body.email as AdminRoles,
				isActive: true,
			})
			return await Admin.findOne({
				where: { id: admin.id },
				relations: ['roles'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: CreateAdminDto): Promise<Admin | any> {
		try {
			const admin = await Admin.update(id, body)
			return admin
		} catch (error) {
			throw new NotFoundException(
				'Unable to update user might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Admin> {
		try {
			const admin = await Admin.findOneOrFail(id)
			Admin.delete(id)
			return admin
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete user might be moved or deleted.',
			)
		}
	}

	async findByUsername(username: string): Promise<Admin> {
		return await Admin.findOneOrFail({
			where: {
				username: username,
			},
		})
	}
}
