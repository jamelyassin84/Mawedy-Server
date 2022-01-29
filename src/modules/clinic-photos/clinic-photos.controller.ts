import { ClinicPhotoDto } from './clinic-photos.dto'
import { editFileName, imageFileFilter } from './../../helpers/helpers'
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
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Observable, of } from 'rxjs'
import { join } from 'path/posix'
import { ClinicPhotosService } from './clinic-photos.service'
import { ClinicPhoto } from './clinic-photos.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Photos')
@Controller(resolveAPI(ROUTES.CLINIC_PHOTOS))
export class ClinicPhotosController {
	constructor(private readonly service: ClinicPhotosService) {}

	@UseInterceptors(
		FilesInterceptor('photos', 10, {
			storage: diskStorage({
				destination: './public/uploads/clinic/photos/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('upload') //TODO: CLINIC GUARD
	async setPhoto(
		@Body() body: any,
		@UploadedFiles() photos: Express.Multer.File[],
	): Promise<void> {
		console.log(photos)
		this.service.upload(body, photos)
	}

	@Get('photo/:path')
	getPhoto(@Param('path') path, @Res() res): Observable<Object> {
		return of(
			res.sendFile(
				join(process.cwd(), `public/uploads/clinic/photos/${path}`),
			),
		)
	}
}
