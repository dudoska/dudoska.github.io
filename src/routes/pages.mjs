import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, '..', '..', 'src', 'page');

router.get('/', (req, res) => {
    res.sendFile(path.join(PAGES_DIR, 'index.html'));
});

export default router;
