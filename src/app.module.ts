import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {CompetitionModule} from './domain/competition/competition.module';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {MongooseModule} from '@nestjs/mongoose';
import {TripModule} from './domain/trip/trip.module';
import {UserModule} from './domain/user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nest'),
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
        }),
        EventEmitterModule.forRoot(),
        CompetitionModule,
        TripModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private configService: ConfigService) {
        // get an environment variable
        const dbUser = this.configService.get<string>('database.DATABASE_USER');

        // get a custom configuration value
        const dbHost = this.configService.get<string>('database.host');
        console.log(dbUser, dbHost);
    }
}
