import express from 'express';
import getHome from './getHome';

const router = new express.Router();

router.get('/', getHome);

export default router;
