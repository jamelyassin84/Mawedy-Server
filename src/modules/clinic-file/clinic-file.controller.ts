import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { Observable, of } from 'rxjs'
import { join } from 'path/posix'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic File')
@Controller(resolveAPI(ROUTES.CLINIC_FILES))
export class ClinicFilesController {
	constructor() {}

	@Get('trade-license/:path')
	getPhoto(@Param('path') path, @Res() res): Observable<Object> {
		return of(
			res.sendFile(
				`${process.cwd()}/public/uploads/clinic/trade-license/${path}`,
			),
		)
	}
}
