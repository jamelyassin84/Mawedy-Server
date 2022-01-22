import { SocialPlatformType } from './mawedy-traffic.entity'
import { ApiProperty } from '@nestjs/swagger'
export class AppTrafficDto {
	@ApiProperty()
	registered: boolean = false

	@ApiProperty()
	viewed: boolean = false

	@ApiProperty()
	downloaded: boolean = false

	@ApiProperty()
	engaged: boolean = false

	@ApiProperty()
	social_platform: SocialPlatformType = 'Facebook'

	@ApiProperty()
	session_type: 'web' | 'app'
}
