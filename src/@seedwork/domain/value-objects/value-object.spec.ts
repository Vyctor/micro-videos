import { ValueObject } from "./value-object";

class StubValueObject extends ValueObject<any> {}

describe("ValueObject Unit tests", () => {
  it("should set value", () => {
    const valueObject = new StubValueObject("value");
    expect(valueObject.value).toBe("value");
  });

  it("should set object values", () => {
    const valueObject = new StubValueObject({ name: "value", age: 10 });
    expect(valueObject.value.name).toBe("value");
    expect(valueObject.value.age).toBe(10);
  });

  it("should convert value to string", () => {
    const date: Date = new Date();

    let arrange = [
      { received: null, expected: "null" },
      { received: undefined, expected: "undefined" },
      { received: "", expected: "" },
      { received: "string", expected: "string" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const valueObject = new StubValueObject(value.received);
      expect(valueObject + "").toBe(value.expected);
    });
  });
});
