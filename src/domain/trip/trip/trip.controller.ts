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
import {TripService} from './trip.service';
import {PaginationQueryDto} from '../../../infrastructure/persistence/pagination-query.dto';
import {CreateTripDto} from './model/create-trip.dto';
import {UpdateTripDto} from './model/update-trip.dto';

@Controller('api/trips')
export class TripController {
    constructor(private readonly tripService: TripService) {
    }

    @Get()
    public async getAllTrips(
        @Res() res,
        @Query() paginationQuery: PaginationQueryDto,
    ) {
        const trips = await this.tripService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(trips);
    }

    @Get('/:id')
    public async getTrip(@Res() res, @Param('id') tripId: string) {
        const trip = await this.tripService.findOne(tripId);
        if (!trip) {
            throw new NotFoundException('Trip does not exist!');
        }
        return res.status(HttpStatus.OK).json(trip);
    }

    @Post()
    public async addTrip(@Res() res, @Body() createTripDto: CreateTripDto,) {
        try {
            const trip = await this.tripService.create(
                createTripDto,
            );
            return res.status(HttpStatus.OK).json({
                message: 'Trip has been created successfully',
                trip: trip,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: `Error: Trip not created! ${err.message}`,
                status: 400,
            });
        }
    }

    @Put('/:id')
    public async updateTrip(
        @Res() res,
        @Param('id') tripId: string,
        @Body() updateTripDto: UpdateTripDto,
    ) {
        try {
            const trip = await this.tripService.update(
                tripId,
                updateTripDto,
            );
            if (!trip) {
                throw new NotFoundException('Trip does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'Trip has been successfully updated',
                trip: trip,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Trip not updated!',
                status: 400,
            });
        }
    }

    @Delete('/:id')
    public async deleteTrip(
        @Res() res,
        @Param('id') tripId: string,
    ) {
        if (!tripId) {
            throw new NotFoundException('Trip ID does not exist');
        }

        const trip = await this.tripService.remove(tripId);

        if (!trip) {
            throw new NotFoundException('Trip does not exist');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Trip has been deleted',
            trip: trip,
        });
    }
}
