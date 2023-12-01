import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ListOrganisations() {

    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        console.log("Hello")
        loadOrgs()
    }, [])

    const loadOrgs = async () => {
        const result = await axios.get("http://localhost:8080/api/organisations")
        console.log(result.data)
        setOrgs(result.data)
    }

    const deleteOrganisation = async (organisationId) => {
        const result = await axios.delete(`http://localhost:8080/api/organisations/${organisationId}`)
        loadOrgs()
    }

    return (
        <div className = 'container'>
            <h2 className='mt-4'>List Of Organisations</h2>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orgs.map((org, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{org.name}</td>
                                    <td>{org.address}</td>
                                    <td>
                                        {/* <button className="btn btn-primary mx-2">View</button> */}
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to = {`/view-organisation/${org.organisationId}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to = {`/edit-organisation/${org.organisationId}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteOrganisation(org.organisationId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
