import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	id: String,
	title: String,
	year: Number,
	authorId: String,
});

export default mongoose.model('Books', bookSchema);
