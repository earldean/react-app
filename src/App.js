import React, { Component } from 'react';
import BenefitsCalculator from './components/BenefitsCalculator';

const props = {
    /** Number of pay checks employee receives per year*/
    numberOfPayPeriods: 26,

    /** An Employee's pay check amount for each par period */
    payCheckAmount: 2000,

    /** Cost of an employees benefit package paid by employer per year */
    employeeAnnualBenefitCost: 1000,

    /** Cost of employees dependent benefit package paid by employer per year */
    dependentAnnualBenefitCost: 500,

    /** Anyone (Employee or dependent whos name starts with a receives a discount */
    benefitsDiscount: 0.10,

    /** First letter of name to apply discount to */
    characterForDiscount: 'a'
};

class App extends Component {
  render() {
    return (
      <BenefitsCalculator {...props}/>
    );
  }
}

export default App;
