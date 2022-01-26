import { ClinicFilesModule } from './../clinic-file/clinic-file.module'
import { MawedyInboxModule } from './../mawedy-inbox/mawedy-inbox.module'
import { ClinicSubscriptionsModule } from './../clinic-subscription/clinic-subscription.module'
import { ClinicAccountModule } from './../clinic-account/clinic-account.module'
import { PhonesModule } from './../phone/phone.module'
import { EmailsModule } from './../email/email.module'
import { forwardRef, Module } from '@nestjs/common'
import { ClinicService } from './clinic.service'
import { ClinicController } from './clinic.controller'
import { RolesModule } from '../role/roles.module'
import { DevicesModule } from '../device/device.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
	imports: [
		MulterModule.register({
			dest: './public/uploads/clinic-files/',
		}),
		ClinicAccountModule,
		RolesModule,
		EmailsModule,
		PhonesModule,
		DevicesModule,
		ClinicSubscriptionsModule,
		ClinicAccountModule,
		MawedyInboxModule,
		ClinicFilesModule,
	],
	controllers: [ClinicController],
	providers: [ClinicService],
	exports: [ClinicService],
})
export class ClinicModule {}
