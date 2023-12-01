import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddCourse() {

    const {facultyId} = useParams()
    let navigate = useNavigate()

    const [courses, setCourses] = useState([])

    const [selectedCourseId, setSelectedCourseId] = useState('')

    const onInputChange = (event) => {
        setSelectedCourseId(event.target.value);
    };

    const [error, setError] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            setError('');

            const response = await axios.put(`http://localhost:8080/api/courses/${selectedCourseId}/employees/${facultyId}`);
            console.log(response.data);

            window.alert('Course added successfully!');
            navigate(`/view-faculty/${facultyId}`)

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else if (error.request) {
                setError('Server is not responding');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        const result = await axios.get(`http://localhost:8080/api/courses/employees/null`)
        console.log(result.data)
        setCourses(result.data)
    }

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 p-4 mt-3 shadow">
                    <h3 className="text-center m-2">Add A Course</h3>
                    <div className="container">
                    <table>
                        <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            courses.map(course => (
                            <tr key={course.courseId}>
                                <td>{course.courseCode}</td> 
                                <td>{course.name}</td>
                                <td>{course.courseSchedule.startTime}</td>
                                <td>{course.courseSchedule.endTime}</td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(event) => onSubmitHandler(event)}>
                            <div className="form-group mb-3">
                                <select
                                    className="form-control"
                                    name="selectedCourseId"
                                    value={selectedCourseId}
                                    onChange={(event) => onInputChange(event)}
                                >
                                    <option value="" disabled>Select A Course</option>
                                    {
                                        courses.map((course, index) => (
                                            <option key={index} value={course.courseId}>{course.name} ({course.courseCode})</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button className="btn btn-outline-primary" type="submit">Submit</button>
                            <Link className="btn btn-outline-danger mx-2" to={`/view-fcaulty/${facultyId}`}>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
