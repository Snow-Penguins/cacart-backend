import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
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
    }
  }

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto) {
    try {
      return await this.usersService.createUser(dto);
    } catch (error) {
      console.log('Error signing up:', error);
      throw new Error('Failed to sign up');
    }
  }

  @Post('signin')
  async signIn(@Body() dto: LoginUserDto) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      console.log('Error signing in:', error);
      throw new Error('Failed to sign in');
    }
  }

  @Get('addresses/:userId')
  getUserAddress(@Param('userId') userId: string) {
    const userIdInt = parseInt(userId);
    try {
      return this.usersService.getUserAddress(userIdInt);
    } catch (error) {
      console.log(error);
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
