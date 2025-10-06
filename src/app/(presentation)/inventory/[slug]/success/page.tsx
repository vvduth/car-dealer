import { EndButtons } from "@/components/shared/end-buttons";
import { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { CircleCheck, Calendar as CalendarIcon, Car, User } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const ReserveSuccessPage = async ({ params }: PageProps) => {

  const customer = await prisma.customer.findFirst({
    where: {
      classified: {
        slug: params?.slug as string,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      classified: true,
    },
  });

  if (!customer) {
    // While this should ideally not happen in a real flow,
    // it prevents the page from crashing if no customer is found.
    return notFound();
  }

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center space-y-6">
        
        <div className="p-8 bg-gray-900/70 border border-gray-700 rounded-xl shadow-lg">
            <CircleCheck className="mx-auto w-16 h-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Booking Confirmed!</h1>
            <p className="mt-4 text-gray-400">Thank you for your reservation. We will see you soon.</p>
            
            {/* Reservation Details */}
            <div className="mt-8 text-left bg-gray-800/50 p-6 rounded-lg border border-gray-600 space-y-4">
                <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">Reservation Summary</h2>
                <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{customer.firstName} {customer.lastName}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Car className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{customer.classified.title}</span>
                </div>
                <div className="flex items-center gap-4">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{format(new Date(customer.bookingDate), "EEEE, MMMM do, yyyy 'at' h:mm a")}</span>
                </div>
            </div>
        </div>

        <EndButtons />
      </div>
    </div>
  );
};

export default ReserveSuccessPage;