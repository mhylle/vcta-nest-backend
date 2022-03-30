import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    givenName: string;

    @Prop()
    familyName: string;

    @Prop({unique: true, required: true, trim: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    mustChangePassword?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
