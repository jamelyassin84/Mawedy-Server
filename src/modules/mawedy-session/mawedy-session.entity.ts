import { Clinic } from '../clinic/clinic.entity'
import { Roles } from '../role/roles.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class AppSession {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	country: string

	@Column()
	state: string

	@Column()
	city: string

	@Column()
	address: string

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
