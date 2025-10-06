import { prisma } from '@/lib/prisma'
import { ClassifiedStatus } from '@prisma/client';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/config/routes';
const OurBrandSection = async() => {
    const brands = await prisma.make.findMany({
        where: {
            name: {
                in: [
                    "Rolls-Royce",
					"Aston Martin",
					"Porsche",
					"Lamborghini",
					"Audi",
					"Jaguar",
					"Land Rover",
					"Mercedes-Benz",
					"Ferrari",
					"Bentley",
					"McLaren",
					"Ford",
					"Volkswagen",
					"Maserati",
					"Lexus",
                ],
                mode: 'insensitive',
            }
        }
    })

    const count = await prisma.classified.count({
		where: { status: ClassifiedStatus.LIVE },
	});

    return (
    <div className="py-16 sm:py-24 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
                <div className="px-6 lg:px-8 sm:text-center">
                    <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                        A Curated Collection of Premier Brands 
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Our portfolio features a meticulously selected range of vehicles from the world's most respected automotive names. With {count} vehicles currently in our collection, your next chapter awaits.
                    </p>
                </div>
				<div className="flex flex-wrap justify-center items-center gap-4">
					{brands.map(({ id, image, name }) => (
						<Link
							key={id}
							href={`${routes.inventory}?make=${id}`}
							className="hover:scale-110 transition-all duration-100 ease-in-out relative h-24 w-24 flex items-center justify-center"
						>
							<Image
								src={image}
								alt={name}
								className="object-contain aspect-1/1"
								fill={true}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
  )
}

export default OurBrandSection
