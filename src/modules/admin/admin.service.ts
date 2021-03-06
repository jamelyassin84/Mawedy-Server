import { DevicesService } from './../device/device.service'
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
import { Device } from '../device/device.entity'

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

	async create(body: CreateAdminDto | any, isServer?: false): Promise<Admin> {
		try {
			const admin = Admin.create(body) as any
			await admin.save()
			const data = {
				admin: admin as any,
				...body,
				isActive: true,
			}
			await this.roleService.create(data)
			await this.emailService.create(data)
			await this.phoneService.create(data)
			return await Admin.findOne({
				where: { id: admin.id },
				relations: ['roles', 'emails', 'phones', 'devices'],
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
		return await Admin.findOne({
			where: {
				username: username,
			},
		})
	}

	seedAdministrator(): Admin | any {
		return this.create({
			id: 0,
			email: 'admin',
			phone: 971,
			areaCode: 567995775,
			role: 'Super Admin',
			username: 'admin',
			password: 'admin',
		})
	}
}
