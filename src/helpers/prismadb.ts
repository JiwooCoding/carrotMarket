import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient();

// OR 
//if(process.nev.NODE_ENV === 'development') globalThis.prisma = client;
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;