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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
