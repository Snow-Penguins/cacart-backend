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
import { seedUpdatePhoto } from './seedProducts/seedUpdatePhoto';

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
  await seedUpdatePhoto();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
