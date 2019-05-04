import React from 'react';
import cn from 'classnames';

class SubscribeFormSpinner extends React.Component {
    propTypes: {
        visible : React.PropTypes.bool.isRequired,
        image   : React.PropTypes.string.isRequired
    }

    render() {
        let spinnerStyle = {
            display: this.props.visible ? 'block' : 'none'
        };

        return (
            <div className='spinner' style={ spinnerStyle }>
                <img src={ this.props.image } alt='Spinner' />
            </div>
        );
    }
}

class SubscribeFormResult extends React.Component {
    propTypes: {
        message     : React.PropTypes.string,
        messageType : React.PropTypes.string
    }

    render() {
        let resultClasses = cn('subscribe-form-result', {
            success : this.props.messageType === 'success',
            error   : this.props.messageType === 'error'
        });

        let results = null;
        if (this.props.message) {
            results = <div className={ resultClasses }>{ this.props.message }</div>;
        }

        return results;
    }
}

class SubscribeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName  : null,
            lastName   : null,
            email      : null,
            sending    : false,
            submission : null,
            message    : null
        }
    }

    propTypes: {
        buttonTitle : React.PropTypes.string.isRequired,
        endpoint    : React.PropTypes.string.isRequired,
        autofocus   : React.PropTypes.bool
    }

    onEmailChanged(evt) {
        this.setState({ email: evt.target.value });
    }

    onFirstNameChanged(evt) {
        this.setState({ firstName: evt.target.value });
    }

    onLastNameChanged(evt) {
        this.setState({ lastName: evt.target.value });
    }

    /**
     * Submits the form
     */
    submitForm(evt) {
        evt.preventDefault();

        this.setState({
            sending    : true,
            submission : null,
            message    : null
        });

        let data = {
            first_name : this.state.firstName,
            last_name  : this.state.lastName,
            email      : this.state.email,
        };

        $.ajax({
            type: 'POST',
            url: this.props.endpoint,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: (response) => {
                this.setState({
                    sending    : false,
                    submission : 'success',
                    message    : this.props.successMessage
                });
            },
            error: (error) => {
                this.setState({
                    sending    : false,
                    submission : 'error',
                    message    : this.props.errorMessage
                });
            },
        });
    }

    componentDidMount() {
        if (this.props.autofocus) {
            this.refs.firstNameField.getDOMNode().focus();
        }
    }

    render() {
        let formStyle = {
            display: this.state.sending ? 'none' : 'block'
        };

        return (
            <div className='subscription-form'>

                <SubscribeFormResult
                    messageType={ this.state.submission }
                    message={ this.state.message } />

                <SubscribeFormSpinner visible={ this.state.sending } image={ this.props.spinner } />

                <form onSubmit={ this.submitForm.bind(this) } style={ formStyle }>

                    <div className='subscription-form-field-group'>
                        <label htmlFor='firstNameField'>First name</label>
                        <input type='text' id='firstNameField' onChange={ this.onFirstNameChanged.bind(this) } ref='firstNameField' value={ this.state.firstName } />
                    </div>

                    <div className='subscription-form-field-group'>
                        <label htmlFor='lastNameField'>Last name</label>
                        <input type='text' id='lastNameField' onChange={ this.onLastNameChanged.bind(this) } ref='lastNameField' value={ this.state.lastName } />
                    </div>

                    <div className='subscription-form-field-group'>
                        <label htmlFor='emailField'>Email</label>
                        <input type='email'
                            id='emailField'
                            ref='emailField'
                            onChange={ this.onEmailChanged.bind(this) }
                            value={ this.state.email } />
                    </div>

                    <div className='subscription-form-field-group'>
                        <input type='submit' value={ this.props.buttonTitle } />
                    </div>
                </form>

            </div>
        );
    }
};

export default SubscribeForm;
