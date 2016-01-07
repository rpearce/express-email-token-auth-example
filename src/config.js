export const express = {
  protocol: process.env.EXPRESS_PROTOCOL || 'http',
  host: process.env.EXPRESS_HOST || 'localhost',
  port: process.env.EXPRESS_PORT || 3000
};

export const mailer = {
  from: 'donotreply@yourdomain.com',
  name: 'Email Token Auth - Do Not Reply'
};
