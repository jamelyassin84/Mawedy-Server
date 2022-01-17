import {
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common'
import { RoleDto } from './roles.dto'
import { Role } from './roles.entity'

@Injectable()
export class RolesService {
	constructor() {}

	async findAll(): Promise<Role[]> {
		const roles = await Role.find()
		return roles
	}

	async findOne(id: number): Promise<Role> {
		try {
			const role = await Role.findOneOrFail(id)
			return role
		} catch (error) {
			throw new NotFoundException('User might be moved or deleted.')
		}
	}

	async create(body: RoleDto): Promise<Role> {
		try {
			const role = Role.create(body)
			await role.save()
			console.log(body)
			return role
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(id: number, body: RoleDto): Promise<Role | any> {
		try {
			const role = await Role.update(id, body)
			return role
		} catch (error) {
			throw new NotFoundException(
				'Unable to update user might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<Role> {
		try {
			const role = await Role.findOneOrFail(id)
			return role
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete user might be moved or deleted.',
			)
		}
	}
}
