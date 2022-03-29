import {Controller, Get} from '@nestjs/common';
import {Competition} from './competition.model';

@Controller('competition')
export class CompetitionController {
    @Get()
    getActiveCompetition(): Competition {
        return new Competition();
    }
}
