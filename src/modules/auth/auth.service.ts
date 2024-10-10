import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { LoginResponse } from 'src/types/LoginResponse';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

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
    private configService: ConfigService,
    private mailerService: MailerService,
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
      user_id: user.id,
    };
  }

  async loginWithGoogle(payload: UserPayload): Promise<LoginResponse> {
    const user = await this.usersService.findOrCreateUserForOAuth(payload);
    const access_token = this.generateJwtToken(user);
    return {
      access_token,
      email_address: user.email_address,
      message: 'Login Successful. Welcome!',
      user_id: user.id,
    };
  }

  private generateJwtToken(user: any): string {
    const payload = {
      email: user.email_address,
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
    };
    console.log('User data for JWT: ', user);
    console.log('Payload for JWT: ', payload);
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  async refreshToken(token: string): Promise<LoginResponse> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.usersService.findUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const newToken = this.generateJwtToken(user);
      return {
        access_token: newToken,
        email_address: user.email_address,
        message: 'Token refreshed successfully',
        user_id: user.id,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async requestPasswordReset(email: string) {
    console.log('Starting password reset process for email:', email);
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const token = this.jwtService.sign(
      { email: user.email_address },
      { expiresIn: '15m' },
    );
    const resetLink = `https://cacart-q48e.vercel.app/auth/reset-password/${token}`;

    console.log('Generated reset link:', resetLink);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: './reset-password',
      context: {
        name: user.first_name,
        resetLink,
      },
    });

    console.log('Password reset email sent to:', email);

    return { message: 'Password reset link sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    let email: string;
    try {
      const decoded = this.jwtService.verify(token);
      email = decoded.email;
      console.log('Token decoded successfully, email:', email);
      if (!email) {
        throw new Error('Email not found in token');
      }
    } catch (e) {
      console.error('Token verification failed:', e);
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await hash(newPassword, 10);
    await this.usersService.updateUser(user.id, { password: hashedPassword });

    console.log('Password reset successful for user ID:', user.id);

    return { message: 'Password reset successful' };
  }

  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      console.log('Token is valid:', decoded);
      if (!decoded.email) {
        throw new Error('Email not found in token');
      }
      return decoded;
    } catch (e) {
      console.error('Token validation failed:', e);
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
