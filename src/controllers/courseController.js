const Course = require("../models/courseModel");

// get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}); // find everything in the database
        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a single course
const getSingleCourse = async (req, res) => {
    try {
        // using params
        const { id } = req.params; // get the id from the URL
        const course = await Course.findById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// create a course
const createCourse =  async (req, res) => {
    try {
        // save the course
        // await - because it takes time
        // whenever we use await - put async
        const course = await Course.create(req.body);
        res.status(200).json(course); // throw out the course

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};


// update a course
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params; // get the id from the URL
        const course = await Course.findByIdAndUpdate(id, req.body);
        // pass in the things that we want to update

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check it again
        const updatedCourse = await Course.findById(id);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ mesage: error.mesage });

    }
};

// delete a product
const deleteCourse = async (req, res) => {
    try {
        // destructure it
        const { id } = req.params;

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: error.mesage });

    }
};




module.exports = {
    getCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,

}

