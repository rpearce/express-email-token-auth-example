import { expect } from 'chai';
import { find, create, update, destroy } from './queryUtils';
import faker from 'faker';

describe('Query Utils', () => {
  beforeEach(async (done) => {
    try {
      await destroy({ table: 'users' });
      const users = await find({ table: 'users' });
      expect(users.length).to.equal(0);
      done();
    } catch (err) {
      console.error(err);
      done();
    }
  });

  describe('create', () => {
    it('creates a record in the DB and returns its id', async (done) => {
      try {
        const res = await create({ table: 'users', attrs: { email: faker.internet.email() } });
        expect(res[0].match(/-/g).length).to.equal(4); // simple UUID format test
        const users = await find({ table: 'users' });
        expect(users.length).to.equal(1);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('catches a failed insert', async (done) => {
      try {
        await create({ table: 'users', attrs: { email: null } });
      } catch (err) {
        expect(err.name).to.equal('error');
        done();
      }
    });
  });

  describe('find', () => {
    const email = faker.internet.email();

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { email: faker.internet.email() } });
        await create({ table: 'users', attrs: { email } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('finds an individual record', async (done) => {
      try {
        const res = await find({ table: 'users', where: { email } });
        expect(res.length).to.equal(1);
        expect(res[0].email).to.equal(email);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });
  });

  describe('findOrCreate', () => {
  });

  describe('update', () => {
    const email = faker.internet.email()

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { email } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('updates the record successfully', async (done) => {
      try {
        const res = await find({ table: 'users', where: { email } });
        expect(res[0].email).to.equal(email);

        const newEmail = faker.internet.email();
        await update({ table: 'users', where: { email }, attrs: { email: newEmail } })

        const oldEmailRes = await find({ table: 'users', where: { email } });
        expect(oldEmailRes.length).to.equal(0);

        const newEmailRes = await find({ table: 'users', where: { email: newEmail } });
        expect(newEmailRes.length).to.equal(1);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('catches a failed update', async (done) => {
      try {
        await update({ table: 'users', where: { email }, attrs: { email: null } })
      } catch (err) {
        expect(err.name).to.equal('error');
        done();
      }
    });
  });

  describe('destroy', async (done) => {
    const email = faker.internet.email();

    beforeEach(async (done) => {
      try {
        await create({ table: 'users', attrs: { email } });
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });

    it('deletes a record given a condition', async (done) => {
      try {
        const res = await find({ table: 'users', where: { email } });
        expect(res.length).to.equal(1);
        await destroy({ table: 'users', where: { id: res[0].id } });
        const res2 = await find({ table: 'users', where: { email } });
        expect(res2.length).to.equal(0);
        done();
      } catch (err) {
        console.error(err);
        done();
      }
    });
  });
});
