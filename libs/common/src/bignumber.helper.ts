import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: [-20, 20],
  RANGE: [-500, 500],
})

export type InputBigNumberType = string | number | BigNumber

export default class BigNumberHelper {
  readonly number: BigNumber
  constructor(number: any) {
    this.number = this.fromAnyToBigNumber(number)
  }

  static from(number: any) {
    return new BigNumberHelper(number)
  }

  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  add(other: any): BigNumberHelper {
    return new BigNumberHelper(this.number.plus(this.fromAnyToBigNumber(other)))
  }

  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  sub(other: any): BigNumberHelper {
    return new BigNumberHelper(
      this.number.minus(this.fromAnyToBigNumber(other)),
    )
  }

  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mul(other: any): BigNumberHelper {
    return new BigNumberHelper(
      this.number.multipliedBy(this.fromAnyToBigNumber(other)),
    )
  }

  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(other: any): BigNumberHelper {
    return new BigNumberHelper(
      this.number.dividedBy(this.fromAnyToBigNumber(other)),
    )
  }

  /**
   *  Returns a comparison result between %%this%% and %%other%%.
   *
   *  This is suitable for use in sorting, where ``-1`` implies %%this%%
   *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
   *  both are equal.
   */
  cmp(other: any): number {
    const diff = this.sub(other)

    // Compare
    if (diff.isNegative()) return -1
    if (diff.isZero()) return 0
    return 1
  }

  /**
   *  Returns true if %%other%% is equal to %%this%%.
   */
  eq(other: any): boolean {
    return this.cmp(other) === 0
  }

  /**
   *  Returns true if %%other%% is less than to %%this%%.
   */
  lt(other: any): boolean {
    return this.cmp(other) < 0
  }

  /**
   *  Returns true if %%other%% is less than or equal to %%this%%.
   */
  lte(other: any): boolean {
    return this.cmp(other) <= 0
  }

  /**
   *  Returns true if %%other%% is greater than to %%this%%.
   */
  gt(other: any): boolean {
    return this.cmp(other) > 0
  }

  /**
   *  Returns true if %%other%% is greater than or equal to %%this%%.
   */
  gte(other: any): boolean {
    return this.cmp(other) >= 0
  }

  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero(): boolean {
    return this.number.isZero()
  }

  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative(): boolean {
    return this.number.isNegative()
  }

  /**
   *  Returns the string representation of %%this%%.
   */
  toString() {
    return this.number.toString()
  }

  toNumber() {
    return this.number.toNumber()
  }

  /**
   *  Returns a float approximation.
   *
   *  Due to IEEE 754 precission (or lack thereof), this function
   *  can only return an approximation and most values will contain
   *  rounding errors.
   */
  toFloat(): number {
    return parseFloat(this.toString())
  }

  /**
   *  Returns true if %%this%% is greater than ``0``.
   */
  isPositive(): boolean {
    return !this.isNegative() && !this.isZero()
  }

  /**
   *  Returns true if %%this%% is greater than or equal ``0``.
   */
  isPositiveOrZero(): boolean {
    return !this.isNegative()
  }

  /**
   *  Returns true if %%this%% is less than or equal ``0``.
   */
  isNegativeOrZero(): boolean {
    return this.isNegative() || this.isZero()
  }

  toBigNumber(): BigNumber {
    return this.number
  }

  private fromAnyToBigNumber(number: any): BigNumber {
    if (number instanceof BigNumber) return number
    if (number instanceof BigNumberHelper) return number.number
    return BigNumber(number)
  }

  toPositive(): BigNumberHelper {
    return new BigNumberHelper(this.number.toString().replace('-', ''))
  }
}
