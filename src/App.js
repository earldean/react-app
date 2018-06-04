import React, { Component } from 'react';
import BenefitsCalculator from './components/BenefitsCalculator';

const props = {
    /** Number of pay checks employee receives per year*/
    employeeAnnualPayPeriods: 26,

    /** An Emplyee's pay check amount for each par period */
    grossEmployeePayCheck: 2000,

    /** Cost of an employees benefit package paid by employer per year */
    employeeAnnualBenefitCost: 1000,

    /** Cost of employees dependent benefit package paid by employer per year */
    dependentAnnualBenefitCost: 500,

    /** Anyone (Employee or dependent whos name starts with a receives a discount */
    annualBenefitDiscount: 0.1
};

class App extends Component {
  render() {
    return (
      <BenefitsCalculator {...props}/>
    );
  }
}

export default App;
