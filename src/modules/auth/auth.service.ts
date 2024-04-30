import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export interface UserPayload {
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(user: any): Promise<string> {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
    };

    const dbUser = await this.usersService.findOrCreateUserByEmail(payload);

    return this.jwtService.signAsync({ userEmail: dbUser.email });
  }
}
