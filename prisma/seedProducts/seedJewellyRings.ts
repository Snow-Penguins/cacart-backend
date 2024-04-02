import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedJewellyRings() {
  // Rings
  // option table seed data
  const idForRings = await prisma.productCategory.findUnique({
    where: {
      name: 'Rings',
    },
  });

  if (idForRings) {
    await prisma.option.createMany({
      data: [
        {
          category_id: idForRings.id,
          option_name: 'Ring Size',
        },
        {
          category_id: idForRings.id,
          option_name: 'Band Color',
        },
      ],
    });
  } else {
    console.log('Rings not found');
  }
  // option_value table seed data
  const ringSizeOption = await prisma.option.findFirst({
    where: {
      AND: [{ option_name: 'Ring Size' }, { category_id: idForRings.id }],
    },
  });

  if (ringSizeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: ringSizeOption.id,
          value: '5',
          qty_by_option: 10,
        },
        {
          option_id: ringSizeOption.id,
          value: '6',
          qty_by_option: 10,
        },
        {
          option_id: ringSizeOption.id,
          value: '7',
          qty_by_option: 10,
        },
        {
          option_id: ringSizeOption.id,
          value: '8',
          qty_by_option: 10,
        },
        {
          option_id: ringSizeOption.id,
          value: '9',
          qty_by_option: 10,
        },
      ],
    });
  } else {
    console.log('Ring Size option not found');
  }
  // product table seed data
  const ringProduct = await prisma.product.create({
    data: {
      category_id: idForRings.id,
      name: 'Baguette Birthstone Ring',
      description: 'Custom Birthstone Ring',
      product_image: [],
    },
  });
  // product_item table seed data
  const ringProductItem = await prisma.productItem.create({
    data: {
      product_id: ringProduct.id,
      SKU: 'RING001',
      qty_in_stock: 50,
      qty_sold: 0,
      price: 75.5,
    },
  });
  // product_item_option_values table seed data
  const ringSize5OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: ringSizeOption.id }, { value: '5' }],
    },
  });

  if (ringSize5OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize5OptionValue.id,
      },
    });
  } else {
    console.log('Ring size 5 option value not found');
  }
  // product_item_option_values table seed data
  const ringSize6OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: ringSizeOption.id }, { value: '6' }],
    },
  });

  if (ringSize6OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize6OptionValue.id,
      },
    });
  } else {
    console.log('Ring size 6 option value not found');
  }

  const ringSize7OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: ringSizeOption.id }, { value: '7' }],
    },
  });

  if (ringSize7OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize7OptionValue.id,
      },
    });
  }

  const ringSize8OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: ringSizeOption.id }, { value: '8' }],
    },
  });

  if (ringSize8OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize8OptionValue.id,
      },
    });
  } else {
    console.log('Ring size 8 option value not found');
  }

  const ringSize9OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: ringSizeOption.id }, { value: '9' }],
    },
  });

  if (ringSize9OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize9OptionValue.id,
      },
    });
  } else {
    console.log('Ring size 9 option value not found');
  }
}
