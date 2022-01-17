import { Module } from '@nestjs/common'
import { ClinicAccountService } from './clinic-account.service'
import { ClinicAccountController } from './clinic-account.controller'

@Module({
	controllers: [ClinicAccountController],
	providers: [ClinicAccountService],
	exports: [ClinicAccountService],
})
export class ClinicAccountModule {}
