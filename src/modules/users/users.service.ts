import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { hash, compare } from 'bcryptjs';
import { UserPayload } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async findOrCreateUserByEmail(payload: UserPayload): Promise<any> {
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

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async validateUser(dto: LoginUserDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email_address: dto.email,
      },
    });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return { message: 'Login successful' };
    }
  }
}
