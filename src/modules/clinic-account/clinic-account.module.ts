import { PhonesModule } from './../phone/phone.module'
import { EmailsModule } from './../email/email.module'
import { Module } from '@nestjs/common'
import { ClinicAccountService } from './clinic-account.service'
import { ClinicAccountController } from './clinic-account.controller'
import { RolesModule } from '../role/roles.module'
import { DevicesModule } from '../device/device.module'

@Module({
	imports: [RolesModule, EmailsModule, PhonesModule, DevicesModule],
	controllers: [ClinicAccountController],
	providers: [ClinicAccountService],
	exports: [ClinicAccountService],
})
export class ClinicAccountModule {}
