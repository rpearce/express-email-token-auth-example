import { expect } from 'chai';
import faker from 'faker';
import { update } from '../../db/queryUtils';
import { isValidAuth, createAuth } from './auth';

describe('Auth', () => {
  describe('isValidAuth', () => {
    describe('when created_at is 15 minutes old', () => {
      it('returns false', () => {
        const time = new Date();
        time.setMinutes(time.getMinutes() - 15);
        const created_at = time.toString();
        const result = isValidAuth({ created_at });
        expect(result).to.equal(false);
      });
    });

    describe('when created_at is >15 minutes old', () => {
      it('returns false', () => {
        const time = new Date();
        time.setMinutes(time.getMinutes() - 16);
        const created_at = time.toString();
        const result = isValidAuth({ created_at });
        expect(result).to.equal(false);
      });
    });

    describe('when created_at is <15 minutes old', () => {
      it('returns true', () => {
        const time = new Date();
        time.setMinutes(time.getMinutes() - 14);
        const created_at = time.toString();
        const result = isValidAuth({ created_at });
        expect(result).to.equal(true);
      });
    });
  });
});
