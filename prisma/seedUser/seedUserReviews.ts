import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUserReviews() {
  const reviews = [
    {
      user_id: 5,
      order_history_id: 1,
      rating: 4,
      comment: 'Loved the product!',
    },
    {
      user_id: 6,
      order_history_id: 2,
      rating: 5,
      comment: 'Perfect! Highly recommend.',
    },
    {
      user_id: 7,
      order_history_id: 3,
      rating: 3,
      comment: 'Good but expected more.',
    },
    // {
    //   user_id: 3,
    //   order_history_id: 4,
    //   rating: 5,
    //   comment: 'Excellent quality!',
    // },
  ];

  for (const review of reviews) {
    const existingReview = await prisma.userReview.findFirst({
      where: {
        user_id: review.user_id,
        order_history_id: review.order_history_id,
        comment: review.comment,
      },
    });

    if (!existingReview) {
      await prisma.userReview.create({
        data: {
          user_id: review.user_id,
          order_history_id: review.order_history_id,
          rating_value: review.rating,
          comment: review.comment,
        },
      });
      console.log(
        `User Review Created: User ${review.user_id}, Rating ${review.rating}`,
      );
    } else {
      console.log(
        `Review already exists for User ${review.user_id} and Order History ${review.order_history_id}`,
      );
    }
  }
}
