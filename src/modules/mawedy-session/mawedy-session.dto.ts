import { ApiProperty } from '@nestjs/swagger'
import { Admin } from '../admin/admin.entity'

export class AppSessionDto {
	@ApiProperty()
	country: string | null = null

	@ApiProperty()
	state: string | null = null

	@ApiProperty()
	city: string | null = null

	@ApiProperty()
	address: string | null = null
}
