import { PatientAvatar } from './modules/patient-avatar/patient-avatar.enitity'
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
import { ClinicAvatarsModule } from './modules/clinic-avatar/clinic-avatar.module'
import { ClinicPromotionModule } from './modules/clinic-promotion/clinic-promotion.module'
import { ClinicPromotionPhotoModule } from './modules/clinic-promotion-photo/clinic-promotion-photo.module'
import { MawedyInboxModule } from './modules/mawedy-inbox/mawedy-inbox.module'
import { MawedyTrafficModule } from './modules/mawedy-traffic/mawedy-traffic.module'
import { MawedySessionModule } from './modules/mawedy-session/mawedy-session.module'
import { ClinicPromotionsDoctorsModule } from './modules/clinic-promotions-doctor/clinic-promotions-doctor.module'
import { ClinicPromotionsAnalyticsModule } from './modules/clinic-promotions-analytic/clinic-promotion-analytic.module'
import { ClinicAppointmentsModule } from './modules/clinic-appointment/clinic-appointment.module'
import { ClinicRatingsViaGoogleModule } from './modules/clinic-ratings-via-google/clinic-ratings-via-google.module'
import { ClinicMedicalServicesDoctorsModule } from './modules/clinic-medical-services-doctor/clinic-medical-services-doctor.module'
import { ClinicAppointment } from './modules/clinic-appointment/clinic-appointment.entity'
import { ClinicAvatar } from './modules/clinic-avatar/clinic-avatar.entity'
import { ClinicPromotion } from './modules/clinic-promotion/clinic-promotion.entity'
import { ClinicMedicalServiceDoctor } from './modules/clinic-medical-services-doctor/clinic-medical-services-doctor.entity'
import { ClinicPromotionAnalytic } from './modules/clinic-promotions-analytic/clinic-promotion-analytic.entity'
import { ClinicPromotionDoctor } from './modules/clinic-promotions-doctor/clinic-promotions-doctor.entity'
import { ClinicRatingViaGoogle } from './modules/clinic-ratings-via-google/clinic-ratings-via-google.entity'
import { AppInbox } from './modules/mawedy-inbox/mawedy-inbox.entity'
import { AppSession } from './modules/mawedy-session/mawedy-session.entity'
import { AppTraffic } from './modules/mawedy-traffic/mawedy-traffic.entity'
import { ClinicFollowUpCheckUpModule } from './modules/clinic-follow-up-check-up/clinic-follow-up-check-up.module'
import { PatientAvatarModule } from './modules/patient-avatar/patient-avatar.module'
import { PatientFavoritedClinicModule } from './modules/patient-favorited-clinic/patient-favorited-clinic.module'
import { PatientSearchModule } from './modules/patient-search/patient-search.module'
import { PatientBookingListModule } from './modules/patient-booking-list/patient-booking-list.module'
import { PatientMedicalRecordModule } from './modules/patient-medical-record/patient-medical-record.module'
import { PatientBookingFollowUpModule } from './modules/patient-booking-follow-up/patient-booking-follow-up.module'
import { PatientsBookingListFilesModule } from './modules/patients-booking-list-files/patients-booking-list-files.module'
import { DoctorRatingModule } from './modules/doctor-rating/doctor-rating.module'
import { DoctorOverallRatingModule } from './modules/doctor-overall-rating/doctor-overall-rating.module'
import { ClinicFollowUp } from './modules/clinic-follow-up-check-up/clinic-follow-up-check-up.entity'
import { DoctorOverAllRating } from './modules/doctor-overall-rating/doctor-overall-rating.entity'
import { DoctorRating } from './modules/doctor-rating/doctor-rating.entity'
import { PatientBookingFollowUp } from './modules/patient-booking-follow-up/patient-booking-follow-up.entity'
import { PatientBookingList } from './modules/patient-booking-list/patient-booking-list.entity'
import { PatientFavoriteClinic } from './modules/patient-favorited-clinic/patient-favorited-clinic.entity'
import { PatientMedicalRecord } from './modules/patient-medical-record/patient-medical-record.entity'
import { PatientSearch } from './modules/patient-search/patient-search.entity'
import { PatientBookingListFile } from './modules/patients-booking-list-files/patients-booking-list-files.entity'
import { NotificationModule } from './modules/notification/notification.module'
import { Notification } from './modules/notification/notification.entity'
import { AuthenticationModule } from './authentication/authentication.module'

const entities = [
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
	ClinicAppointment,
	ClinicAvatar,
	ClinicMedicalServiceDoctor,
	ClinicPromotion,
	ClinicPromotionAnalytic,
	ClinicPromotionDoctor,
	ClinicRatingViaGoogle,
	AppInbox,
	AppSession,
	AppTraffic,
	ClinicFollowUp,
	DoctorOverAllRating,
	DoctorRating,
	ClinicFollowUp,
	PatientBookingFollowUp,
	PatientBookingList,
	PatientFavoriteClinic,
	PatientMedicalRecord,
	PatientSearch,
	PatientBookingListFile,
	Notification,
	PatientAvatar,
]
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forFeature([]),
		TypeOrmModule.forRoot({
			type: process.env.DB_TYPE as any,
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: entities,
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
		ClinicAvatarsModule,
		ClinicPromotionModule,
		ClinicPromotionPhotoModule,
		ClinicPromotionsDoctorsModule,
		ClinicPromotionsAnalyticsModule,
		ClinicAppointmentsModule,
		ClinicRatingsViaGoogleModule,
		ClinicMedicalServicesDoctorsModule,
		MawedyInboxModule,
		MawedyTrafficModule,
		MawedySessionModule,
		ClinicFollowUpCheckUpModule,
		PatientAvatarModule,
		PatientFavoritedClinicModule,
		PatientSearchModule,
		PatientBookingListModule,
		PatientMedicalRecordModule,
		PatientBookingFollowUpModule,
		PatientsBookingListFilesModule,
		DoctorRatingModule,
		DoctorOverallRatingModule,
		NotificationModule,
		AuthenticationModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
