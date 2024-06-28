import { PrismaClient } from '@prisma/client';

// import { seedCategories } from './seedProducts/seedCategories';
// import { seedArtPrints } from './seedProducts/seedArtPrints';
// import { seedArtPaintings } from './seedProducts/seedArtPaintings';
// import { seedBabyBedding } from './seedProducts/seedBabyBedding';
// import { seedBabyCare } from './seedProducts/seedBabyCare';
// import { seedBabyClothing } from './seedProducts/seedBabyClothing';
// import { seedJewellyNecklaces } from './seedProducts/seedJewellyNecklaces';
// import { seedJewellyRings } from './seedProducts/seedJewellyRings';
// import { seedClothingMens } from './seedProducts/seedClothingMens';
// import { seedClothingWomens } from './seedProducts/seedClothingWomens';
// import { seedClothingWomens_2 } from './seedProducts/seedClothingWomens_2';
// import { seedUpdatePhoto } from './seedProducts/seedUpdatePhoto';
// import { seedShippingMethods } from './seedOrders/seedShippingMethods';
// import { seedOrderStatus } from './seedOrders/seedOrderStatus';
// import { seedUsers } from './seedUser/seedUsers';
// import { seedAddresses } from './seedUser/seedAddress';
// import { seedShopOrders } from './seedOrders/seedShopOrder';
// import { seedOrderHistory } from './seedUser/seedOrderHistory';
// import { seedUserReviews } from './seedUser/seedUserReviews';
import { seedCarts } from './seedCarts/seedCarts';

const prisma = new PrismaClient();

async function main() {
  // await seedCategories();
  // await seedJewellyNecklaces();
  // await seedJewellyRings();
  // await seedArtPaintings();
  // await seedArtPrints();
  // await seedClothingWomens();
  // await seedClothingWomens_2();
  // await seedClothingMens();
  // await seedBabyBedding();
  // await seedBabyCare();
  // await seedBabyClothing();
  // await seedUpdatePhoto();
  // await seedShippingMethods();
  // await seedOrderStatus();
  // await seedUsers();
  // await seedAddresses();
  // await seedShopOrders();
  // await seedOrderHistory();
  // await seedUserReviews();
  await seedCarts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
