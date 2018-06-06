/**
 * Created by earldean on 6/5/18.
 */
import React, { Component } from 'react';


/**
 * Component to render employee input form
 */
class EmployeeInput extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.addEmployee(event);
    };

    render () {
        return (
            <div id="employeeInputCard" className="card col-md-4">
                <div id="employeeInputCardBody" className="card-body">
                    <form id="employeeForm" onSubmit={(event) => { this.onSubmit(event) }}>
                        <div className="form-group">
                            <label htmlFor="employeeFirstName">Employee first name </label>
                            <input id="employeeFirstName" name="firstName" type="text" className="form-control"
                                   placeholder="Lloyd" required="true"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeLastName"> Employee last name </label>
                            <input id="employeeLastName" type="text" name="lastName" className="form-control"
                                   placeholder="Christmas" required="true"/>
                        </div>
                        <input className="btn btn-outline-primary" type="submit" value="Add employee" />
                    </form>
                </div>
            </div>
        )
    }
}

export default EmployeeInput
