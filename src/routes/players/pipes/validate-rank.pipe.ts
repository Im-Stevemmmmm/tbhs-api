import {
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ValidateRankPipe implements PipeTransform {
    transform(value: string) {
        const ranks = ["noob"];

        if (!ranks.includes(value)) {
            const status = HttpStatus.FORBIDDEN;

            throw new HttpException(
                { status, error: "Invalid rank. Rank must be noob." },
                status
            );
        }

        return value;
    }
}
