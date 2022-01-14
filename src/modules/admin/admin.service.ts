import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Admin } from './admin.entity'

@Injectable()
export class AdminService {
	// constructor(
	// 	@InjectRepository(Admin)
	// 	private adminRepository: Repository<Admin>,
	// ) {}
	// findAll(): Promise<Admin[]> {
	// 	return this.adminRepository.find()
	// }
	// findOne(id: string): Promise<Admin> {
	// 	return this.adminRepository.findOne(id)
	// }
	// async remove(id: string): Promise<void> {
	// 	await this.adminRepository.delete(id)
	// }
}
