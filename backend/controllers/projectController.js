const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
    try {
        const { title, description, category, theme, link, stats } = req.body;
        let headerImage = '';
        let images = [];

        if (req.files) {
            if (req.files['headerImage'] && req.files['headerImage'].length > 0) {
                headerImage = `/uploads/${req.files['headerImage'][0].filename}`;
            }
            if (req.files['images'] && req.files['images'].length > 0) {
                images = req.files['images'].map(file => `/uploads/${file.filename}`);
            }
        }

        let parsedStats = [];
        if (stats) {
            try { parsedStats = typeof stats === 'string' ? JSON.parse(stats) : stats; } catch(e) {}
        }

        const project = new Project({
            title,
            description,
            category,
            theme,
            link,
            stats: parsedStats,
            headerImage,
            images
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
    try {
        const { title, description, category, theme, link, stats } = req.body;
        const project = await Project.findById(req.params.id);

        if (project) {
            project.title = title || project.title;
            project.description = description || project.description;
            project.category = category || project.category;
            if (theme !== undefined) project.theme = theme;
            if (link !== undefined) project.link = link;
            if (stats !== undefined) {
                try { project.stats = typeof stats === 'string' ? JSON.parse(stats) : stats; } catch(e) {}
            }

            if (req.files && req.files['headerImage'] && req.files['headerImage'].length > 0) {
                project.headerImage = `/uploads/${req.files['headerImage'][0].filename}`;
            } else if (req.body.headerImage !== undefined) {
                project.headerImage = req.body.headerImage;
            }

            let retainedImages = project.images || [];
            if (req.body.existingImages !== undefined) {
                try {
                    retainedImages = typeof req.body.existingImages === 'string' 
                        ? JSON.parse(req.body.existingImages) 
                        : req.body.existingImages;
                } catch (e) {}
            }

            if (req.files && req.files['images'] && req.files['images'].length > 0) {
                const newImages = req.files['images'].map(file => `/uploads/${file.filename}`);
                project.images = [...retainedImages, ...newImages];
            } else if (req.body.existingImages !== undefined) {
                project.images = retainedImages;
            }

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            await Project.deleteOne({ _id: project._id });
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
