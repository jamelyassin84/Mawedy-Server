import { Module } from '@nestjs/common'
import { ClinicFilesService } from './clinic-file.service'
import { ClinicFilesController } from './clinic-file.controller'

@Module({
	controllers: [ClinicFilesController],
	providers: [ClinicFilesService],
	exports: [ClinicFilesService],
})
export class ClinicFilesModule {}
