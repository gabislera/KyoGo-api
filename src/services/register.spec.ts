import { describe, it, expect } from "vitest";
import { RegisterService } from "./register";
import { hash, compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register service", () => {
  it("should be able to register", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(userRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(userRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(userRepository);

    const email = "john.doe@example.com";

    await registerService.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerService.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
