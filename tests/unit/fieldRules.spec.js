import { percentValues } from '@/fieldRules';

describe('fieldRules', () => {

  const fieldError = 'Type in a value between 0-100';

  let percentValuesDataTable = [
    [10, true], 
    [0, true],
    [100, true],
    [101, fieldError],
    [-10, fieldError],
    [null, fieldError]
  ];

  describe('#percentValues', () => {
    it.each(percentValuesDataTable)(
      'when val=%s should return %p',
      (val, expected) => {
        expect(percentValues(val)).toBe(expected);
      },
    );
  });
});