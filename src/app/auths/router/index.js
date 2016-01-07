import express from 'express';
import getSignIn from './getSignIn';
import postSignIn from './postSignIn';
import getCheckEmail from './getCheckEmail';
import getSignOut from './getSignOut';

const router = express.Router();

router.get('/signin', getSignIn);
router.post('/signin', postSignIn);

router.get('/signout', getSignOut);

router.get('/check-email', getCheckEmail);

export default router;
