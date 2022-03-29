import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Competition extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  year: number;

  @Prop()
  open: boolean;

  @Prop()
  started: boolean;

  @Prop()
  active: boolean;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
