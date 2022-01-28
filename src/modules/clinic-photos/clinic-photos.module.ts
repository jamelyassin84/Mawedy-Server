import { Module } from '@nestjs/common'
import { ClinicPhotosController } from './clinic-photos.controller'
import { ClinicPhotosService } from './clinic-photos.service'

@Module({
	controllers: [ClinicPhotosController],
	providers: [ClinicPhotosService],
	exports: [ClinicPhotosService],
})
export class ClinicPhotosModule {}
