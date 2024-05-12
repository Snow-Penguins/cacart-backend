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
    console.log('Login attempt: ', dto.email);

    const user = await this.usersService.findUserByEmail(dto.email);
    console.log('User detail: ', user);

    if (!user || !(await compare(dto.password, user.password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const access_token = this.generateJwtToken(user);
    console.log(access_token);
    return {
      access_token,
      email_address: user.email_address,
      message: 'Login Successful. Welcome!',
    };
  }

  async loginWithGoogle(payload: UserPayload): Promise<LoginResponse> {
    const user = await this.usersService.findOrCreateUserForOAuth(payload);
    const access_token = this.generateJwtToken(user);
    return {
      access_token,
      email_address: user.email_address,
      message: 'Login Successful. Welcome!',
    };
  }

  private generateJwtToken(user: any): string {
    const payload = {
      email_address: user.email_address,
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
    };
    console.log('User data for JWT: ', user);
    console.log('Payload for JWT: ', payload);
    return this.jwtService.sign(payload);
  }
}
