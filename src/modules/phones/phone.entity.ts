import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admins/admin.entity'

@Entity()
export class Phone {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userType: 'doctor' | 'patient' | 'clinic' | 'clinic_accounts' | 'admin'

	@Column()
	areaCode: number

	@Column()
	phone: number

	@Column()
	verificationCode: string

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
