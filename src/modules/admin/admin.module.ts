import { DevicesModule } from './../device/device.module'
import { PhonesModule } from './../phone/phone.module'
import { EmailsModule } from './../email/email.module'
import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { RolesModule } from '../role/roles.module'

@Module({
	imports: [RolesModule, EmailsModule, PhonesModule],
	controllers: [AdminController],
	providers: [AdminService],
	exports: [AdminService],
})
export class AdminModule {}
