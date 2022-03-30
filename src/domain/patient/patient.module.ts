import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './patient/model/patient.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
