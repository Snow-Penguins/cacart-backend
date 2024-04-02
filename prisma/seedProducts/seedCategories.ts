import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
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
}
