"use server";
import { auth } from "@/auth";
import sanitizeHtml from 'sanitize-html';
import { StreamableSkeletonProps } from "@/components/admin/cars/StreamableSkeletion";
import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { generateThumbHashFromSrUrl } from "@/lib/thumbhash-server";
import { CurrencyCode } from "@prisma/client";
import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";
import slugify from "slugify";
import { createPngDataUri } from "unlazy/thumbhash";
import { CreateCarType, UpdateCarType } from "../schemas/car.schema";


export const createCarAction = async (data: CreateCarType) => {
  const session = await auth();
  if (!session) {
    forbidden();
  }

  let success = false;
  try {
    const makeId = Number(data.make);
    const modelId = Number(data.model);
    const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null;

    const make = await prisma.make.findUnique({
      where: { id: makeId as number },
    });

    const model = await prisma.model.findUnique({
      where: { id: modelId as number },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: modelVariantId },
      });

      if (modelVariant) title = `${title} ${modelVariant.name}`;
    }

    const slug = slugify(`${title} ${data.vrm}`);
    
    const cleanDescription = sanitizeHtml(data.description, {
      allowedTags: [ 'p', 'a', 'strong', 'b', 'em', 'i', 'u', 'strike', 'br', 'ul', 'ol', 'li' ],
      allowedAttributes: { 'a': [ 'href', 'rel', 'target' ] }
    });

    const createdCar = await prisma.classified.create({
      data: {
        slug,
        title,
        year: Number(data.year),
        makeId,
        modelId,
        ...(modelVariantId && { modelVariantId }),
        vrm: data.vrm,
        price: data.price * 100,
        currency: data.currency,
        odoReading: data.odoReading,
        odoUnit: data.odoUnit,
        fuelType: data.fuelType,
        bodyType: data.bodyType,
        transmission: data.transmission,
        colour: data.colour,
        ulezCompliance: data.ulezCompliance,
        description: cleanDescription,
        doors: data.doors,
        seats: data.seats,
        status: data.status,
        images: {
          create: await Promise.all(
            data.images.map(async ({ src }, index) => {
              const hash = await generateThumbHashFromSrUrl(src);
              const uri = createPngDataUri(hash);
              return {
                isMain: !index,
                blurhash: uri,
                src,
                alt: `${title} ${index + 1}`,
              };
            })
          ),
        },
      },
    });

    if (createdCar) success = true;

  } catch (err) {
    console.log({ err });
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Something went wrong" };
  }
  if (success) {
    revalidatePath(routes.admin.cars);
    redirect(routes.admin.cars);
  } else {
    return { success: false, message: "Failed to create classified" };
  }
};

export const updateCarAction = async (data: UpdateCarType) => {
  const session = await auth();
  if (!session) {
    forbidden();
  }

  let success = false;
  try {
    const makeId = Number(data.make);
    const modelId = Number(data.model);
    const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null;

    const make = await prisma.make.findUnique({
      where: { id: makeId as number },
    });

    const model = await prisma.model.findUnique({
      where: { id: modelId as number },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: modelVariantId },
      });

      if (modelVariant) title = `${title} ${modelVariant.name}`;
    }

    const slug = slugify(`${title} ${data.vrm}`);
    const [updatedCar, images] = await prisma.$transaction(
      async (prisma) => {
        // delete existing images if any
        await prisma.image.deleteMany({
          where: {
            classifiedId: data.id,
          },
        });
        // update the classified
        const imagesData = await Promise.all(
          data.images.map(async ({ src }, index) => {
            const hash = await generateThumbHashFromSrUrl(data.images[0].src);
            const uri = createPngDataUri(hash);
            return {
              classifiedId: data.id,
              isMain: !index,
              blurhash: uri,
              src,
              alt: `${title} ${index + 1}`,
            };
          })
        );

        const images = await prisma.image.createManyAndReturn({
          data: imagesData,
        });

        const cleanDescription = sanitizeHtml(data.description, {
          allowedTags: [ 'p', 'a', 'strong', 'b', 'em', 'i', 'u', 'strike', 'br', 'ul', 'ol', 'li' ],
          allowedAttributes: { 'a': [ 'href', 'rel', 'target' ] }
        });

        const updatedCar = await prisma.classified.update({
          where: { id: data.id },
          data: {
            slug,
            title,
            year: Number(data.year),
            makeId,
            modelId,
            ...(modelVariantId && { modelVariantId }),
            vrm: data.vrm,
            price: data.price * 100,
            currency: data.currency,
            odoReading: data.odoReading,
            odoUnit: data.odoUnit,
            fuelType: data.fuelType,
            bodyType: data.bodyType,
            transmission: data.transmission,
            colour: data.colour,
            ulezCompliance: data.ulezCompliance,
            description: cleanDescription,
            doors: data.doors,
            seats: data.seats,
            status: data.status,
            images: { set: images.map((image) => ({ id: image.id })) },
          },
        });

        return [updatedCar, images];
      },
      { timeout: 10000 } // Set a timeout for the transaction
    );
    if (updatedCar && images) success = true;
  } catch (err) {
    console.log({ err });
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Something went wrong" };
  }
  if (success) {
    revalidatePath(routes.admin.cars);
    redirect(routes.admin.cars);
  } else {
    return { success: false, message: "Failed to update classified" };
  }
};


export const deleteCarAction = async (id: number) => {
  const session = await auth();
  if (!session) {
    forbidden();
  }

  try {
    const deletedCar = await prisma.classified.delete({
      where: { id },
    });

    if (deletedCar) {
      revalidatePath(routes.admin.cars);
      return { success: true, message: "Car deleted successfully" };
    } else {
      return { success: false, message: "Failed to delete car" };
    }
  } catch (error) {
    console.error("Error deleting car:", error);
    return { success: false, message: "Failed to delete car" };
  }
}