import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { compare } from 'bcryptjs';
import { LoginResponse } from 'src/types/LoginResponse';

export interface UserPayload {
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!user || !(await compare(dto.password, user.password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const access_token = this.generateJwtToken(user);
    return {
      access_token,
      email_address: user.email,
      message: 'Login Successful. Welcome!',
    };
  }

  async loginWithGoogle(payload: UserPayload): Promise<LoginResponse> {
    const user = await this.usersService.findOrCreateUserForOAuth(payload);
    const access_token = this.generateJwtToken(user);
    return {
      access_token,
      email_address: user.email,
      message: 'Login Successful. Welcome!',
    };
  }

  private generateJwtToken(user: any): string {
    const payload = {
      email_address: user.email,
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
    };

    return this.jwtService.sign(payload);
  }
}
