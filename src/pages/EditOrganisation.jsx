import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditOrganisation() {

    let navigate = useNavigate()

    const {organisationId} = useParams()

    const [organisation, setOrganisation] = useState({
        name: "",
        address: ""
    })

    const {name, address} = organisation

    const onInputChange = (event) => {
        setOrganisation({...organisation, [event.target.name]: event.target.value})
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        await axios.put(`http://localhost:8080/api/organisations/${organisationId}`, organisation)
        navigate("/organisations")
    }

    const loadOrganisation = async () => {
        const result = await axios.get(`http://localhost:8080/api/organisations/${organisationId}`)
        setOrganisation(result.data)
    }

    useEffect(() => {
        loadOrganisation()
    }, [])

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 p-4 mt-3 shadow">
                    <h3 className="text-center m-2">Edit Organisation</h3>
                    <div className="card-body">
                        <form onSubmit={(event) => onSubmitHandler(event)}>
                            <div className="form-group mb-3">
                                <label className="form-label">Name: </label>
                                <input
                                    placeholder="Enter name of the organisation"
                                    type={"text"}
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(event) => onInputChange(event)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Address: </label>
                                <input
                                    placeholder="Enter address of the organisation"
                                    type={"text"}
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    onChange={(event) => onInputChange(event)}
                                />
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Submit</button>
                            <Link className="btn btn-outline-danger mx-2" to="/organisations">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
