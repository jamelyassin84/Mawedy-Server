import { DoctorDto } from './doctor.dto'
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
import { Doctor } from './doctor.entity'
import { DoctorService } from './doctor.service'
import { Observable, of } from 'rxjs'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from 'src/helpers/helpers'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Doctor')
@Controller(resolveAPI(ROUTES.DOCTOR))
export class DoctorController {
	constructor(private readonly service: DoctorService) {}

	@Get()
	async findAll(): Promise<Doctor[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Doctor> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() body: DoctorDto): Promise<Doctor> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(@Param() param, @Body() body: DoctorDto): Promise<Doctor> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<Doctor> {
		return this.service.remove(+param.id)
	}

	@Get('clinic/:id')
	findAllBtyClinic(@Param('id') id: string): Promise<Doctor[]> {
		return this.service.findAllByClinic(+id)
	}

	@UseInterceptors(
		FilesInterceptor('avatar', 1, {
			storage: diskStorage({
				destination: './public/uploads/doctor/avatars/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('upload')
	async setPhoto(
		@Body() body: any,
		@UploadedFiles() photos: Express.Multer.File[],
	): Promise<void> {
		this.service.upload(body, photos)
	}

	@Get('photo/:path')
	getPhoto(@Param('path') path, @Res() res): Observable<Object> {
		return of(
			res.sendFile(
				`${process.cwd()}/public/uploads/doctor/avatars/${path}`,
			),
		)
	}

	@Post('search')
	search(@Body() body: { keyword: string }): Promise<Doctor[]> {
		return this.service.search(body)
	}
}
