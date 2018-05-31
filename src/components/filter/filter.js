import React, { Component } from "react";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './filter.css'

class Filter extends Component {
    options = [{value: 'cheapest', displayValue: 'Cheapest'}];

    state = {
        filterForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            position: {
                elementType: 'select',
                elementConfig: {
                    options: this.options
                },
                value: '',
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
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        console.log(event)
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
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
            <form onSubmit={this.orderHandler}>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>Search</Button>
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