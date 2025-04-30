import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    return reply.status(400).send({ message: "User already exists." });
  }

  await prisma.user.create({
    data: { name, email, password_hash },
  });

  return reply.status(201).send();
}
