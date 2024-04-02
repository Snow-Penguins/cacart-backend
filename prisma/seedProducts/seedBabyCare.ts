import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBabyCare() {
  const idForBabyCare = await prisma.productCategory.findUnique({
    where: { name: 'Baby Care' },
  });

  if (idForBabyCare) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForBabyCare.id,
          option_name: 'Purchase Type',
        },
      ],
    });
  }

  const purchaseTypeOption = await prisma.option.findFirst({
    where: {
      AND: [
        { category_id: idForBabyCare.id },
        { option_name: 'Purchase Type' },
      ],
    },
  });

  if (purchaseTypeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: purchaseTypeOption.id,
          value: 'Single',
          qty_by_option: 10,
        },
        {
          option_id: purchaseTypeOption.id,
          value: 'Set',
          qty_by_option: 10,
        },
      ],
    });
  }

  const babyCareProduct = await prisma.product.create({
    data: {
      category_id: idForBabyCare.id,
      name: 'Baby Shower Gift',
      description: 'Personalized Wooden Baby Hair Brush',
      product_image: [],
    },
  });

  const babyCareProductItem = await prisma.productItem.create({
    data: {
      product_id: babyCareProduct.id,
      SKU: 'BABYSHOWERGIFT001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 20,
    },
  });
  const singleOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: purchaseTypeOption.id }, { value: 'Single' }],
    },
  });

  if (singleOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyCareProductItem.id,
        option_values_id: singleOptionValue.id,
      },
    });
  }
  const setOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: purchaseTypeOption.id }, { value: 'Set' }],
    },
  });
  if (setOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: babyCareProductItem.id,
        option_values_id: setOptionValue.id,
      },
    });
  } else {
    console.log('Set option value not found');
  }
}
