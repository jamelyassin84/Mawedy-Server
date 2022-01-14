import { Module } from '@nestjs/common'
import { ClinicDepartmentsService } from './clinic-department.service'
import { ClinicDepartmentsController } from './clinic-department.controller'

@Module({
	controllers: [ClinicDepartmentsController],
	providers: [ClinicDepartmentsService],
})
export class ClinicDepartmentsModule {}
