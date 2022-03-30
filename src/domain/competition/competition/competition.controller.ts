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
import { CompetitionService } from './competition.service';
import { PaginationQueryDto } from '../../../infrastructure/persistence/pagination-query.dto';
import { CreateCompetitionDto } from './model/create-competition.dto';
import { UpdateCompetitionDto } from './model/update-competition.dto';

@Controller('api/competitions')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @Get('/active')
  public async getActiveCompetition(@Res() res) {
    const competition = await this.competitionService.getActiveCompetition();
    return res.status(HttpStatus.OK).json(competition);
    // return new Competition();
  }
  @Post('/:id/active')
  public async activateCompetition(
    @Res() res,
    @Param('id') competitionId: string,
  ) {
    const competition = await this.competitionService.activateCompetition(
      competitionId,
    );
    return res.status(HttpStatus.OK).json(competition);
    // return new Competition();
  }

  @Get()
  public async getAllCompetitions(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const competitions = await this.competitionService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(competitions);
  }

  @Get('/:id')
  public async getCompetition(@Res() res, @Param('id') competitionId: string) {
    const competition = await this.competitionService.findOne(competitionId);
    if (!competition) {
      throw new NotFoundException('Competition does not exist!');
    }
    return res.status(HttpStatus.OK).json(competition);
  }

  @Post()
  public async addCompetition(
    @Res() res,
    @Body() createCompetitionDto: CreateCompetitionDto,
  ) {
    try {
      const competition = await this.competitionService.create(
        createCompetitionDto,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Competition has been created successfully',
        competition: competition,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Competition not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateCompetition(
    @Res() res,
    @Param('id') competitionId: string,
    @Body() updateCompetitionDto: UpdateCompetitionDto,
  ) {
    try {
      const competition = await this.competitionService.update(
        competitionId,
        updateCompetitionDto,
      );
      if (!competition) {
        throw new NotFoundException('Competition does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Competition has been successfully updated',
        competition: competition,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Competition not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteCompetition(
    @Res() res,
    @Param('id') competitionId: string,
  ) {
    if (!competitionId) {
      throw new NotFoundException('Competition ID does not exist');
    }

    const competition = await this.competitionService.remove(competitionId);

    if (!competition) {
      throw new NotFoundException('Competition does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Competition has been deleted',
      competition: competition,
    });
  }
}
