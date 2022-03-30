import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {TripController} from './trip/trip.controller';
import {TripService} from './trip/trip.service';
import {MongooseModule} from '@nestjs/mongoose';
import {TripSchema} from './trip/model/trip.model';

@Module({
    imports: [ConfigModule,
    MongooseModule.forFeature([
        {name: 'Trip', schema: TripSchema}
    ])],
    controllers: [TripController],
    providers: [TripService],
})
export class TripModule {
}
