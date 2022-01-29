import { Module } from '@nestjs/common'
import { ClinicAvatarsService } from './clinic-avatar.service'
import { ClinicAvatarsController } from './clinic-avatar.controller'

@Module({
	controllers: [ClinicAvatarsController],
	providers: [ClinicAvatarsService],
	exports: [ClinicAvatarsService],
})
export class ClinicAvatarsModule {}
