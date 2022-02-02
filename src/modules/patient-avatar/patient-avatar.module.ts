import { EmailsModule } from './../email/email.module'
import { Module } from '@nestjs/common'
import { PatientAvatarService } from './patient-avatar.service'
import { PatientAvatarController } from './patient-avatar.controller'
import { PhonesModule } from '../phone/phone.module'

@Module({
	imports: [EmailsModule, PhonesModule],
	controllers: [PatientAvatarController],
	providers: [PatientAvatarService],
})
export class PatientAvatarModule {}
