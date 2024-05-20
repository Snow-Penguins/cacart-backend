import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUpdatePhoto() {
  const necklaceName = 'Tiny Freshwater Pearl Necklace';
  const ringName = 'Baguette Birthstone Ring';
  const artPaintingName = 'Original Seascape Oil Painting on Canvas';
  const artPrintName = 'Abstract Art Print';
  const womenTshirtName = 'Womens T-Shirt';
  const womenSkirt = 'Long Skirt';
  const menShirt = 'Mens T-Shirt';
  const babyBlanket = 'Baby Blanket';
  const babyShowerGift = 'Baby Shower Gift';
  const babySweater = 'Baby Sweater';

  const necklaceProduct = await prisma.product.findFirst({
    where: {
      name: necklaceName,
    },
  });

  if (necklaceProduct) {
    await prisma.product.update({
      where: {
        id: necklaceProduct.id,
      },
      data: {
        product_image: ['tiny_freshwater_pearl_necklace.jpg'],
      },
    });
  }

  const ringProduct = await prisma.product.findFirst({
    where: {
      name: ringName,
    },
  });
  if (ringProduct) {
    await prisma.product.update({
      where: {
        id: ringProduct.id,
      },
      data: {
        product_image: ['baguette_birthstone_ring.jpg'],
      },
    });
  }

  const artPaintingProduct = await prisma.product.findFirst({
    where: {
      name: artPaintingName,
    },
  });
  if (artPaintingProduct) {
    await prisma.product.update({
      where: {
        id: artPaintingProduct.id,
      },
      data: {
        product_image: ['original_seascape_oil_painting_on_canvas.jpg'],
      },
    });
  }

  const artPrintProduct = await prisma.product.findFirst({
    where: {
      name: artPrintName,
    },
  });
  if (artPrintProduct) {
    await prisma.product.update({
      where: {
        id: artPrintProduct.id,
      },
      data: {
        product_image: ['abstract_art_print.jpg'],
      },
    });
  }

  const womenTshirtProduct = await prisma.product.findFirst({
    where: {
      name: womenTshirtName,
    },
  });

  if (womenTshirtProduct) {
    await prisma.product.update({
      where: {
        id: womenTshirtProduct.id,
      },
      data: {
        product_image: ['womens_t_shirt.jpg'],
      },
    });
  }

  const womenSkirtProduct = await prisma.product.findFirst({
    where: {
      name: womenSkirt,
    },
  });
  if (womenSkirtProduct) {
    await prisma.product.update({
      where: {
        id: womenSkirtProduct.id,
      },
      data: {
        product_image: ['long_skirt.jpg'],
      },
    });
  }

  const menShirtProduct = await prisma.product.findFirst({
    where: {
      name: menShirt,
    },
  });
  if (menShirtProduct) {
    await prisma.product.update({
      where: {
        id: menShirtProduct.id,
      },
      data: {
        product_image: ['mens_t_shirt.jpg'],
      },
    });
  }

  const babyBlanketProduct = await prisma.product.findFirst({
    where: {
      name: babyBlanket,
    },
  });
  if (babyBlanketProduct) {
    await prisma.product.update({
      where: {
        id: babyBlanketProduct.id,
      },
      data: {
        product_image: ['baby_blanket.jpg'],
      },
    });
  }

  const babyShowerGiftProduct = await prisma.product.findFirst({
    where: {
      name: babyShowerGift,
    },
  });
  if (babyShowerGiftProduct) {
    await prisma.product.update({
      where: {
        id: babyShowerGiftProduct.id,
      },
      data: {
        product_image: ['baby_shower_gift.jpg'],
      },
    });
  }

  const babySweaterProduct = await prisma.product.findFirst({
    where: {
      name: babySweater,
    },
  });
  if (babySweaterProduct) {
    await prisma.product.update({
      where: {
        id: babySweaterProduct.id,
      },
      data: {
        product_image: ['baby_sweater.jpg'],
      },
    });
  }
}
