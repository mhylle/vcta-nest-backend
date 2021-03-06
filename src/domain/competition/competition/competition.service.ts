import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Competition} from './model/competition.model';
import {PaginationQueryDto} from '../../../infrastructure/persistence/pagination-query.dto';
import {CreateCompetitionDto} from './model/create-competition.dto';
import {UpdateCompetitionDto} from './model/update-competition.dto';

@Injectable()
export class CompetitionService {
    constructor(@InjectModel(Competition.name) private readonly competitionModel: Model<Competition>,) {
    }

    public async findAll(paginationQuery: PaginationQueryDto,): Promise<Competition[]> {
        const {limit, offset} = paginationQuery;

        return await this.competitionModel.find().skip(offset).limit(limit).exec();
    }

    public async findOne(competitionId: string): Promise<Competition> {
        const competition = await this.competitionModel
            .findById({_id: competitionId})
            .exec();

        if (!competition) {
            throw new NotFoundException(`Competition #${competitionId} not found`);
        }

        return competition;
    }

    public async create(createCompetitionDto: CreateCompetitionDto,): Promise<Competition> {
        const newCompetition = await new this.competitionModel(createCompetitionDto);
        return newCompetition.save();
    }

    public async update(competitionId: string, updateCompetitionDto: UpdateCompetitionDto,): Promise<Competition> {
        const existingCompetition = await this.competitionModel.findByIdAndUpdate(
            {_id: competitionId},
            updateCompetitionDto,
        );

        if (!existingCompetition) {
            throw new NotFoundException(`Competition #${competitionId} not found`);
        }

        return existingCompetition;
    }

    public async remove(competitionId: string): Promise<any> {
        return this.competitionModel.findByIdAndRemove(competitionId);
    }

    async getActiveCompetition(): Promise<Competition> {
        const competition = await this.competitionModel
            .findOne({active: true})
            .exec();

        if (!competition) {
            throw new NotFoundException(`No active competition found`);
        }

        return competition;
    }

    async activateCompetition(competitionId: string): Promise<Competition> {
        try {
            const activeCompetition = await this.getActiveCompetition();
            if (activeCompetition) {
                activeCompetition.active = false;
                await activeCompetition.save();
            }
        } catch (e) {
            // no active competitions, do nothing
        }

        const competition = await this.findOne(competitionId);
        if (!competition) {
            throw new NotFoundException(`Competition #${competitionId} not found`);
        }
        competition.active = true;
        await competition.save();

        return competition;
    }
}
