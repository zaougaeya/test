import { sendEmail } from './sendEmail.js'; // Importer directement depuis le répertoire racine
import Blog from '../Models/blog.js';
import User from '../Models/user.js';



async function getAllUserEmails() {
    try {
        const users = await User.find({}, 'email'); // Fetch only email field
        return users.map(user => user.email);
    } catch (error) {
        console.error('Error fetching user emails:', error);
        return [];
    }
}

// Create blog 
export const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();

        // Fetch all user emails
        const userEmails = await getAllUserEmails();

        // Send email notification to all users
        const emailContent = `A new blog post has been added: ${savedBlog.title}`;
        await sendEmail(userEmails, 'New Blog Post Added', emailContent);

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
