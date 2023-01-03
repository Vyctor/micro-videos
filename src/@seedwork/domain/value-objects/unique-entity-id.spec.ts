import { InvalidUuidError } from "../../../@seedwork/errors/invalid-uuid.error";
import { UniqueEntityId } from "./unique-entity-id";
import { v4 as uuidV4, validate } from "uuid";

describe("UniqueEntityId unit tests", () => {
  const validUUID = uuidV4();
  const invalidUUID = "1234";

  it("should create a valid uuid when uuid is not given", () => {
    const uniqueEntityId = new UniqueEntityId();
    expect(uniqueEntityId.value).toBeDefined();
    expect(validate(uniqueEntityId.value)).toBe(true);
  });

  it("should set same uuid when uuid is passed in constructor", () => {
    const uniqueEntityId = new UniqueEntityId(validUUID);

    expect(uniqueEntityId.value).toBeDefined();
    expect(uniqueEntityId.value).toBe(validUUID);
    expect(validate(uniqueEntityId.value)).toBe(true);
  });

  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(
      UniqueEntityId.prototype as any,
      "validateId"
    );

    expect(() => new UniqueEntityId(invalidUUID)).toThrow(InvalidUuidError);
    expect(validateSpy).toBeCalled();
  });
});
