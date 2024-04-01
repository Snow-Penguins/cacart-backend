import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedClothingMens() {
  const idForMensClothing = await prisma.productCategory.findUnique({
    where: { name: "Men's Clothing" },
  });

  if (idForMensClothing) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForMensClothing.id,
          option_name: 'Size',
        },
        {
          category_id: idForMensClothing.id,
          option_name: 'Color',
        },
      ],
    });
  }

  const sizeOption = await prisma.option.findFirst({
    where: {
      AND: [{ category_id: idForMensClothing.id }, { option_name: 'Size' }],
    },
  });

  if (sizeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: sizeOption.id,
          value: 'Large',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: 'X-Large',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: 'XX-Large',
          qty_by_option: 10,
        },
      ],
    });
  }

  const mensClothingProduct = await prisma.product.create({
    data: {
      category_id: idForMensClothing.id,
      name: 'Mens T-Shirt',
      description: 'A comfortable t-shirt',
      product_image: [],
    },
  });

  const mensClothingProductItem = await prisma.productItem.create({
    data: {
      product_id: mensClothingProduct.id,
      SKU: 'MENSTSHIRT001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 35.0,
    },
  });

  const largeOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: 'Large' }],
    },
  });

  if (largeOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: mensClothingProductItem.id,
        option_values_id: largeOptionValue.id,
      },
    });
  }

  const xLargeOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: 'X-Large' }],
    },
  });

  if (xLargeOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: mensClothingProductItem.id,
        option_values_id: xLargeOptionValue.id,
      },
    });
  }
}
