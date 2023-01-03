import { ValidationError } from "../errors/validation-error";
export class ValidatorRules {
  private constructor(
    private readonly value: any,
    private readonly property: string
  ) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  public required(): this {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`Property ${this.property} is required`);
    }
    return this;
  }
  public string(): this {
    if (typeof this.value !== "string") {
      throw new ValidationError(`Property ${this.property} must be a string`);
    }
    return this;
  }

  public maxLength(maxLengthValue: number): this {
    if (this.string() && this.value.length > maxLengthValue) {
      throw new ValidationError(
        `Property ${this.property} must have a maximum length of ${maxLengthValue}`
      );
    }
    return this;
  }
}
