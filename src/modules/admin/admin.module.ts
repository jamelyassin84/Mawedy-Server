import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { RolesModule } from '../role/roles.module'

@Module({
	imports: [RolesModule],
	controllers: [AdminController],
	providers: [AdminService],
	exports: [AdminService],
})
export class AdminModule {}
