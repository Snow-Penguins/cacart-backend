import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // product_categories table seed data
  const parentCategories = [
    'Jewellery',
    'Home & Living',
    'Art & Collectibles',
    'Clothing',
    'Baby',
    'Weddings',
    'Accessories',
    'Craft Supplies & Tools',
    'Electronics & Accessories',
    'Bags & Purses',
    'Bath & Beauty',
    'Books, Films & Music',
    'Pet Supplies',
    'Toys & Games',
    'Shoes',
    'Paper & Party Supplies',
    'Gift Cards',
  ];

  const parentCategoriesData = parentCategories.map((category, index) => ({
    name: category,
    option_id: index + 1,
  }));

  await prisma.productCategory.createMany({
    data: parentCategoriesData,
    skipDuplicates: true,
  });

  const jewelleryCategoryId = 1;
  const jewellerySubcategories = [
    'Necklaces',
    'Rings',
    'Earrings',
    'Bracelets',
    'Watches',
    'Cremation & Memorial Jewellery',
    'Brooches, Pins & Clips',
    'Body Jewellery',
    'Jewellery Storage',
    'Jewellery Sets',
    'Smart Jewellery',
    'Cuff Links & Tie Clips',
  ];

  await prisma.productCategory.createMany({
    data: jewellerySubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: jewelleryCategoryId,
    })),
    skipDuplicates: true,
  });

  const homeAndLivingCategoryId = 2;
  const homeAndLivingSubcategories = [
    'Furniture',
    'Home Décor',
    'Outdoor & Gardening',
    'Storage & Organization',
    'Lighting',
    'Floor & Rugs',
    'Kitchen & Dining',
    'Bathroom',
    'Curtains & Window Treatments',
    'Spirituality & Religion',
    'Bedding',
    'Office',
    'Food & Drink',
    'Home Improvement',
    'Home Appliances',
    'Cleaning Supplies',
  ];

  await prisma.productCategory.createMany({
    data: homeAndLivingSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: homeAndLivingCategoryId,
    })),
    skipDuplicates: true,
  });

  const artAndCollectiblesCategoryId = 3;
  const artAndCollectiblesSubcategories = [
    'Painting',
    'Prints',
    'Sculpture',
    'Drawing & Illustration',
    'Glass Art',
    'Collectibles',
    'Fine Art Ceramics',
    'Photography',
    'Dolls & Miniatures',
    'Mixed Media & Collage',
    'Fibre Arts',
    'Artist Trading Cards',
  ];

  await prisma.productCategory.createMany({
    data: artAndCollectiblesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: artAndCollectiblesCategoryId,
    })),
    skipDuplicates: true,
  });

  const clothingCategoryId = 4;
  const clothingSubcategories = [
    "Women's Clothing",
    "Men's Clothing",
    'Gender-Neutral Adult Clothing',
    "Girls' Clothing",
    "Boys' Clothing",
    "Gender-Neutral Kids' Clothing",
    'Indian Ethnic Clothing',
  ];

  await prisma.productCategory.createMany({
    data: clothingSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: clothingCategoryId,
    })),
    skipDuplicates: true,
  });

  const babyCategoryId = 5;
  const babySubcategories = [
    'Nursery Decor',
    'Baby Toys',
    'Baby Clothes',
    'Baby Care',
    'Nursery Furniture',
    'Baby Bedding',
  ];

  await prisma.productCategory.createMany({
    data: babySubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: babyCategoryId,
    })),
    skipDuplicates: true,
  });

  const weddingsCategoryId = 6;
  const weddingsSubcategories = [
    'Gifts & Mementos',
    'Decorations',
    'Invitations & Paper',
    'Clothing',
    'Accessories',
    'Jewellery',
    'Shoes',
  ];

  await prisma.productCategory.createMany({
    data: weddingsSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: weddingsCategoryId,
    })),
    skipDuplicates: true,
  });

  const accessoriesCategoryId = 7;
  const accessoriesSubcategories = [
    'Keychains & Lanyards',
    'Scarves & Wraps',
    'Hats & Caps',
    'Hair Accessories',
    'Sunglasses & Eyewear',
    'Patches & Pins',
    'Costume Accessories',
    'Belts & Braces',
    'Suit & Tie Accessories',
    'Baby Accessories',
    'Umbrellas & Rain Accessories',
    'Gloves & Mittens',
    'Hand Fans',
    'Bouquets & Corsages',
    'Face Masks & Coverings',
  ];

  await prisma.productCategory.createMany({
    data: accessoriesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: accessoriesCategoryId,
    })),
    skipDuplicates: true,
  });

  const craftSuppliesAndToolsCategoryId = 8;
  const craftSuppliesAndToolsSubcategories = [
    'Sewing & Fibre',
    'Home & Hobby',
    'Jewellery & Beauty',
    'Paper, Party & Kids',
    'Visual Arts',
    'Sculpting & Forming',
  ];

  await prisma.productCategory.createMany({
    data: craftSuppliesAndToolsSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: craftSuppliesAndToolsCategoryId,
    })),
    skipDuplicates: true,
  });

  const electronicsAndAccessoriesCategoryId = 9;
  const electronicsAndAccessoriesSubcategories = [
    'Video Games',
    'Gadgets',
    'Mobile Phone Accessories',
    'Computers & Peripherals',
    'Car Parts & Accessories',
    'Telephones & Handsets',
    'Audio',
    'Cables & Cords',
    'Electronics Cases',
    'Docking & Stands',
    'Cameras & Equipment',
    'TV & Projection',
    'Decals & Skins',
    'DIY Kits',
    'Maker Supplies',
    'Battery & Charging',
  ];

  await prisma.productCategory.createMany({
    data: electronicsAndAccessoriesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: electronicsAndAccessoriesCategoryId,
    })),
    skipDuplicates: true,
  });

  const bagsAndPursesCategoryId = 10;
  const bagsAndPursesSubcategories = [
    'Handbags',
    'Backpacks',
    'Messenger Bags',
    'Totes',
    'Wallets & Money Clips',
    'Luggage & Travel',
    'Pouches & Coin Purses',
    'Cosmetic & Toiletry Storage',
    'Hip Bags',
    'Market Bags',
    'Nappy Bags',
    'Food & Insulated Bags',
    'Accessory Cases',
    'Keychains & Lanyards',
    'Sports Bags',
    'Electronics Cases',
    'Clothing & Shoe Bags',
  ];

  await prisma.productCategory.createMany({
    data: bagsAndPursesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: bagsAndPursesCategoryId,
    })),
    skipDuplicates: true,
  });

  const bathAndBeautyCategoryId = 11;
  const bathAndBeautySubcategories = [
    'Spa & Relaxation',
    'Fragrances',
    'Soaps',
    'Bath Accessories',
    'Skin Care',
    'Makeup & Cosmetics',
    'Hair Care',
    'Baby & Child Care',
    'Essential Oils',
    'Personal Care',
    'Cosmetic & Toiletry Storage',
  ];

  await prisma.productCategory.createMany({
    data: bathAndBeautySubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: bathAndBeautyCategoryId,
    })),
    skipDuplicates: true,
  });

  const booksFilmsAndMusicCategoryId = 12;
  const booksFilmsAndMusicSubcategories = [
    'Books',
    'Movies',
    'Music',
    'Video Cases & Tins',
  ];

  await prisma.productCategory.createMany({
    data: booksFilmsAndMusicSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: booksFilmsAndMusicCategoryId,
    })),
    skipDuplicates: true,
  });

  const petSuppliesCategoryId = 13;
  const petSuppliesSubcategories = [
    'Pet Furniture',
    'Pet Collars & Leashes',
    'Pet Clothing, Accessories & Shoes',
    'Pet Carriers & Houses',
    'Urns & Memorials',
    'Pet Bedding',
    'Pet Toys',
    'Horse Riding & Farm Animals',
    'Pet Feeding',
    'Training',
    'Pet Gates & Fences',
    'Pet Storage',
    'Pet Health & Wellness',
    'Beekeeping',
  ];

  await prisma.productCategory.createMany({
    data: petSuppliesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: petSuppliesCategoryId,
    })),
    skipDuplicates: true,
  });

  const toysAndGamesCategoryId = 14;
  const toysAndGamesSubcategories = [
    'Games & Puzzles',
    'Toys',
    'Sports & Outdoor Recreation',
  ];

  await prisma.productCategory.createMany({
    data: toysAndGamesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: toysAndGamesCategoryId,
    })),
    skipDuplicates: true,
  });

  const shoesCategoryId = 15;
  const shoesSubcategories = [
    'Women’s Shoes',
    'Men’s Shoes',
    'Girls’ Shoes',
    'Boys’ Shoes',
    'Insoles & Accessories',
  ];

  await prisma.productCategory.createMany({
    data: shoesSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: shoesCategoryId,
    })),
    skipDuplicates: true,
  });

  const paperAndPartySuppliesCategoryId = 16;
  const paperAndPartySuCategories = ['Party Decor', 'Party Favours & Games'];

  await prisma.productCategory.createMany({
    data: paperAndPartySuCategories.map((subcategory) => ({
      name: subcategory,
      option_id: paperAndPartySuppliesCategoryId,
    })),
    skipDuplicates: true,
  });

  const giftCardsCategoryId = 17;
  const giftCardsSubcategories = [
    'Birthday Cards',
    'Thank You Cards',
    'Anniversary Cards',
    'Baby & Expecting Cards',
    'Blank Cards',
    'Sympathy Cards',
    'Wedding & Engagement Cards',
    'Christmas & Seasonal Cards',
    'Encouragement Cards',
    'Love Cards',
    'Graduation & School Cards',
    'Just Because Cards',
    'Get Well Cards',
    'Moving Cards',
    'Thinking Of You Cards',
    'Friendship Cards',
    'Congratulations Cards',
    'Sorry Cards',
    'Good Luck Cards',
    'Miss You Cards',
  ];

  await prisma.productCategory.createMany({
    data: giftCardsSubcategories.map((subcategory) => ({
      name: subcategory,
      option_id: giftCardsCategoryId,
    })),
    skipDuplicates: true,
  });

  // options table seed data
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

  // option_values table seed data
  const colorOption = await prisma.option.findFirst({
    where: {
      option_name: 'Color',
    },
  });

  if (colorOption) {
    await prisma.optionValue.createMany({
      data: [
        {
          option_id: 1,
          value: 'Gold',
          qty_by_option: 10,
        },
        {
          option_id: 1,
          value: 'Silver',
          qty_by_option: 10,
        },
      ],
    });
  } else {
    console.log('Color option not found');
  }

  const ringSizeOption = await prisma.option.findFirst({
    where: {
      option_name: 'Ring Size',
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

  // products table seed data
  const necklaceProduct = await prisma.product.create({
    data: {
      category_id: idForNecklaces.id,
      name: 'Tiny Freshwater Pearl Necklace',
      description: 'A dainty freshwater pearl necklace',
      product_image: [],
    },
  });

  const ringProduct = await prisma.product.create({
    data: {
      category_id: idForRings.id,
      name: 'Baguette Birthstone Ring',
      description: 'Custom Birthstone Ring',
      product_image: [],
    },
  });

  const paintingProduct = await prisma.product.create({
    data: {
      category_id: idForPainting.id,
      name: 'Original Seascape Oil Painting on Canvas',
      description:
        'Oil Coastal Painting, Large Textured Wall Art, Sunrise Oil Painting, Living Room Home Decor',
      product_image: [],
    },
  });

  // product_items table seed data
  const necklaceProductItem = await prisma.productItem.create({
    data: {
      product_id: necklaceProduct.id,
      SKU: 'NECKLACE001',
      qty_in_stock: 20,
      qty_sold: 0,
      price: 55.2,
    },
  });

  const ringProductItem = await prisma.productItem.create({
    data: {
      product_id: ringProduct.id,
      SKU: 'RING001',
      qty_in_stock: 50,
      qty_sold: 0,
      price: 75.5,
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

  // product_item_option_values table seed data
  const goldOptionValue = await prisma.optionValue.findFirst({
    where: {
      value: 'Gold',
    },
  });

  const silverOptionValue = await prisma.optionValue.findFirst({
    where: {
      value: 'Silver',
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
  }

  const ringSize5OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: 3 }, { value: '5' }],
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

  const ringSize6OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: 3 }, { value: '6' }],
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
      AND: [{ option_id: 3 }, { value: '7' }],
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
      AND: [{ option_id: 3 }, { value: '8' }],
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
      AND: [{ option_id: 3 }, { value: '9' }],
    },
  });

  if (ringSize9OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: ringProductItem.id,
        option_values_id: ringSize9OptionValue.id,
      },
    });
  }

  const paintingSize20x20OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: 4 }, { value: '20" x 20"' }],
    },
  });

  if (paintingSize20x20OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize20x20OptionValue.id,
      },
    });
  }

  const paintingSize40x40OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: 4 }, { value: '40" x 40"' }],
    },
  });

  if (paintingSize40x40OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize40x40OptionValue.id,
      },
    });
  }

  const paintingSize50x50OptionValue = await prisma.optionValue.findFirst({
    where: {
      AND: [{ option_id: 4 }, { value: '50" x 50"' }],
    },
  });

  if (paintingSize50x50OptionValue) {
    await prisma.productItemOptionValue.create({
      data: {
        product_items_id: paintingProductItem.id,
        option_values_id: paintingSize50x50OptionValue.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
