import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArtPrints() {
  // Prints product
  const idForPrint = await prisma.productCategory.findUnique({
    where: { name: 'Prints' },
  });

  if (idForPrint) {
    await prisma.option.create({
      data: {
        category_id: idForPrint.id,
        option_name: 'Frame Type',
      },
    });
  } else {
    console.log('Prints not found');
  }

  const frameTypeOption = await prisma.option.findFirst({
    where: {
      AND: [{ category_id: idForPrint.id }, { option_name: 'Frame Type' }],
    },
  });

  if (frameTypeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: frameTypeOption.id,
          value: 'Framed',
          qty_by_option: 10,
        },
        {
          option_id: frameTypeOption.id,
          value: 'Unframed',
          qty_by_option: 10,
        },
      ],
    });
  } else {
    console.log('Frame Type option not found');
  }

  const printProduct = await prisma.product.create({
    data: {
      category_id: idForPrint.id,
      name: 'Abstract Art Print',
      description: 'Modern Wall Art, Large Abstract Painting Print',
      product_image: [],
    },
  });

  const printProductItem = await prisma.productItem.create({
    data: {
      product_id: printProduct.id,
      SKU: 'PRINT001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 150.0,
    },
  });

  const framedOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: frameTypeOption.id }, { value: 'Framed' }],
    },
  });

  if (framedOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: printProductItem.id,
        option_values_id: framedOptionValue.id,
      },
    });
  } else {
    console.log('Framed option value not found');
  }

  const unframedOptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: frameTypeOption.id }, { value: 'Unframed' }],
    },
  });
  if (unframedOptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: printProductItem.id,
        option_values_id: unframedOptionValue.id,
      },
    });
  } else {
    console.log('Unframed option value not found');
  }
}
