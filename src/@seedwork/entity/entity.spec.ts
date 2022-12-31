import { Entity } from "./entity";
import { validate as uuidValidate, v4 as uuidV4 } from "uuid";
import { UniqueEntityId } from "../domain/value-objects/unique-entity-id";

describe("Entity Unit test", () => {
  class StubEntity extends Entity<{ name: string; age: number }> {}
  it("should set props and id", () => {
    const entity = new StubEntity({ name: "John", age: 20 });
    expect(entity).toBeInstanceOf(Entity);
    expect(entity.id).toBeDefined();
    expect(uuidValidate(entity.id)).toBe(true);
  });

  it("should accept a valid uuid", () => {
    const validUUID = uuidV4();
    const entity = new StubEntity(
      { name: "John", age: 20 },
      new UniqueEntityId(validUUID)
    );
    expect(entity.id).toBe(validUUID);
  });

  it("should convert a entity to a JSON", () => {
    const entity = new StubEntity({ name: "John", age: 20 });
    expect(entity.toJSON()).toEqual({ id: entity.id, name: "John", age: 20 });
  });
});
