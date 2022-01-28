import { editFileName, imageFileFilter } from './../../helpers/helpers'
import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicPhotosService } from './clinic-photos.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Avatars')
@Controller(resolveAPI(ROUTES.CLINIC_PHOTOS))
export class ClinicPhotosController {
	constructor(private service: ClinicPhotosService) {}

	@UseInterceptors(
		FilesInterceptor('avatar', 10, {
			storage: diskStorage({
				destination: './public/uploads/clinic/photos/',
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
		this.service.upload(body, files)
	}
}
