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
import { ApiHeaders, ApiTags } from '@nestjs/swagger'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicMedicalServiceImageService } from './clinic-medical-service-image.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from 'src/helpers/helpers'
import { Observable, of } from 'rxjs'

@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Medical Service Image')
@Controller(resolveAPI(ROUTES.CLINIC_MEDICAL_SERVICES_IMAGES))
export class ClinicMedicalServiceImageController {
	constructor(private readonly service: ClinicMedicalServiceImageService) {}

	@UseInterceptors(
		FilesInterceptor('photos', 10, {
			storage: diskStorage({
				destination: './public/uploads/medical-services/photos/',
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
		this.service.upload(body, files)
	}

	@Get('photo/:path')
	getPhoto(@Param('path') path, @Res() res): Observable<Object> {
		return of(
			res.sendFile(
				`${process.cwd()}/public/uploads/medical-services/photos/${path}`,
			),
		)
	}
}
