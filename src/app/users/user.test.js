import { expect } from 'chai';
import faker from 'faker';
import { isValidUser } from './user';

const email = faker.internet.email();

describe('User', () => {
  describe('isValidUser', () => {
    it('is valid when required attrs are present', () => {
      expect(isValidUser({ email })).to.equal(true);
    });

    it('is invalid when email is blank', () => {
      expect(isValidUser({ email: '' })).to.equal(false);
    });
  });
});
