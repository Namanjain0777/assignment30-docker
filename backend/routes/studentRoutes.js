const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

// POST /students/student -> create student
router.post('/student', async (req, res) => {
  try {
    const { name } = req.body;
    const student = new Student({ name });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /students/course -> create course
router.post('/course', async (req, res) => {
  try {
    const { title } = req.body;
    const course = new Course({ title });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /students/enroll -> enroll student in course
router.post('/enroll', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    
    // Add course to student
    await Student.findByIdAndUpdate(studentId, {
      $addToSet: { courses: courseId }
    });
    
    // Add student to course
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { students: studentId }
    });
    
    res.json({ message: 'Enrollment successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /students -> fetch students with courses (use populate)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('courses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /students/courses -> fetch all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
