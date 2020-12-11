import { Controller } from "@nestjs/common";
import { PitDataService } from "./pit-data.service";

@Controller("pit-data")
export class PitDataController {
    constructor(private readonly pitDataService: PitDataService) {}
}
