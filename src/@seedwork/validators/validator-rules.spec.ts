import { ValidatorRules } from "./validator-rules";
import { ValidationError } from "../errors/validation-error";

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

type ExpectedValidationRule = {
  value: any;
  property: string;
};

function runRule({
  value,
  property,
  rule,
  params,
}: Omit<ExpectedRule, "error">): void {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as (...args: any[]) => ValidatorRules;
  method.apply(validator, params);
}

function assertIsInvalid(expected: ExpectedRule): void {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

describe("ValidatorRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("value", "property");

    expect(validator).toBeDefined();
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("value");
    expect(validator["property"]).toBe("property");
  });

  test("required validation rule method", () => {
    let arrange: ExpectedValidationRule[] = [
      {
        value: null,
        property: "field",
      },
      {
        value: undefined,
        property: "field",
      },
      {
        value: "",
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("Property field is required"),
      });
    });

    arrange = [
      {
        value: "value",
        property: "field",
      },
      {
        value: 5,
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
      {
        value: 0,
        property: "field",
      },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("Property field is required"),
      });
    });
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

  it("should throw a validation error when combine rules", () => {
    const validator = ValidatorRules.values("", "property");

    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(ValidationError);

    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError("Property property is required"));
  });

  it("should valid when combine two or more rules", () => {
    const validator = ValidatorRules.values("value", "property");

    expect(() => {
      validator.required().string().maxLength(5);
    }).not.toThrow();

    expect(() => {
      validator.required().string();
    }).not.toThrow();
  });
});
