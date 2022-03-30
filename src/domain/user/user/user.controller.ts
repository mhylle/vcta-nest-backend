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
import {UserService} from './user.service';
import {PaginationQueryDto} from '../../../infrastructure/persistence/pagination-query.dto';
import {CreateUserDto} from './model/create-user.dto';
import {UpdateUserDto} from './model/update-user.dto';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    public async getAllUser(@Res() res, @Query() paginationQuery: PaginationQueryDto,) {
        const users = await this.userService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Res() res, @Param('id') UserId: string) {
        const User = await this.userService.findOne(UserId);
        if (!User) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(User);
    }

    @Post()
    public async addUser(@Res() res, @Body() createUserDto: CreateUserDto,) {
        try {
            const user = await this.userService.create(createUserDto);
            return res.status(HttpStatus.OK).json({
                message: 'User has been created successfully',
                user: user,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: `Error: User not created! ${err.message}`,
                status: 400,
            });
        }
    }

    @Put('/:id')
    public async updateUser(@Res() res, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto,) {
        try {
            const user = await this.userService.update(
                userId,
                updateUserDto,
            );
            if (!user) {
                throw new NotFoundException('User does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user: user,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not updated!',
                status: 400,
            });
        }
    }

    @Delete('/:id')
    public async deleteUser(@Res() res, @Param('id') userId: string) {
        if (!userId) {
            throw new NotFoundException('User ID does not exist');
        }

        const user = await this.userService.remove(userId);

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user: user,
        });
    }
}
