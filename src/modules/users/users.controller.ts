import {
  Controller,
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
}
