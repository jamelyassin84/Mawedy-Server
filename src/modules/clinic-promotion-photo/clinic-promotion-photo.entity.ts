import { ClinicPromotion } from './../clinic-promotion/clinic-promotion.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClinicPromotionPhoto extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

	@Column()
	isActive: boolean

	@ManyToOne(() => ClinicPromotion, (clinicPromotion) => clinicPromotion.id)
	clinicPromotion: ClinicPromotion

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
