import { ValidatorRules } from "./validator-rules";
import { ValidationError } from "../errors/validation-error";
describe("ValidatorRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("value", "property");

    expect(validator).toBeDefined();
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("value");
    expect(validator["property"]).toBe("property");
  });

  test("required validation rule method", () => {
    let validator = ValidatorRules.values("value", "property");
    expect(() => validator.required()).not.toThrow();

    validator = ValidatorRules.values("", "property");
    expect(() => validator.required()).toThrow(ValidationError);

    validator = ValidatorRules.values(null, "property");
    expect(() => validator.required()).toThrow(ValidationError);

    validator = ValidatorRules.values(undefined, "property");
    expect(() => validator.required()).toThrow(ValidationError);

    validator = ValidatorRules.values(0, "property");
    expect(() => validator.required()).not.toThrow();

    validator = ValidatorRules.values(false, "property");
    expect(() => validator.required()).not.toThrow();
  });

  test("string validation rule method", () => {
    let validator = ValidatorRules.values("value", "property");
    expect(() => validator.string()).not.toThrow();

    validator = ValidatorRules.values("", "property");
    expect(() => validator.string()).not.toThrow();

    validator = ValidatorRules.values(null, "property");
    expect(() => validator.string()).toThrow(ValidationError);

    validator = ValidatorRules.values(undefined, "property");
    expect(() => validator.string()).toThrow(ValidationError);

    validator = ValidatorRules.values(0, "property");
    expect(() => validator.string()).toThrow(ValidationError);

    validator = ValidatorRules.values(false, "property");
    expect(() => validator.string()).toThrow(ValidationError);
  });

  test("maxLength validation rule method", () => {
    let validator = ValidatorRules.values("12345", "property");
    expect(() => validator.maxLength(5)).not.toThrow();

    validator = ValidatorRules.values("value", "property");
    expect(() => validator.maxLength(4)).toThrow(ValidationError);

    validator = ValidatorRules.values("", "property");
    expect(() => validator.maxLength(5)).not.toThrow();

    validator = ValidatorRules.values(null, "property");
    expect(() => validator.maxLength(5)).toThrow(ValidationError);

    validator = ValidatorRules.values(undefined, "property");
    expect(() => validator.maxLength(5)).toThrow(ValidationError);

    validator = ValidatorRules.values(0, "property");
    expect(() => validator.maxLength(5)).toThrow(ValidationError);

    validator = ValidatorRules.values(false, "property");
    expect(() => validator.maxLength(5)).toThrow(ValidationError);
  });
});
