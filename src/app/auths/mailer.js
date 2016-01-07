import mandrill from 'mandrill-api/mandrill';
import { mailer, express } from '../../config';

export const buildSignInEmail = ({ email, token }) => {
  const { html, text } = buildSignInContent({ token });
  const subject = 'Sign in';
  return {
    'html': html,
    'text': text,
    'subject': subject,
    'from_email': mailer.from,
    'from_name': mailer.name,
    'to': [ { email } ]
  };
}

const buildSignInContent = ({ token }) => {
  const { protocol, host, port } = express;
  const link = `${protocol}://${host}:${port}/signin?t=${token}`;
  const html = `
    <p>
      Click this link to sign in:
      <br />
      <br />
      <a href="${link}">${link}</a>
    </p>
  `;
  const text = `Click this link to sign in: ${link}`;
  return { html, text };
}
