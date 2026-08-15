require('dotenv').config();
console.log('Loaded URI:', process.env.MONGO_URI);  //DELETE LATER
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/tasks');
const clubRoutes = require('./routes/clubs');
const clubTaskRoutes = require('./routes/clubTasks');
const syllabusRoutes = require('./routes/syllabus');
const bookmarkRoutes = require('./routes/bookmarks');
const playlistRoutes = require('./routes/playlists');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/clubs', clubRoutes);
app.use('/api/club-tasks', clubTaskRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/playlists', playlistRoutes);

app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));