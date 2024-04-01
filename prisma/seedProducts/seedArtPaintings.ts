import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArtPaintings() {
  // Painting product
  const idForPainting = await prisma.productCategory.findUnique({
    where: {
      name: 'Painting',
    },
  });

  if (idForPainting) {
    await prisma.option.create({
      data: {
        category_id: idForPainting.id,
        option_name: 'Size',
      },
    });
  } else {
    console.log('Painting not found');
  }

  const paintingSizeOption = await prisma.option.findFirst({
    where: {
      AND: [{ option_name: 'Size' }, { category_id: idForPainting.id }],
    },
  });

  if (paintingSizeOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: paintingSizeOption.id,
          value: '20" x 20"',
          qty_by_option: 10,
        },
        {
          option_id: paintingSizeOption.id,
          value: '40" x 40"',
          qty_by_option: 10,
        },
        {
          option_id: paintingSizeOption.id,
          value: '50" x 50"',
          qty_by_option: 10,
        },
      ],
    });
  } else {
    console.log('Painting size option not found');
  }

  const paintingProduct = await prisma.product.create({
    data: {
      category_id: idForPainting.id,
      name: 'Original Seascape Oil Painting on Canvas',
      description:
        'Oil Coastal Painting, Large Textured Wall Art, Sunrise Oil Painting, Living Room Home Decor',
      product_image: [],
    },
  });

  const paintingProductItem = await prisma.productItem.create({
    data: {
      product_id: paintingProduct.id,
      SKU: 'PAINTING001',
      qty_in_stock: 30,
      qty_sold: 0,
      price: 1000.0,
    },
  });

  const paintingSize20x20OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: paintingSizeOption.id }, { value: '20" x 20"' }],
    },
  });

  if (paintingSize20x20OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize20x20OptionValue.id,
      },
    });
  } else {
    console.log('Painting size 20x20 option value not found');
  }

  const paintingSize40x40OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: paintingSizeOption.id }, { value: '40" x 40"' }],
    },
  });

  if (paintingSize40x40OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize40x40OptionValue.id,
      },
    });
  } else {
    console.log('Painting size 40x40 option value not found');
  }

  const paintingSize50x50OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: paintingSizeOption.id }, { value: '50" x 50"' }],
    },
  });

  if (paintingSize50x50OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize50x50OptionValue.id,
      },
    });
  } else {
    console.log('Painting size 50x50 option value not found');
  }
}
