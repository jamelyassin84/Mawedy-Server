import { Clinic } from './../clinic/clinic.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClinicPromotion } from '../clinic-promotion/clinic-promotion.entity'

@Entity()
export class ClinicPromotionAnalytic {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	reached: boolean

	@Column()
	viewed: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => ClinicPromotion, (doctor) => doctor.id)
	doctor: ClinicPromotion

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
