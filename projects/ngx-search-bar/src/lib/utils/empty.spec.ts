import { empty } from "./empty";

describe('Empty', () => {
  it('validate is false', () => {
    expect(empty(false)).toBeTrue();
  });

    it('validate is true', () => {
    expect(empty(true)).toBeFalse();
    }); 

    it('validate is null', () => {
    expect(empty(null)).toBeTrue();
    });

    it('validate is undefined', () => {
    expect(empty(undefined)).toBeTrue();
    });

    it('validate is empty string', () => {
    expect(empty('')).toBeTrue();
    });

    it('validate is string', () => {
    expect(empty('string')).toBeFalse();
    });

    it('validate is empty array', () => {
    expect(empty([])).toBeTrue();
    });

    it('validate is array', () => {
    expect(empty(['string'])).toBeFalse();
    });

    it('validate is empty object', () => {
    expect(empty({})).toBeTrue();
    });

    it('validate is object', () => {
    expect(empty({ a: 'a' })).toBeFalse();
    });

    it('validate is empty number', () => {
    expect(empty(0)).toBeTrue();
    });

    it('validate is number', () => {
    expect(empty(1)).toBeFalse();
    });

});
