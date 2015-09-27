import React from 'react';
import SubscribeForm from './components/subscribe/subscribe.jsx';

var mountNode = document.getElementById('subscription-form');

React.render(
    <SubscribeForm
        endpoint='http://tinaciousmailservice.herokuapp.com/email-subscription-demo'
        autofocus={true}
        spinner='spinner.gif'
        successMessage='Your form has been successfully submitted.'
        errorMessage='We could not subscribe you at this time.'
        buttonTitle='Sign Up!' />, mountNode
);
