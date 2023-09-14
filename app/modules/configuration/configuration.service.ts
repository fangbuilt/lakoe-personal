// import { createStore } from "./configuration.schema";
// import type { z } from "zod";
// import { db } from "~/libs/prisma/db.server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStoreInformation(data: any) {
  const dataPost = await prisma.store.create({
    data: {
      name: data.name,
      slogan: data.slogan,
      description: data.description,
      domain: data.domain,
      logoAttachment: data.logoAttachment,
    },
  });
  return dataPost;
}

export async function updateStoreInformation(storeId: string, data: any) {
  const dataUpdate = await prisma.store.update({
    where: { id: storeId },
    data: {
      name: data.name,
      slogan: data.slogan,
      description: data.description,
      domain: data.domain,
      logoAttachment: data.logoAttachment,
    },
  });
  return dataUpdate;
}
