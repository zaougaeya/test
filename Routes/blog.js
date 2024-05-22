import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../Controllers/blog.js';

const router = express.Router();

// Create a new blog post
router.post('/', createBlog);

// Get all blog posts
router.get('/', getBlogs);

// Get a single blog post by ID
router.get('/:id', getBlogById);

// Update a blog post by ID
router.put('/:id', updateBlog);

// Delete a blog post by ID
router.delete('/:id', deleteBlog);

export default router;
