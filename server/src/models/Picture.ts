import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Picture = mongoose.model('Picture', PictureSchema);
export default Picture;