import { Clinic } from '../clinic/clinic.entity'
import { Roles } from '../role/roles.entity'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'
@Entity()
export class Admin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: true,
	})
	username: string

	@Column()
	password: string

	@Column({
		nullable: true,
	})
	avatar: string

	@Column()
	isActive: boolean | false

	@Column()
	isLoggedIn: boolean | true

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

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 8)
	}

	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password)
	}
}
