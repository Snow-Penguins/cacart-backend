import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  categoryId: 1,
                  name: 'product1',
                  description: 'description1',
                  product_image: ['image1'],
                  created_at: new Date(),
                  updated_at: new Date(),
                  category: {
                    name: 'category1',
                  },
                  product_items: [
                    {
                      price: 100,
                    },
                  ],
                },
                {
                  id: 2,
                  categoryId: 2,
                  name: 'product2',
                  description: 'description2',
                  product_image: ['image2'],
                  created_at: new Date(),
                  updated_at: new Date(),
                  category: {
                    name: 'category2',
                  },
                  product_items: [
                    {
                      price: 200,
                    },
                  ],
                },
              ]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const result = await service.getAllProducts();
    expect(result).toEqual([
      {
        id: 1,
        categoryId: 1,
        name: 'product1',
        description: 'description1',
        product_image: ['image1'],
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        category: {
          name: 'category1',
        },
        product_items: [
          {
            price: 100,
          },
        ],
      },
      {
        id: 2,
        categoryId: 2,
        name: 'product2',
        description: 'description2',
        product_image: ['image2'],
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        category: {
          name: 'category2',
        },
        product_items: [
          {
            price: 200,
          },
        ],
      },
    ]);
  });

  it('should call findMany on PrismaService when retrieving products', async () => {
    await service.getAllProducts();
    expect(prismaService.product.findMany).toHaveBeenCalled();
  });
});
