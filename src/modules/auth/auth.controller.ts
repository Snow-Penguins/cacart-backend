import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
  Param,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SupabaseService } from '../supabase/supabase.service';
import { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
  ) {}

  @Get('google')
  async signInWitGoogle() {
    try {
      return this.supabaseService.signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() _req: Request) {
    return this.authService.login(_req.user);
  }

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Req() _request: Request) {
    return { valid: true };
  }

  @Post('refresh')
  async refresh(@Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.refreshToken(token);
  }

  @Post('request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    try {
      console.log('Received request to reset password for email:', email);
      const result = await this.authService.requestPasswordReset(email);
      console.log('Password reset request result:', result);
      return result;
    } catch (error) {
      console.error('Error in requestResetPassword:', error);
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
      console.log('Received request to reset password with token:', token);
      const result = await this.authService.resetPassword(token, password);
      console.log('Password reset result:', result);
      return result;
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw new HttpException(
        'Failed to reset password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('validate-token/:token')
  async validateTokenWithGet(@Param('token') token: string) {
    try {
      this.authService.validateToken(token);
      return { valid: true };
    } catch (error) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
