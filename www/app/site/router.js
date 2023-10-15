import express from 'express';
import { join, resolve } from 'path';

var router = new express.Router()

router.use(express.static(join(resolve(), '../../root')))

export default router