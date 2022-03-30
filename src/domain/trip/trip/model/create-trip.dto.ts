import {
  IsBoolean, IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {Schema as MongooseSchema} from 'mongoose';

export class CreateTripDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly distance: number;

  @IsNotEmpty()
  competitionId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;
}
