import React, { Component } from "react";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './filter.css'

class Filter extends Component {

    state = {
        filterForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Player Name'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            },
            position: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Attacking Midfield', displayValue: 'Attacking Midfield'},
                        {value: 'Central Midfield', displayValue: 'Central Midfield'},
                        {value: 'Centre-Back', displayValue: 'Centre Back'},
                        {value: 'Centre-Forward', displayValue: 'Centre Forward'},
                        {value: 'Defensive Midfield', displayValue: 'Defensive Midfield'},
                        {value: 'Keeper', displayValue: 'Keeper'},
                        {value: 'Left Midfield', displayValue: 'Left Midfield'},
                        {value: 'Left Wing', displayValue: 'Left Wing'},
                        {value: 'Left-Back', displayValue: 'Left Back'},
                        {value: 'Right-Back', displayValue: 'Right Back'}
                    ]
                },
                value: 'attackingMidfield',
                validation: {},
                valid: true
            },
            age: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Age'
                },
                value: '',
                validation: {
                    isNumeric: true,
                    minRange: 18,
                    maxRange: 40
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    filterHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.filterForm) {
            formData[formElementIdentifier] = this.state.filterForm[formElementIdentifier].value;
        }
        this.props.search(formData);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minRange) {
            isValid = value >= rules.minRange && isValid
        }

        if (rules.maxRange) {
            isValid = value <= rules.maxRange && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFilterForm = {
            ...this.state.filterForm
        };
        const updatedFormElement = { 
            ...updatedFilterForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFilterForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedFilterForm) {
            formIsValid = updatedFilterForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({filterForm: updatedFilterForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.filterForm) {
            formElementsArray.push({
                id: key,
                config: this.state.filterForm[key]
            });
        }
        let form = (
            <form onSubmit={this.filterHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" type={"submit"} >Search</Button>
                <Button btnType="Warning" type={"button"} clicked={this.props.showAll}>Show All</Button>
            </form>
        );
        return (
            <div className={classes.FormContainer}>
                {form}
            </div>
        );
    }
}

export default Filter;