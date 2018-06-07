/**
 * Created by earldean on 6/3/18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeInput from './EmployeeInput';
import BenefitsRepositoryService from './BenefitsRepositoryService';


class BenefitsCalculator extends Component {

    constructor(props) {
        super(props);

        BenefitsCalculator.propTypes = {
            /** Number of pay checks employee receives per year*/
            numberOfPayPeriods: PropTypes.number.isRequired,

            /** An Employees pay check amount for each par period */
            payCheckAmount: PropTypes.number.isRequired,

            /** Cost of an employees benefit package paid by employer per year */
            employeeAnnualBenefitCost: PropTypes.number.isRequired,

            /** Cost of employees dependent benefit package paid by employer per year */
            dependentAnnualBenefitCost: PropTypes.number.isRequired,

            /** Anyone (Employee or dependent whos name starts with a receives a discount */
            benefitsDiscount: PropTypes.number.isRequired,

            /** First letter of name to apply discount to */
            characterForDiscount: PropTypes.string.isRequired
        };

        this.state = {
            /** Total cost of employee with salary and benefits */
            totalAnnualCost: 0.0,

            /** Total cost of employees annual benefits (including dependents) */
            annualBenefitCost: 0.0,

            /** Employees annual salary */
            annualGrossSalary: this.calculateAnnualSalary(this.props.numberOfPayPeriods, this.props.payCheckAmount),

            employee: {
                firstName: "",
                lastName: ""
            },

            dependents: [],

            /** Used to check if an employee has been added - if so do not render add employee form */
            employeeAdded: false
        };

        this.addEmployee = this.addEmployee.bind(this);
        this.addDependent = this.addDependent.bind(this);
    }

    /**
     * @param event
     */
    addEmployee = (event) => {
        event.preventDefault();

        let employee = {
            firstName: event.target.firstName.value.toLowerCase(),
            lastName: event.target.lastName.value.toLowerCase()
        };

        let benefitCost = this.getAnnualBenefitCost(this.props.employeeAnnualBenefitCost, employee.firstName)
            + this.state.annualBenefitCost;

        this.setState({
            employee: employee,
            annualBenefitCost: benefitCost,
            totalAnnualCost: this.state.annualGrossSalary + benefitCost,
            employeeAdded: true
        });
    };

    /**
     *
     * @param event
     */
    addDependent = (event) => {
        event.preventDefault();

        const newDependent = {
            firstName: event.target.firstName.value.toLowerCase(),
            lastName: event.target.lastName.value.toLowerCase()
        };

        let benefitCost = this.getAnnualBenefitCost(this.props.dependentAnnualBenefitCost, newDependent.firstName)
            + this.state.annualBenefitCost;

        this.setState({
            dependents: this.state.dependents.concat([newDependent]),
            annualBenefitCost: benefitCost,
            totalAnnualCost: this.state.annualGrossSalary + benefitCost
        });

        document.getElementById('dependentForm').reset();
    };

    getAnnualBenefitCost = (annualBenefitCost, firstName) => {
        return (firstName[0] === this.props.characterForDiscount) ?
            this.applyDiscount(annualBenefitCost) : annualBenefitCost;
    };

    applyDiscount = (annualBenefitCost) => {
        return annualBenefitCost - (annualBenefitCost * this.props.benefitsDiscount);
    };

    calculateAnnualSalary = (payPeriod, payPeriodAmount) => {
        return payPeriod * payPeriodAmount;
    };

    render () {
        return (
            <div className="container">
                <div className="row d-flex justify-content-between my-4 ">

                    <EmployeeInput addEmployee={this.addEmployee}/>

                    <div className="card col-md-6">
                        <div className="card-body">

                            <div>
                                <p className="text-primary text-monospace">
                                    Empolyee {this.state.employee.firstName} {this.state.employee.lastName}
                                </p>

                                <p className="text-primary text-monospace"> Dependents </p>
                                <ul>
                                    {
                                        this.state.dependents.map((dependent) => {
                                            return <li className="text-primary text-monospace">
                                                {dependent.firstName} {dependent.lastName}
                                                </li>
                                        })
                                    }

                                </ul>
                            </div>

                            <div>
                                <p className="text-success text-monospace">
                                    <strong>Annual benefits cost ${this.state.annualBenefitCost}</strong>
                                </p>
                                <p className="text-info text-monospace">
                                    <strong>Annual salary ${this.state.annualGrossSalary}</strong>
                                </p>
                                <p className="text-success text-monospace">
                                    <strong>Total annual cost ${this.state.totalAnnualCost}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-between">
                    <div id="dependentInputCard" className="card col-md-4">
                        <div id="dependentInputCardBody" className="card-body">
                            <form id="dependentForm" onSubmit={(event) => { this.addDependent(event) }}>
                                <div className="form-group">
                                    <label htmlFor="dependentFirstName"> Dependents first name </label>
                                    <input id="dependentFirstName" type="text" className="form-control"
                                           name="firstName" required="true"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dependentLastName"> Dependents last name </label>
                                    <input id="dependentLastName" type="text" className="form-control"
                                           name="lastName" required="true"/>
                                </div>
                                <input className="btn btn-outline-primary" type="submit" value="Add dependent" />
                            </form>
                        </div>
                    </div>

                    <BenefitsRepositoryService employee={this.state.employee} dependents={ this.state.dependents }/>

                </div>
            </div>
        )
    }
}

export default BenefitsCalculator;