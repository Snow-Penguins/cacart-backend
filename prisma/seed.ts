import { PrismaClient } from '@prisma/client';
import { seedCategories } from './seedProducts/seedCategories';
import { seedArtPrints } from './seedProducts/seedArtPrints';
import { seedArtPaintings } from './seedProducts/seedArtPaintings';
import { seedBabyBedding } from './seedProducts/seedBabyBedding';
import { seedBabyCare } from './seedProducts/seedBabyCare';
import { seedBabyClothing } from './seedProducts/seedBabyClothing';
import { seedJewellyNecklaces } from './seedProducts/seedJewellyNecklaces';
import { seedJewellyRings } from './seedProducts/seedJewellyRings';
import { seedClothingMens } from './seedProducts/seedClothingMens';
import { seedClothingWomens } from './seedProducts/seedClothingWomens';
import { seedClothingWomens_2 } from './seedProducts/seedClothingWomens_2';
import { seedUsers } from './seedUser/seedUsers';
import { seedOrderHistory } from './seedUser/seedOrderHistory';
import { seedUserReviews } from './seedUser/seedUserReviews';

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
  await seedOrderHistory();
  await seedUserReviews();
  await seedCategories();
  await seedJewellyNecklaces();
  await seedJewellyRings();
  await seedArtPaintings();
  await seedArtPrints();
  await seedClothingWomens();
  await seedClothingWomens_2();
  await seedClothingMens();
  await seedBabyBedding();
  await seedBabyCare();
  await seedBabyClothing();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
