import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListCourses from './ListCourses'


export default function Viewfaculty() {

    const {facultyId} = useParams()

    const [faculty, setFaculty] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        photographPath: ""
    })

    const loadFaculty = async () => {
        const result = await axios.get(`http://localhost:8080/api/employees/${facultyId}`)
        console.log(result.data)
        setFaculty(result.data)
    }

    useEffect(() => {
        loadFaculty()
    }, [])

    return (
        <div className = 'container'>
            <div className="row">
                <div className="card col-md-12 offset-md-0 p-4 mt-3 shadow">
                    <h2 className="text-center m-2">Faculty Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of Faculty Id : {facultyId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First Name : </b>
                                    {faculty.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>Last Name : </b>
                                    {faculty.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>Email : </b>
                                    {faculty.email}
                                </li>
                                <li className="list-group-item">
                                    <b>Title : </b>
                                    {faculty.title}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-3" to={`/add-course/${facultyId}`}>Add a Course</Link>
                    <ListCourses facultyId={facultyId} />
                </div>
            </div>
        </div>
    )
}
