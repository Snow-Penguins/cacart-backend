import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedClothingWomens() {
  const idForWomensClothing = await prisma.productCategory.findUnique({
    where: { name: "Women's Clothing" },
  });

  if (idForWomensClothing) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForWomensClothing.id,
          option_name: 'Size',
        },
        {
          category_id: idForWomensClothing.id,
          option_name: 'Color',
        },
      ],
    });
  }

  const sizeOption = await prisma.option.findFirst({
    where: {
      AND: [{ category_id: idForWomensClothing.id }, { option_name: 'Size' }],
    },
  });

  if (sizeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: sizeOption.id,
          value: 'Small',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: 'Medium',
          qty_by_option: 10,
        },
        {
          option_id: sizeOption.id,
          value: 'Large',
          qty_by_option: 10,
        },
      ],
    });
  }

  const womensClothingProduct = await prisma.product.create({
    data: {
      category_id: idForWomensClothing.id,
      name: 'Womens T-Shirt',
      description: 'A comfortable t-shirt',
      product_image: [],
    },
  });

  const womensClothingProductItem = await prisma.productItem.create({
    data: {
      product_id: womensClothingProduct.id,
      SKU: 'WOMENSTSHIRT001',
      qty_in_stock: 30,
      qty_sold: 0,
      price: 25.0,
    },
  });

  const smallSizeOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: 'Small' }],
    },
  });

  if (smallSizeOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: womensClothingProductItem.id,
        option_values_id: smallSizeOptionValue.id,
      },
    });
  }

  const mediumSizeOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: sizeOption.id }, { value: 'Medium' }],
    },
  });

  if (mediumSizeOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: womensClothingProductItem.id,
        option_values_id: mediumSizeOptionValue.id,
      },
    });
  }
}
