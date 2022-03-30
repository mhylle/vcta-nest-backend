import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Patient extends Document {
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

export const PatientSchema = SchemaFactory.createForClass(Patient);
