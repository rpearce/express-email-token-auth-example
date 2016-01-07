import { find, create, update } from '../../db/queryUtils';

const table = 'auths',
      validTimeframe = 60 * 15 * 1000; // 15 minutes in milliseconds

export const findAuth = async (id) => {
  try {
    const res = await find({ table, where: { id } });
    return res[0];
  } catch (err) {
    console.error(err);
  }
}

export const createAuth = async (user_id) => {
  try {
    const res = await create({ table, attrs: { user_id } });
    return res[0];
  } catch (err) {
    console.error(err);
  }
}

export const isValidAuth = ({ created_at }) => {
  const currentTime = new Date(),
        time = new Date(created_at);
  return (currentTime - time) < validTimeframe;
}
