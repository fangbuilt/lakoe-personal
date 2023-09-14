import { db } from '~/libs/prisma/db.server';

export async function getPosts() {
  return await db.payment.findMany({
    where: {},
  });
}

// export async function create(data: any) {
//   const post = await db.confirmationPayment.create({

//     data: data.title,
//   });
//   return post;
// }

// export async function createPost(data: any) {
//   console.log(data);
//   await db.confirmationPayment.create({data})

//  return null
// }

export async function createConfirmationPayment(data: any) {
  const post = await db.confirmationPayment.findUnique({
    where: {
      cartId: data.cart.id,
    },
  });

  if (!post) {
    const newPost = await db.confirmationPayment.create({
      data,
    });

    return newPost;
  }
}
