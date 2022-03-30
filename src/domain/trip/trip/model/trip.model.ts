import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Competition} from '../../../competition/competition/model/competition.model';
import {User} from '../../../user/user/model/user.model';
import {Schema as MongooseSchema} from 'mongoose';

@Schema()
export class Trip extends Document {
    @Prop({required: true, trim: true})
    date: string;

    @Prop({required: true, trim: true})
    distance: number;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: Competition.name})
    competition: MongooseSchema.Types.ObjectId;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
    user: MongooseSchema.Types.ObjectId;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
