import { Request, Response } from 'express';
import Picture from '../models/Picture';
import User from '../models/User';

export const getPictures = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const pictures = await Picture.find()
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        res.json(pictures);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const sharePicture = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;
    const userId = req.headers.authorization;

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const picture = await Picture.create({
            url: `/uploads/${req.file?.filename}`,
            title,
            sharedBy: user._id,
        });

        res.json({ success: true, picture });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};