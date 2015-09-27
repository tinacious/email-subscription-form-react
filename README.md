# Email Subscription form in React

This email subscription form makes a post request to a specified endpoint with the following properties as JSON data:

- `first_name`
- `last_name`
- `email`

This is the client-side for a complementary API that would make a request to the Mandrill API to subscribe the submitted user.

## Usage

The component supports the following props:

- `{String} endpoint` : the endpoint to POST the above-mentioned JSON data to
- `{Bool}   autofocus` : whether to autofocus the form or not (focuses the first name field)
- `{String} spinner` : filename of the image to use as spinner
- `{String} successMessage`
- `{String} errorMessage`
- `{String} buttonTitle`

You can use the component in your React project like so:

```jsx
<SubscribeForm
    endpoint=''
    autofocus={true}
    spinner='spinner.gif'
    successMessage='Success!'
    errorMessage='FAIL.'
    buttonTitle='Sign Up!' />
```

![](email-subscription-demo.gif)
