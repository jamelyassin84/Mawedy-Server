export enum ROUTES {
	AUTH = 'auth',
	ADMIN = 'admin',
	ROLES = 'role',
	EMAILS = 'email',
	PHONES = 'phone',
	DEVICES = 'device',
	CLINICS = 'clinic',
	CLINIC_SUBSCRIPTIONS = 'clinic-subscription',
	CLINIC_ACCOUNTS = 'clinic-account',
	CLINIC_APPOINTMENTS = 'clinic-appointment',
	PATIENTS = 'patient',
	CLINIC_AVATARS = 'clinic-avatar',
	CLINIC_FILES = 'clinic-file',
	CLINIC_FOLLOW_UP_CHECK_UPS = 'clinic-follow-up-check-up',
	CLINIC_DEPARTMENT = 'clinic-department',
	CLINIC_DEPARTMENT_DOCTORS = 'clinic-department-doctor',
	CLINIC_DOCTORS = 'clinic-doctor',
	CLINIC_MEDICAL_SERVICES = 'clinic-medical=service',
	CLINIC_MEDICAL_SERVICES_IMAGES = 'clinic-medical=service-image',
	CLINIC_DOCTORS_WORKING_SCHEDULES = 'clinic-doctors-working-schedule',
}

export const resolveAPI = (route: ROUTES) => {
	return `${route}`
}
