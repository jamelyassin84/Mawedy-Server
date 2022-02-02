import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from 'src/helpers/helpers'
import { Observable, of } from 'rxjs'
import { PatientAvatarService } from './patient-avatar.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patient Avatars')
@Controller(resolveAPI(ROUTES.PATIENT_AVATARS))
export class PatientAvatarController {
	constructor(private readonly service: PatientAvatarService) {}

	@UseInterceptors(
		FilesInterceptor('avatar', 1, {
			storage: diskStorage({
				destination: './public/uploads/patient/avatars/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('upload')
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
				`${process.cwd()}/public/uploads/patient/avatars/${path}`,
			),
		)
	}
}
