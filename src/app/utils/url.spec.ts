import { returnUrlQueryParam } from './url';

describe('utils url', () => {
  it('should returnUrlQueryParam return string with query params', () => {
    expect(returnUrlQueryParam('/test')).toEqual('?returnUrl=/test');
  });
});
