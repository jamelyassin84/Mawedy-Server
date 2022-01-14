import { Clinic } from '../clinic/clinic.entity'
import { Roles } from '../role/roles.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	avatar: string

	@Column()
	isActive: boolean

	@Column()
	isLoggedIn: boolean

	@OneToMany(() => Roles, (role) => role.admin)
	roles: Roles[]

	@OneToMany(() => Clinic, (clinic) => clinic.approver)
	approvedClinics: Clinic[]

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date
}
