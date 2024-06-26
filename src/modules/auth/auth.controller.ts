import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
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
}
