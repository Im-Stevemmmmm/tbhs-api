import { Player } from "@prisma/client";

export class UpdatePlayerDto implements Partial<Player> {
    readonly rank: string;
}
