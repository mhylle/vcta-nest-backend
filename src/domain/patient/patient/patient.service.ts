import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './model/patient.model';
import { PaginationQueryDto } from '../../../infrastructure/persistence/pagination-query.dto';
import { CreatePatientDto } from './model/create-patient.dto';
import { UpdatePatientDto } from './model/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<Patient[]> {
    const { limit, offset } = paginationQuery;

    return await this.patientModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(patientId: string): Promise<Patient> {
    const patient = await this.patientModel.findById({ _id: patientId }).exec();

    if (!patient) {
      throw new NotFoundException(`Patient #${patientId} not found`);
    }

    return patient;
  }

  public async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = await new this.patientModel(createPatientDto);
    return newPatient.save();
  }

  public async update(
    patientId: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const existingPatient = await this.patientModel.findByIdAndUpdate(
      { _id: patientId },
      updatePatientDto,
    );

    if (!existingPatient) {
      throw new NotFoundException(`Patient #${patientId} not found`);
    }

    return existingPatient;
  }

  public async remove(patientId: string): Promise<any> {
    return this.patientModel.findByIdAndRemove(patientId);
  }
}
