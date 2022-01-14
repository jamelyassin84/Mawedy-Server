import { Module } from '@nestjs/common'
import { ClinicPromotionsDoctorsService } from './clinic-promotions-doctor.service'
import { ClinicPromotionsDoctorsController } from './clinic-promotions-doctor.controller'

@Module({
	controllers: [ClinicPromotionsDoctorsController],
	providers: [ClinicPromotionsDoctorsService],
})
export class ClinicPromotionsDoctorsModule {}
