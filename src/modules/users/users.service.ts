import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email_address: dto.email,
      },
    });

    if (existingUser) {
      throw new HttpException(
        'User with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.prisma.user.create({
      data: {
        email_address: dto.email,
        password: dto.password,
      },
    });
    return newUser;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
