import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ListCourses(props) {

    const {facultyId} = props

    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        const result = await axios.get(`http://localhost:8080/api/employees/${facultyId}/courses`)
        console.log(result.data)
        setCourses(result.data)
    }

    return (
        <div className = 'container'>
            <h4 className='mt-2'>List Of Courses</h4>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Academic Year</th>
                            <th scope="col">Term</th>
                            <th scope="col">Credits</th>
                            <th scope="col">Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{course.course_code}</td>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.academic_year}</td>
                                    <td>{course.term}</td>
                                    <td>{course.credits}</td>
                                    <td>{course.capacity}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
