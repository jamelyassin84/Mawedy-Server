import { PhonesService } from './../phone/phone.service'
import { UserType } from './../../authentication/auth-login.dto'
import { EmailsService } from './../email/email.service'
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
	constructor(
		protected roleService: RolesService,
		protected emailService: EmailsService,
		protected phoneService: PhonesService,
	) {}

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

	async create(body: CreateAdminDto | any): Promise<Admin> {
		try {
			const admin = Admin.create(body) as any
			await admin.save()
			await this.roleService.create({
				admin: admin as any,
				...body,
				isActive: true,
			})
			await this.emailService.create({
				...body,
				admin: admin,
				isActive: true,
			}),
				await this.phoneService.create({
					...body,
					admin: admin,
				})
			return await Admin.findOne({
				where: { id: admin.id },
				relations: ['roles', 'emails', 'phones'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: CreateAdminDto | any): Promise<Admin | any> {
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
