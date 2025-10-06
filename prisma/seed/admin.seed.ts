import { bcryptPasswordHash } from "@/lib/brypt";
import type { PrismaClient } from "@prisma/client";

export async function seedAdmin(prisma: PrismaClient) {
    const password = await bcryptPasswordHash("admin123"); // Şifreyi "admin123" olarak değiştirdik

    const admin = await prisma.user.create({
        data: {
            email: "admin@example.com", // E-postayı "admin@example.com" olarak değiştirdik
            hashedPassword: password,
        }
    })

    console.log("Admin created: ", admin);

    return admin;
}
