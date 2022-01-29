export const imageFileFilter = (req, file, callback) => {
	callback(null, true)
}
export const editFileName = (req, file, callback) => {
	callback(
		null,
		`${file.originalname}${Date.now()}.` +
			file.originalname.substring(
				file.originalname.lastIndexOf('.') + 1,
				file.originalname.length,
			) || file.originalname,
	)
}
