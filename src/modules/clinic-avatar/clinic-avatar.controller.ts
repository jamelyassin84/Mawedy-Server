import { editFileName, imageFileFilter } from './../../helpers/helpers'
import { ClinicAvatarsService } from './clinic-avatar.service'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicAvatar } from './clinic-avatar.entity'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Observable, of } from 'rxjs'
import { join } from 'path/posix'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Avatars')
@Controller(resolveAPI(ROUTES.CLINIC_AVATARS))
export class ClinicAvatarsController {
	constructor(private readonly service: ClinicAvatarsService) {}

	@UseInterceptors(
		FilesInterceptor('avatar', 1, {
			storage: diskStorage({
				destination: './public/uploads/clinic/avatars/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('upload') //TODO: CLINIC GUARD
	async setAvatar(
		@Body() body: any,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<void> {
		console.log(files)
		this.service.upload(body, files)
	}

	@Get('photo/:path')
	getPhoto(@Param('path') path, @Res() res): Observable<Object> {
		return of(
			res.sendFile(
				join(process.cwd(), `/public/uploads/clinic/avatars/${path}`),
			),
		)
	}
}
