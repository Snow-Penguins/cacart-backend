import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedClothingWomens_2() {
  const idForWomensClothing = await prisma.productCategory.findUnique({
    where: { name: "Women's Clothing" },
  });
  if (idForWomensClothing) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForWomensClothing.id,
          option_name: 'Primary colour',
        },
      ],
    });
  }

  const colourOption = await prisma.option.findFirst({
    where: {
      AND: [
        { category_id: idForWomensClothing.id },
        { option_name: 'Primary colour' },
      ],
    },
  });

  if (colourOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: colourOption.id,
          value: 'Mocha',
          qty_by_option: 10,
        },
        {
          option_id: colourOption.id,
          value: 'Smoke',
          qty_by_option: 10,
        },
        {
          option_id: colourOption.id,
          value: 'Camel',
          qty_by_option: 10,
        },
      ],
    });
  }

  const womensClothingProduct = await prisma.product.create({
    data: {
      category_id: idForWomensClothing.id,
      name: 'Long Skirt',
      description: 'Loose Wear Skirt',
      product_image: [],
    },
  });

  const womensClothingProductItem = await prisma.productItem.create({
    data: {
      product_id: womensClothingProduct.id,
      SKU: 'WS001',
      qty_in_stock: 30,
      qty_sold: 0,
      price: 30.99,
    },
  });

  const mochaColourOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: colourOption.id }, { value: 'Mocha' }],
    },
  });

  if (mochaColourOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: womensClothingProductItem.id,
        option_values_id: mochaColourOptionValue.id,
      },
    });
  }

  const smokeColourOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: colourOption.id }, { value: 'Smoke' }],
    },
  });

  if (smokeColourOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: womensClothingProductItem.id,
        option_values_id: smokeColourOptionValue.id,
      },
    });
  }

  const camelColourOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: colourOption.id }, { value: 'Camel' }],
    },
  });
  if (camelColourOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: womensClothingProductItem.id,
        option_values_id: camelColourOptionValue.id,
      },
    });
  }
}
