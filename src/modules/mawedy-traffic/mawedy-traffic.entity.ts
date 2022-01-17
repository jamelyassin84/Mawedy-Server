import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class AppTraffic {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	registered: boolean

	@Column()
	viewed: boolean

	@Column()
	downloaded: boolean

	@Column()
	engaged: boolean

	@Column()
	social_platform: SocialPlatformType

	@Column()
	session_type: 'web' | 'app'

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

export type SocialPlatformType =
	| 'Facebook'
	| 'Instagram'
	| 'Twitter'
	| 'Linked In'
