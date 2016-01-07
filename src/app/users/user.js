import db from '../../db/';
import { find, create } from '../../db/queryUtils';

const table = 'users';

export const isValidUser = ({ email }) => !!email;

export const findUser = async (id) => {
  try {
    const res = await find({ table, where: { id } });
    return res[0];
  } catch (err) {
    console.error(err);
  }
}

export const findOrCreateUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      db
        .raw(`INSERT INTO ${table} (email) SELECT ? WHERE NOT EXISTS (SELECT email FROM users WHERE email = ?);`, [email, email])
        .then(() => {
          return db(table)
            .where({ email })
            .select('id')
            .then((res) => resolve(res[0].id))
            .catch(reject)
        })
        .catch(reject);
    } catch (err) {
      reject(err);
    }
  });
}
