import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAllUsers() {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto) {
    try {
      return await this.usersService.createUser(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to sign up',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  async signIn(@Body() dto: LoginUserDto) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to sign in',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('addresses/:userId')
  async getUserAddress(@Param('userId') userId: string) {
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.usersService.getUserAddress(userIdInt);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to get user address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    try {
      return this.authService.requestPasswordReset(email);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to request password reset',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    try {
      return this.authService.resetPassword(token, password);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to reset password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    try {
      const user = await this.usersService.getUserById(userId);
      console.log('User data:', user);
      const addresses = await this.usersService.getUserAddress(userId);
      console.log('User addresses:', addresses);
      return { ...user, addresses };
    } catch (error) {
      console.log('Error getting user by ID:', error);
      throw new Error('Failed to get user');
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    try {
      console.log('Update user data:', updateData);
      return await this.usersService.updateUser(userId, updateData);
    } catch (error) {
      console.log('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  @Put(':userId/addresses/:addressId')
  async updateUserAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() data: Prisma.AddressUpdateInput,
  ) {
    const userIdInt = parseInt(userId, 10);
    const addressIdInt = parseInt(addressId, 10);
    if (isNaN(userIdInt) || isNaN(addressIdInt)) {
      throw new Error('Invalid user ID or address ID');
    }
    try {
      console.log('Update address data:', data);
      return await this.usersService.updateUserAddress(
        userIdInt,
        addressIdInt,
        data,
      );
    } catch (error) {
      console.log('Error updating address:', error);
      throw new Error('Failed to update address');
    }
  }

  @Post(':userId/addresses')
  async createUserAddress(
    @Param('userId') userId: string,
    @Body() data: Prisma.AddressCreateInput,
  ) {
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new Error('Invalid user ID');
    }
    try {
      console.log('Create address data:', data);
      return await this.usersService.createUserAddress(userIdInt, data);
    } catch (error) {
      console.log('Error creating address:', error);
      throw new Error('Failed to create address');
    }
  }
}
