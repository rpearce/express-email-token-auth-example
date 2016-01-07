import mandrill from 'mandrill-api/mandrill';
import { findOrCreateUser } from '../../users/user';
import { createAuth } from '../auth';
import { buildSignInEmail } from '../mailer';

export default async (req, res) => {
  try {
    const { email } = req.body,
          user_id = await findOrCreateUser(email),
          token = await createAuth(user_id),
          message = buildSignInEmail({ email, token }),
          mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

    mandrillClient.messages.send({
      message,
      async: false
    }, (mandrillRes) => {
      if (mandrillRes.reject_reason != null) {
        res.render('auths/views/signIn', { error: mandrillRes.reject_reason });
      } else {
        res.redirect(302, '/check-email');
      }
    });
  } catch (err) {
    console.error(err);
  }
}
