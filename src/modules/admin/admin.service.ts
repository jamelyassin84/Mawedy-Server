import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAdminDto } from './admin.dto'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
	constructor() {}

	async findAll(): Promise<Admin[]> {
		const admin = await Admin.find()
		admin.map((admin) => delete admin.password)
		return admin
	}

	async findOne(id: number): Promise<Admin> {
		const admin = await Admin.findOne(id)
		delete admin.password
		return admin
	}

	async create(createAdminDto: CreateAdminDto) {
		const admin = Admin.create(createAdminDto)
		await admin.save()
		delete admin.password
		return admin
	}

	async findByUsername(username: string) {
		const user = await Admin.findOne({
			where: {
				email: username,
			},
		})
		if (Object.keys(user).length === 0) {
			return await Admin.findOne({
				where: {
					email: username,
				},
			})
		}
		return user
	}

	// async update(id: number, body: any): Promise<any> {
	// 	return await Admin.update(body)
	// }

	// async remove(id: number): Promise<void> {
	// 	await this.model.delete(id)
	// }
}
