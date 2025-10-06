import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageProps } from "@/config/types";
import ReserveView from "./ReserveView";

const ReservePage = async ({ params, searchParams }: PageProps) => {
  const { slug } = params;

  const car = await prisma.classified.findUnique({
    where: { slug },
    include: { make: true },
  });

  if (!car) {
    return notFound();
  }

  return <ReserveView car={car} searchParams={searchParams} />;
};

export default ReservePage;
