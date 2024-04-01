import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBabyBedding() {
  const idForBabyBedding = await prisma.productCategory.findUnique({
    where: { name: 'Baby Bedding' },
  });

  if (idForBabyBedding) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForBabyBedding.id,
          option_name: 'Blanket Color',
        },
        {
          category_id: idForBabyBedding.id,
          option_name: 'Size',
        },
      ],
    });
  }
  const blanketColorOption = await prisma.option.findFirst({
    where: {
      AND: [
        { category_id: idForBabyBedding.id },
        { option_name: 'Blanket Color' },
      ],
    },
  });

  if (blanketColorOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: blanketColorOption.id,
          value: 'Cream',
          qty_by_option: 10,
        },
        {
          option_id: blanketColorOption.id,
          value: 'Light Brown',
          qty_by_option: 10,
        },
      ],
    });
  }

  const babyBeddingProduct = await prisma.product.create({
    data: {
      category_id: idForBabyBedding.id,
      name: 'Baby Blanket',
      description: 'A soft and cozy baby blanket',
      product_image: [],
    },
  });

  const babyBeddingProductItem = await prisma.productItem.create({
    data: {
      product_id: babyBeddingProduct.id,
      SKU: 'BB001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 56.01,
    },
  });

  const creamOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: blanketColorOption.id }, { value: 'Cream' }],
    },
  });

  if (creamOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyBeddingProductItem.id,
        option_values_id: creamOptionValue.id,
      },
    });
  } else {
    console.log('Cream option value not found');
  }

  const darkBrownOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: blanketColorOption.id }, { value: 'Light Brown' }],
    },
  });

  if (darkBrownOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyBeddingProductItem.id,
        option_values_id: darkBrownOptionValue.id,
      },
    });
  } else {
    console.log('Light Brown option value not found');
  }
}
