import { PhonesModule } from './../phone/phone.module'
import { EmailsModule } from './../email/email.module'
import { Module } from '@nestjs/common'
import { ClinicService } from './clinic.service'
import { ClinicController } from './clinic.controller'
import { RolesModule } from '../role/roles.module'
import { DevicesModule } from '../device/device.module'

@Module({
	imports: [RolesModule, EmailsModule, PhonesModule, DevicesModule],
	controllers: [ClinicController],
	providers: [ClinicService],
	exports: [ClinicService],
})
export class ClinicModule {}
