import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admin)
		private model: Repository<Admin>,
	) {}

	async findAll(): Promise<Admin[]> {
		return this.model.find()
	}

	async findOne(id: string): Promise<Admin> {
		return this.model.findOne(id)
	}

	async create(body: any): Promise<any> {
		// const admin = this.model.create(Admin,body)
		return 'admin'
	}

	async update(id: number, body: any): Promise<any> {
		// return this.model.update(body)
	}

	async remove(id: number): Promise<void> {
		await this.model.delete(id)
	}
}
