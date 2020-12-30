import { ParseUUIDPipe } from "@nestjs/common";

export const UUIDv4Pipe = new ParseUUIDPipe({ version: "4" });
