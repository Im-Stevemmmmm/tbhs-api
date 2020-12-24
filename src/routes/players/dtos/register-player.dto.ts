import { Player } from "@prisma/client";

export class RegisterPlayerDto implements Partial<Player> {
    readonly uuid: string;
}
