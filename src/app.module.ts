import { ClinicMedicalServiceImage } from './modules/clinic-medical-service-image/clinic-medical-service-image.entity'
import { ClinicTiming } from './modules/clinic-timings/clinic-timings.entity'
import { ClinicServiceEntity } from './modules/clinic-service/clinic-service.entity'
import { ClinicRating } from './modules/clinic-rating/clinic-rating.entity'
import { ClinicPatient } from './modules/clinic-patient/clinic-patient.entity'
import { ClinicMedicalService } from './modules/clinic-medical-service/clinic-medical-service.entity'
import { ClinicFile } from './modules/clinic-file/clinic-file.entity'
import { ClinicDoctorWorkingSchedule } from './modules/clinic-doctor-working-schedule/clinic-doctor-working-schedule.entity'
import { ClinicDoctor } from './modules/clinic-doctor/clinic-doctor.entity'
import { ClinicDepartmentDoctor } from './modules/clinic-department-doctor/clinic-department-doctor.entity'
import { ClinicDepartment } from './modules/clinic-department/clinic-department.enitiy'
import { ClinicSubscription } from './modules/clinic-subscription/clinic-subscription.entity'
import { ClinicAccount } from './modules/clinic-account/clinic-account.entity'
import { Clinic } from './modules/clinic/clinic.entity'
import { Phone } from './modules/phone/phone.entity'
import { Log } from './modules/log/log.entity'
import { MawedyImages } from './modules/mawedy-image/mawedy-image.entity'
import { Roles } from './modules/role/roles.entity'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './modules/admin/admin.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from './modules/role/roles.module'
import { Connection } from 'typeorm'
import { Admin } from './modules/admin/admin.entity'
import { MawedyImagesModule } from './modules/mawedy-image/mawedy-image.module'
import { PhonesModule } from './modules/phone/phone.module'
import { EmailsModule } from './modules/email/email.module'
import { LogsModule } from './modules/log/log.module'
import { DevicesModule } from './modules/device/device.module'
import { Device } from './modules/device/device.entity'
import { Email } from './modules/email/email.entity'
import { ClinicModule } from './modules/clinic/clinic.module'
import { PatientModule } from './modules/patient/patient.module'
import { DoctorModule } from './modules/doctor/doctor.module'
import { ClinicAccountModule } from './modules/clinic-account/clinic-account.module'
import { Patient } from './modules/patient/patient.entity'
import { Doctor } from './modules/doctor/doctor.entity'
import { ClinicSubscriptionsRevenueModule } from './modules/clinic-subscription-revenue/clinic-subscription-revenue.module'
import { ClinicSubscriptionsModule } from './modules/clinic-subscription/clinic-subscription.module'
import { ClinicSubscriptionRevenue } from './modules/clinic-subscription-revenue/clinic-subscription-revenue.entity'
import { ClinicTimingsModule } from './modules/clinic-timings/clinic-timings.module'
import { ClinicFilesModule } from './modules/clinic-file/clinic-file.module'
import { ClinicRatingsModule } from './modules/clinic-rating/clinic-rating.module'

import { ClinicDepartmentsModule } from './modules/clinic-department/clinic-department.module'
import { ClinicPatientModule } from './modules/clinic-patient/clinic-patient.module'
import { ClinicServiceModule } from './modules/clinic-service/clinic-service.module'
import { ClinicMedicalServiceModule } from './modules/clinic-medical-service/clinic-medical-service.module'
import { ClinicMedicalServiceImageModule } from './modules/clinic-medical-service-image/clinic-medical-service-image.module'
import { ClinicDoctorWorkingScheduleModule } from './modules/clinic-doctor-working-schedule/clinic-doctor-working-schedule.module'
import { ClinicDepartmentDoctorModule } from './modules/clinic-department-doctor/clinic-department-doctor.module'
import { ClinicDoctorsModule } from './modules/clinic-doctor/clinic-doctor.module'
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forFeature([]),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '',
			database: 'mawedy',
			entities: [
				Admin,
				Roles,
				MawedyImages,
				Device,
				Email,
				Log,
				Phone,
				Clinic,
				ClinicAccount,
				Doctor,
				Patient,
				ClinicSubscription,
				ClinicSubscriptionRevenue,
				ClinicDepartment,
				ClinicDepartmentDoctor,
				ClinicDoctor,
				ClinicDoctorWorkingSchedule,
				ClinicFile,
				ClinicMedicalService,
				ClinicPatient,
				ClinicRating,
				ClinicServiceEntity,
				ClinicTiming,
				ClinicMedicalServiceImage,
			],
			synchronize: true,
		}),
		AdminModule,
		RolesModule,
		MawedyImagesModule,
		PhonesModule,
		EmailsModule,
		LogsModule,
		DevicesModule,
		ClinicModule,
		PatientModule,
		DoctorModule,
		ClinicAccountModule,
		ClinicSubscriptionsModule,
		ClinicSubscriptionsRevenueModule,
		ClinicTimingsModule,
		ClinicFilesModule,
		ClinicRatingsModule,
		ClinicDoctorsModule,
		ClinicDepartmentsModule,
		ClinicPatientModule,
		ClinicServiceModule,
		ClinicMedicalServiceModule,
		ClinicMedicalServiceImageModule,
		ClinicDoctorWorkingScheduleModule,
		ClinicDepartmentDoctorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
