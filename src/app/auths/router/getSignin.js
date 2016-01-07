import { findAuth, isValidAuth } from '../auth';

export default async (req, res) => {
  try {
    if (req.session.user_id) {
      res.redirect(302, '/');
    } else {
      const token = req.query.t;
      if (token) {
        let auth = await findAuth(token);
        if (auth && isValidAuth(auth)) {
          req.session.user_id = auth.user_id;
          req.session.save((err) => {
            if (err) { throw('bad session save'); }
            res.redirect(302, '/');
          });
        } else {
          req.session.user_id = null;
          req.session.save((err) => {
            if (err) { throw('bad session save'); }
            res.render('auths/views/signIn', { error: 'Invalid Auth' });
          });
        }
      } else {
        res.render('auths/views/signIn');
      }
    }
  } catch (err) {
    console.error(err);
  }
}
