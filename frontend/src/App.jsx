import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  // Many-to-Many State
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      if (response.data.length > 0 && !selectedUserId) setSelectedUserId(response.data[0]._id);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
      if (response.data.length > 0 && !selectedStudentId) setSelectedStudentId(response.data[0]._id);
    } catch (error) {
       console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students/courses');
      setCourses(response.data);
      if (response.data.length > 0 && !selectedCourseId) setSelectedCourseId(response.data[0]._id);
    } catch (error) {
       console.error('Error fetching courses:', error);
    }
  };

  const handleAddUser = async () => {
    if (!name) return;
    try {
      await axios.post('http://localhost:5000/users', { name });
      setName('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleAddPost = async () => {
    if (!postTitle || !selectedUserId) return;
    try {
      await axios.post(`http://localhost:5000/users/${selectedUserId}/posts`, { title: postTitle });
      setPostTitle('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleAddStudent = async () => {
    if (!studentName) return;
    try {
      await axios.post('http://localhost:5000/students/student', { name: studentName });
      setStudentName('');
      fetchStudents();
    } catch (error) {
       console.error('Error adding student', error);
    }
  };

  const handleAddCourse = async () => {
    if (!courseTitle) return;
    try {
      await axios.post('http://localhost:5000/students/course', { title: courseTitle });
      setCourseTitle('');
      fetchCourses();
    } catch (error) {
       console.error('Error adding course', error);
    }
  };

  const handleEnroll = async () => {
    if (!selectedStudentId || !selectedCourseId) return;
    try {
      await axios.post('http://localhost:5000/students/enroll', { 
        studentId: selectedStudentId, 
        courseId: selectedCourseId 
      });
      fetchStudents();
    } catch (error) {
       console.error('Error enrolling', error);
    }
  };

  return (
    <div>
      <h1>MERN Barebones Demo</h1>
      
      <div>
        <h2>1. One-to-Many Relationship (Users & Posts)</h2>
        <section>
          <h3>Create User</h3>
          <input type="text" placeholder="User name" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleAddUser}>Add User</button>
        </section>

        <section>
          <h3>Create Post for User</h3>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="" disabled>Select User</option>
            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <input type="text" placeholder="Post title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
          <button onClick={handleAddPost}>Add Post</button>
        </section>

        <section>
          <h3>Users Directory</h3>
          {users.map(user => (
            <div key={user._id}>
              <h4>{user.name}</h4>
              <p><strong>Posts:</strong></p>
              <ul>
                {user.posts && user.posts.length > 0 ? (
                  user.posts.map(post => <li key={post._id}>{post.title}</li>)
                ) : (<li>No posts yet.</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <div>
        <h2>2. Many-to-Many Relationship (Students & Courses)</h2>
        
        <section>
          <h3>Create Student</h3>
          <input type="text" placeholder="Student name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          <button onClick={handleAddStudent}>Add Student</button>
        </section>

        <section>
          <h3>Create Course</h3>
          <input type="text" placeholder="Course title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
          <button onClick={handleAddCourse}>Add Course</button>
        </section>

        <section>
          <h3>Enroll Student in Course</h3>
          <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
            <option value="" disabled>Select Student</option>
            {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
            <option value="" disabled>Select Course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <button onClick={handleEnroll}>Enroll</button>
        </section>

        <section>
          <h3>Students Directory</h3>
          {students.map(student => (
            <div key={student._id}>
              <h4>{student.name}</h4>
              <p><strong>Enrolled Courses:</strong></p>
              <ul>
                {student.courses && student.courses.length > 0 ? (
                  student.courses.map(course => <li key={course._id}>{course.title}</li>)
                ) : (<li>No courses yet.</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>

    </div>
  );
}

export default App;
