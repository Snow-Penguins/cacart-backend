import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { compare } from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
            verify: jest.fn().mockReturnValue({ email: 'test@example.com' }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should validate user credentials and return a token', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      usersService.findUserByEmail.mockResolvedValue(mockUser);
      (compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result.access_token).toBe('mockToken');
    });
  });

  describe('requestPasswordReset', () => {
    it('should send a password reset email if user exists', async () => {
      const mockUser = { email: 'test@example.com', first_name: 'Test' };
      usersService.findUserByEmail.mockResolvedValue(mockUser);

      const result = await service.requestPasswordReset('test@example.com');
      expect(result).toEqual({ message: 'Password reset link sent' });
      expect(mailerService.sendMail).toHaveBeenCalled();
    });
  });
});
