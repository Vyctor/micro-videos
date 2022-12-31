export abstract class ValueObject<T> {
  constructor(private readonly _value: T) {
    this._value = _value;
  }

  get value(): T {
    return this._value;
  }

  toString: () => void = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (_) {
        return this.value + "";
      }
    }
    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
