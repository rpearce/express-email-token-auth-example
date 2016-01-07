import { findUser } from '../../users/user';

export default async (req, res) => {
  try {
    let currentUser = null;
    if (req.session.user_id) {
      currentUser = await findUser(req.session.user_id);
    }
    res.render('home/views/home', { currentUser });
  } catch (err) {
    console.error(err);
  }
}
