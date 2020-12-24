import { ParseUUIDPipe } from "@nestjs/common";

export const standardUUIDPipe = new ParseUUIDPipe({ version: "4" });
