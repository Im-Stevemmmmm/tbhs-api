import { HttpException, HttpStatus } from "@nestjs/common";

export class PlayerNotFoundException extends HttpException {
    constructor() {
        const status = HttpStatus.NOT_FOUND;

        super(
            {
                status,
                error: "Player does not exist.",
            },
            status
        );
    }
}
