import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcryptjs';
import { UserPayload } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        email_address: email,
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await hash(dto.password, 10);

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
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email_address: dto.email,
          password: hashedPassword,
        },
      });
      return newUser;
      // return { message: 'SignUp successful' };
    }
  }

  async registerNewUser(payload: UserPayload): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email_address: payload.email,
      },
    });

    if (existingUser) {
      throw new HttpException(
        'User with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email_address: payload.email,
        },
      });
      return newUser;
    }
  }

  async findOrCreateUserForOAuth(payload: UserPayload): Promise<any> {
    let user = await this.prisma.user.findUnique({
      where: {
        email_address: payload.email,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email_address: payload.email,
          first_name: payload.firstname,
          middle_name: payload.middlename,
          last_name: payload.lastname,
        },
      });
    }

    return user;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
