import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcryptjs';
import { UserPayload } from '../auth/auth.service';
import { Prisma } from '@prisma/client';

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

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_addresses: {
          include: {
            address: true,
          },
        },
      },
    });
  }

  async getUserAddress(userId: number) {
    return this.prisma.userAddress.findMany({
      where: {
        user_id: userId,
      },
      include: {
        address: true,
      },
    });
  }

  async updateUser(userId: number, updateData: any) {
    console.log('Update user data:', updateData);
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async updateUserAddress(
    userId: number,
    addressId: number,
    data: Prisma.AddressUpdateInput,
  ) {
    const userAddress = await this.prisma.userAddress.findUnique({
      where: { user_id_address_id: { user_id: userId, address_id: addressId } },
    });

    if (!userAddress) {
      throw new Error('Address not found for user');
    }

    console.log('Update address data:', data);
    return this.prisma.address.update({
      where: { id: addressId },
      data,
    });
  }

  async createUserAddress(userId: number, data: Prisma.AddressCreateInput) {
    console.log('Create address data:', data);
    const address = await this.prisma.address.create({
      data,
    });

    await this.prisma.userAddress.create({
      data: {
        user_id: userId,
        address_id: address.id,
        is_default: false,
      },
    });

    return address;
  }
}
