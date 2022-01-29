import { Injectable } from '@nestjs/common'
import { Admin } from './modules/admin/admin.entity'
import { AdminService } from './modules/admin/admin.service'

@Injectable()
export class AppService {
	constructor(protected service: AdminService) {}
}
