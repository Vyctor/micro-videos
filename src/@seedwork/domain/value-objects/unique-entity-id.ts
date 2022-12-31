import { v4 as uuidV4, validate } from "uuid";
import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(private readonly _id?: string) {
    super(_id || uuidV4());
    this.validateId(this.value);
  }

  private validateId(id: string): void {
    const isValid = validate(id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
