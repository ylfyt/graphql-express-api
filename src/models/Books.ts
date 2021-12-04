import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	year: { type: Number, required: true },
	authorId: { type: String, required: true },
});

export default mongoose.model('Books', bookSchema);
