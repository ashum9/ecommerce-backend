import multer from "multer"

const dataStorage = multer.memoryStorage()

export const singleUpload = multer({storage : dataStorage}).single("file")