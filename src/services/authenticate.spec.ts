import { describe, it, expect } from "vitest";
import { hash, compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate service", () => {
  it("should be able to authenticate", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(userRepository);

    await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(userRepository);

    expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(userRepository);

    await userRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
