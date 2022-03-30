import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PaginationQueryDto } from '../../../infrastructure/persistence/pagination-query.dto';
import { CreatePatientDto } from './model/create-patient.dto';
import { UpdatePatientDto } from './model/update-patient.dto';

@Controller('api/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  public async getAllPatient(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const patients = await this.patientService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(patients);
  }

  @Get('/:id')
  public async getPatient(@Res() res, @Param('id') PatientId: string) {
    const Patient = await this.patientService.findOne(PatientId);
    if (!Patient) {
      throw new NotFoundException('Patient does not exist!');
    }
    return res.status(HttpStatus.OK).json(Patient);
  }

  @Post()
  public async addPatient(
    @Res() res,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    try {
      const patient = await this.patientService.create(createPatientDto);
      return res.status(HttpStatus.OK).json({
        message: 'Patient has been created successfully',
        patient: patient,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Patient not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updatePatient(
    @Res() res,
    @Param('id') patientId: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const patient = await this.patientService.update(
        patientId,
        updatePatientDto,
      );
      if (!patient) {
        throw new NotFoundException('Patient does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Patient has been successfully updated',
        patient: patient,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Patient not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deletePatient(@Res() res, @Param('id') patientId: string) {
    if (!patientId) {
      throw new NotFoundException('Patient ID does not exist');
    }

    const patient = await this.patientService.remove(patientId);

    if (!patient) {
      throw new NotFoundException('Patient does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Patient has been deleted',
      patient: patient,
    });
  }
}
