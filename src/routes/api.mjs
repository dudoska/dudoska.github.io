import express from 'express';

import { redisClient } from '../config/redisClient.mjs';
import {getTopTracks, getTopArtist, getPlayCount, getTopGenres} from '../js/lastFM.mjs'

const router = express.Router();

router.get('/get-top-track', async (req, res) => {
    try{
        let data;
        const value = await redisClient.get('top-track');

        if (value){
            data = JSON.parse(value);
        } else {
            data = await getTopTracks();
            await redisClient.set('top-track', JSON.stringify(data), {
                EX: 7 * 60 * 60 * 24
            });
        }

        res.json(data);
    } catch (error){
        console.error('Ошибка при получении топ трека:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-top-artists', async (req, res) => {
    try{
        let data;
        const value = await redisClient.get('top-artists');

        if (value){
            data = JSON.parse(value);
        } else {
            data = await getTopArtist();
            await redisClient.set('top-artists', JSON.stringify(data), {
                EX: 7 * 60 * 60 * 24
            });
        }

        res.json(data);
    } catch (error){
        console.error('Ошибка при получении топ трека:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-play-count', async (req, res) => {
    try{
        let data;
        const value = await redisClient.get('play-count');

        if (value){
            data = JSON.parse(value);
        } else {
            data = await getPlayCount();
            await redisClient.set('play-count', JSON.stringify(data), {
                EX: 7 * 60 * 60 * 24
            });
        }

        res.json(data);
    } catch (error){
        console.error('Ошибка при получении топ трека:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-top-genres', async (req, res) => {
    try{
        let data;
        const value = await redisClient.get('top-genres');

        if (value){
            data = JSON.parse(value);
        } else {
            data = await getTopGenres();
            await redisClient.set('top-genres', JSON.stringify(data), {
                EX: 7 * 60 * 60 * 24
            });
        }

        res.json(data);
    } catch (error){
        console.error('Ошибка при получении топ трека:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
