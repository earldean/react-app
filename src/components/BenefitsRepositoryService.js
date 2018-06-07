/**
 * Created by earldean on 6/6/18.
 */

import React, { Component } from 'react';
import axios from 'axios';

let BENEFITS_REPOSITORY_SERVICE_URL = 'http://localhost:8080/api/employee/';

class BenefitsRepositoryService extends Component {

    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateSearchInput = this.updateSearchInput.bind(this);

        this.state = {
            lastName: "",
            employeeAndDependents: ""
        }
    }

    /**
     * Post Current Employee and their dependents when saveEmployee button is clicked
     */
    handleSave = () => {

        const postBody = {
            "employee": this.props.employee,
            "dependents": this.props.dependents
        };

        axios(BENEFITS_REPOSITORY_SERVICE_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: postBody,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * Perform get to search benefit service for employees this last name for search input
     */
    handleSearch = () => {

        axios(BENEFITS_REPOSITORY_SERVICE_URL + "search?name=" + this.state.lastName, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                this.setState({
                    // TODO Need to transform the response body to be displayed in the browser
                    employeeAndDependents: response.data.toString()
                });
            })
            .catch((error) => {
                console.log(error);
            })
    };

    /**
     * Update state with search input
     * @param event input id=lastNameInput
     */
    updateSearchInput = (event) => {
        this.setState({
            lastName: event.target.value
        })
    };

    render() {
        return (
            <div className="card col-md-6">
                <div className="card-body">
                    <div className="input-group mb-2">
                        <input id="lastNameInput" className="form-control py-2 border-right-0 border"
                               type="text" placeholder="search by last name"
                               onChange={(event) => {
                                   this.updateSearchInput(event)
                               }}/>
                        <span className="input-group-append">
                            <button className="btn btn-outline-success" type="button"
                                    onClick={this.handleSearch}>Search</button>
                    </span>
                    </div>
                    <button id="saveEmployee" className="btn btn-outline-primary"
                            onClick={this.handleSave}>Save employee
                    </button>

                    <div id="searchResults">
                        <p>
                            { this.state.employeeAndDependents }
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BenefitsRepositoryService