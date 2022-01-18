export enum ROUTES {
	AUTH = 'auth',
	ADMIN = 'admin',
	ROLES = 'role',
	EMAILS = 'email',
	PHONES = 'phone',
	DEVICES = 'device',
	LOGS = 'log',

	APP_IMAGES = 'app-images',
	APP_INBOX = 'app-inbox',

	CLINICS = 'clinic',
	CLINIC_SERVICES = 'clinic-service',
	CLINIC_RATINGS = 'clinic-rating',
	CLINIC_RATINGS_VIA_GOOGLE = 'clinic-rating-via-google',
	CLINIC_SUBSCRIPTIONS = 'clinic-subscription',
	CLINIC_SUBSCRIPTIONS_REVENUES = 'clinic-subscription-revenue',
	CLINIC_PROMOTIONS = 'clinic-promotion',
	CLINIC_PROMOTIONS_ANALYTICS = 'clinic-promotion-analytic',
	CLINIC_PROMOTIONS_DOCTORS = 'clinic-promotion-doctor',
	CLINIC_PROMOTIONS_PHOTOS = 'clinic-promotion-photo',
	CLINIC_ACCOUNTS = 'clinic-account',
	CLINIC_APPOINTMENTS = 'clinic-appointment',
	CLINIC_TIMINGS = 'clinic-timings',
	CLINIC_PATIENTS = 'clinic-patient',
	CLINIC_AVATARS = 'clinic-avatar',
	CLINIC_FILES = 'clinic-file',
	CLINIC_FOLLOW_UP_CHECK_UPS = 'clinic-follow-up-check-up',
	CLINIC_DEPARTMENT = 'clinic-department',
	CLINIC_DEPARTMENT_DOCTORS = 'clinic-department-doctor',
	CLINIC_DOCTORS = 'clinic-doctor',
	CLINIC_MEDICAL_SERVICES = 'clinic-medical=service',
	CLINIC_MEDICAL_SERVICES_IMAGES = 'clinic-medical=service-image',
	CLINIC_MEDICAL_SERVICES_DOCTORS = 'clinic-medical=service-doctor',
	CLINIC_DOCTORS_WORKING_SCHEDULES = 'clinic-doctors-working-schedule',

	DOCTOR = 'doctor',
	DOCTOR_RATINGS = 'doctor-ratings',
	DOCTOR_OVERALL_RATING = 'doctor-overall-rating',

	PATIENTS = 'patient',
}

export const resolveAPI = (route: ROUTES) => {
	return `${route}`
}
