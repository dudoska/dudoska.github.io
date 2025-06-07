import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from "helmet";

import { redisClient } from './src/config/redisClient.mjs';
import pageRoutes from './src/routes/pages.mjs';
import apiRoutes from './src/routes/api.mjs';

const app = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    redisClient.on('error', (err) => {
        console.error('Redis client error:', err);
    })

    redisClient.on("ready", () => {
        console.log('Redis client ready!');
    })

    await redisClient.connect().then(value => {
        console.log('Redis client connected!');
    });

    await redisClient.ping().then(value => {
        console.log('Redis client send ping!');
    });
})();

app.use(helmet({
    contentSecurityPolicy:{
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://challenges.cloudflare.com',
                'https://static.cloudflareinsights.com',
                'https://api.statusbadges.me/presence/679987861021655094'
            ],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://static.cloudflareinsights.com',
                'https://challenges.cloudflare.com',
                'https://cdnjs.cloudflare.com'
            ],
            scriptSrcAttr: ["'unsafe-inline'"],
            frameSrc: [
                "'self'",
                'https://challenges.cloudflare.com'
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://fonts.googleapis.com'
            ],
            fontSrc: [
                "'self'",
                'https://fonts.gstatic.com'
            ],
        }
    }
}));

app.use('/', pageRoutes);
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'src')));

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
