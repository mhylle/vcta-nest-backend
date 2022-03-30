import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Trip} from './model/trip.model';
import {PaginationQueryDto} from '../../../infrastructure/persistence/pagination-query.dto';
import {CreateTripDto} from './model/create-trip.dto';
import {UpdateTripDto} from './model/update-trip.dto';

@Injectable()
export class TripService {
    constructor(@InjectModel(Trip.name) private readonly tripModel: Model<Trip>,) {
    }

    public async findAll(paginationQuery: PaginationQueryDto,): Promise<Trip[]> {
        const {limit, offset} = paginationQuery;

        return await this.tripModel.find().skip(offset).limit(limit).exec();
    }

    public async findOne(tripId: string): Promise<Trip> {
        const trip = await this.tripModel
            .findById({_id: tripId})
            .exec();

        if (!trip) {
            throw new NotFoundException(`Trip #${tripId} not found`);
        }

        return trip;
    }

    public async create(createTripDto: CreateTripDto,): Promise<Trip> {
        const newTrip = await new this.tripModel(createTripDto);
        return newTrip.save();
    }

    public async update(tripId: string, updateTripDto: UpdateTripDto,): Promise<Trip> {
        const existingTrip = await this.tripModel.findByIdAndUpdate(
            {_id: tripId},
            updateTripDto,
        );

        if (!existingTrip) {
            throw new NotFoundException(`Trip #${tripId} not found`);
        }

        return existingTrip;
    }

    public async remove(tripId: string): Promise<any> {
        return this.tripModel.findByIdAndRemove(tripId);
    }
}
