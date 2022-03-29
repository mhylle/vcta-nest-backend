
import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {CompetitionController} from './competition/competition.controller';
import {CompetitionService} from './competition/competition.service';
import {MongooseModule} from '@nestjs/mongoose';
import {CompetitionSchema} from './competition/model/competition.model';

@Module({
    imports: [ConfigModule,
    MongooseModule.forFeature([
        {name: 'Competition', schema: CompetitionSchema}
    ])],
    controllers: [CompetitionController],
    providers: [CompetitionService],
})
export class CompetitionModule {
}
