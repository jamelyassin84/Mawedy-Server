import { ApiProperty } from '@nestjs/swagger'
import { Admin } from '../admin/admin.entity'

export class MawedyImagesDto {
	@ApiProperty()
	order: number = 1

	@ApiProperty()
	url: boolean = true

	admin?: Admin
}
