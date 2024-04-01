import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBabyClothing() {
  const idForBabyClothing = await prisma.productCategory.findUnique({
    where: { name: 'Baby Clothes' },
  });

  if (idForBabyClothing) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForBabyClothing.id,
          option_name: 'Size',
        },
        {
          category_id: idForBabyClothing.id,
          option_name: 'Color',
        },
      ],
    });
  }

  const sizeOption = await prisma.option.findFirst({
    where: {
      AND: [{ category_id: idForBabyClothing.id }, { option_name: 'Size' }],
    },
  });

  if (sizeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: sizeOption.id,
          value: '0-3 months',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: '3-6 months',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: '6-9 months',
          qty_by_option: 10,
        },
      ],
    });
  }

  const babyClothingProduct = await prisma.product.create({
    data: {
      category_id: idForBabyClothing.id,
      name: 'Baby Sweater',
      description: 'A cozy baby sweater',
      product_image: [],
    },
  });

  const babyClothingProductItem = await prisma.productItem.create({
    data: {
      product_id: babyClothingProduct.id,
      SKU: 'BABYSWEATER001',
      qty_in_stock: 30,
      qty_sold: 0,
      price: 35.99,
    },
  });

  const zeroToThreeMonths = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: '0-3 months' }],
    },
  });

  if (zeroToThreeMonths) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyClothingProductItem.id,
        option_values_id: zeroToThreeMonths.id,
      },
    });
  }

  const threeToSixMonths = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: '3-6 months' }],
    },
  });

  if (threeToSixMonths) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyClothingProductItem.id,
        option_values_id: threeToSixMonths.id,
      },
    });
  }

  const sixToNineMonths = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: '6-9 months' }],
    },
  });
  if (sixToNineMonths) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyClothingProductItem.id,
        option_values_id: sixToNineMonths.id,
      },
    });
  }
}
