import { Request, Response, NextFunction } from "express"

import { generateErrorObj } from "./errorHandler"

const restrictTo = (isAdmin: Boolean, next: NextFunction) => {

    console.log(isAdmin)
    if (isAdmin !== true) {
        next(generateErrorObj("Only admins have this right.", 404, "failed"));
    }

}

export default restrictTo