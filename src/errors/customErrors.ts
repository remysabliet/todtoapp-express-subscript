export class CustomError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        // Capture stack trace (only in V8-compatible environments)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
    }
}
