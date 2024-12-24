import { Request, Response } from 'express';
import User from '../models/User';

export const loginUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }
    res.json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
