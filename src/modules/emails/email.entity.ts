import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admins/admin.entity'

@Entity()
export class Email {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: string

	@Column()
	email: string

	@Column()
	userType: 'doctor' | 'patient' | 'clinic' | 'clinic_accounts' | 'admin'

	@Column()
	isActive: boolean

	@ManyToOne(() => Admin, (admin) => admin.id)
	admin: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// clinic: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// patient: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// doctor: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// clinic_account: Admin

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
