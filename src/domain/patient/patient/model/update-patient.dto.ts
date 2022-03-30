import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-competition.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
