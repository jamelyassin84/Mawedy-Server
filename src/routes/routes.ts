export enum ROUTES {
	AUTH = 'auth',
	ADMIN = 'admins',
	ROLES = 'roles',
	EMAILS = 'emails',
	PHONES = 'phones',
	DEVICES = 'devices',
	CLINICS = 'clinics',
	CLINIC_SUBSCRIPTIONS = 'clinic-subscriptions',
	CLINIC_ACCOUNTS = 'clinic-accounts',
	CLINIC_APPOINTMENTS = 'clinic-appointments',
	PATIENTS = 'patients',
	CLINIC_AVATARS = 'clinic-avatars',
	CLINIC_DEPARTMENT = 'clinic-department',
	CLINIC_DEPARTMENT_DOCTORS = 'clinic-department-doctors',
}

export const resolveAPI = (route: ROUTES) => {
	return `${route}`
}
