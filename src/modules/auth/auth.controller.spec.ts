import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            requestPasswordReset: jest.fn(),
            resetPassword: jest.fn(),
            validateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('requestResetPassword', () => {
    it('should call requestPasswordReset from authService with the correct email', async () => {
      (authService.requestPasswordReset as jest.Mock).mockResolvedValueOnce({
        message: 'Mocked Reset',
      });

      const result = await controller.requestResetPassword('test@example.com');

      expect(authService.requestPasswordReset).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual({ message: 'Mocked Reset' });
    });
  });
});
