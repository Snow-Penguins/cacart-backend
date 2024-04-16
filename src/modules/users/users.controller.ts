import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
    return this.usersService.createUser(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: LoginUserDto) {
    return this.usersService.validateUser(dto);
  }
}