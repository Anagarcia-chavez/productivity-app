import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTask = (id, updates) => api.patch(`/tasks/${id}`, updates);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const getClubs = () => api.get('/clubs');
export const createClub = (club) => api.post('/clubs', club);
export const updateClub = (id, updates) => api.patch(`/clubs/${id}`, updates);
export const deleteClub = (id) => api.delete(`/clubs/${id}`);
export const getClubTasks = (clubId) => api.get(`/club-tasks?clubId=${clubId}`);
export const createClubTask = (task) => api.post('/club-tasks', task);
export const updateClubTask = (id, updates) => api.patch(`/club-tasks/${id}`, updates);
export const deleteClubTask = (id) => api.delete(`/club-tasks/${id}`);
export const getBookmarks = () => api.get('/bookmarks');
export const createBookmark = (bookmark) => api.post('/bookmarks', bookmark);
export const deleteBookmark = (id) => api.delete(`/bookmarks/${id}`);
export const parseSyllabus = (formData) => api.post('/syllabus/parse', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;