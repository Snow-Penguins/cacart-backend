import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedJewellyNecklaces() {
  // Necklace
  // option table seed data
  const idForNecklaces = await prisma.productCategory.findUnique({
    where: {
      name: 'Necklaces',
    },
  });

  if (idForNecklaces) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForNecklaces.id,
          option_name: 'Color',
        },
        {
          category_id: idForNecklaces.id,
          option_name: 'Length',
        },
      ],
    });
  } else {
    console.log('Necklaces not found');
  }
  // option_value table seed data
  const colorOption = await prisma.option.findFirst({
    where: {
      AND: [{ option_name: 'Color' }, { category_id: idForNecklaces.id }],
    },
  });

  if (colorOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: colorOption.id,
          value: 'Gold',
          qty_by_option: 10,
        },
        {
          option_id: colorOption.id,
          value: 'Silver',
          qty_by_option: 10,
        },
      ],
    });
  } else {
    console.log('Color option not found');
  }
  // product table seed data
  const necklaceProduct = await prisma.product.create({
    data: {
      category_id: idForNecklaces.id,
      name: 'Tiny Freshwater Pearl Necklace',
      description: 'A dainty freshwater pearl necklace',
      product_image: [],
    },
  });
  // product_item table seed data
  const necklaceProductItem = await prisma.productItem.create({
    data: {
      product_id: necklaceProduct.id,
      SKU: 'NECKLACE001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 55.2,
    },
  });
  // product_item_option_values table seed data
  const goldOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ value: 'Gold' }, { option_id: colorOption.id }],
    },
  });

  const silverOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ value: 'Silver' }, { option_id: colorOption.id }],
    },
  });

  if (goldOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: necklaceProductItem.id,
        option_values_id: goldOptionValue.id,
      },
    });
  } else {
    console.log('Gold option value not found');
  }

  if (silverOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: necklaceProductItem.id,
        option_values_id: silverOptionValue.id,
      },
    });
  } else {
    console.log('Silver option value not found');
  }
}
