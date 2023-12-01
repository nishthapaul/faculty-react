import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddFaculty() {

    let navigate = useNavigate()

    const [faculty, setFaculty] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        photographPath: "",
        selectedDepartmentId: ""
    })

    const [departments, setDepartments] = useState([])

    const [error, setError] = useState('');

    const {firstName, lastName, email, title, selectedDepartmentId, photographPath} = faculty

    const onInputChange = (event) => {
        setFaculty({...faculty, [event.target.name]: event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            setError('');
            const selectedDepartment = departments.find(dep => dep.departmentId === Number(selectedDepartmentId));
            
            console.log(selectedDepartment);
            const facultyWithDepartment = {
                ...faculty,
                department: selectedDepartment,
            };

            const response = await axios.post('http://localhost:8080/api/employees', facultyWithDepartment);
            console.log(response.data);

            window.alert('User registered successfully!');
            navigate(`/view-faculty/${response.data.employeeId}`)

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setError('Server is not responding');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        loadDepartments()
    }, [])

    const loadDepartments = async () => {
        const result = await axios.get(`http://localhost:8080/api/departments`)
        console.log(result.data)
        setDepartments(result.data)
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 p-4 mt-3 shadow">
                        <h3 className="text-center m-2">Add Faculty</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => onSubmitHandler(event)}>
                                <div className="form-group mb-3">
                                    <label className="form-label">First Name: </label>
                                    <input
                                        placeholder="Enter first name"
                                        type={"text"}
                                        className="form-control"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Last Name: </label>
                                    <input
                                        placeholder="Enter last name"
                                        type={"text"}
                                        className="form-control"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email: </label>
                                    <input
                                        placeholder="Enter email"
                                        type={"text"}
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="form-group mb-3">
                                    <label className="form-label">Title:</label>
                                    <select
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={(event) => onInputChange(event)}
                                    >
                                    <option value="" disabled>Select Title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Department:</label>
                                    <select
                                        className="form-control"
                                        name="selectedDepartmentId"
                                        value={selectedDepartmentId}
                                        onChange={(event) => onInputChange(event)}
                                    >
                                        <option value="" disabled>Select Department</option>
                                        {
                                            departments.map((department, index) => (
                                                <option key={index} value={department.departmentId}>{department.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Image URL:</label>
                                    <input
                                        placeholder="Enter image URL"
                                        type="text"
                                        className="form-control"
                                        name="photographPath"
                                        value={photographPath}
                                        onChange={(event) => onInputChange(event)}
                                    />
                                </div>
                                <button className="btn btn-outline-primary" type="submit">Submit</button>
                                {/* <Link className="btn btn-outline-danger mx-2" to="/view-faculty">Cancel</Link> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
