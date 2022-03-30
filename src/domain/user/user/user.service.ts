import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './model/user.model';
import {PaginationQueryDto} from '../../../infrastructure/persistence/pagination-query.dto';
import {CreateUserDto} from './model/create-user.dto';
import {UpdateUserDto} from './model/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {
    }

    public async findAll(paginationQuery: PaginationQueryDto,): Promise<User[]> {
        const {limit, offset} = paginationQuery;

        return await this.userModel.find().skip(offset).limit(limit).exec();
    }

    public async findOne(userId: string): Promise<User> {
        const user = await this.userModel.findById({_id: userId}).exec();

        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return user;
    }

    public async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    public async update(userId: string, updateUserDto: UpdateUserDto,): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(
            {_id: userId},
            updateUserDto,
        );

        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return existingUser;
    }

    public async remove(userId: string): Promise<any> {
        return this.userModel.findByIdAndRemove(userId);
    }
}
