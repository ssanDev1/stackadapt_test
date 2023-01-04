Hello team StackAdapt! This is Step 3 from my test. I hope things are clear but if you have 
any questions, please email me to slsanch@gmail.com - Sergio S. 

To run the tests, you can use the following commands:

## First, let's install everything: ##

```sh
npm install
```

## To run Cypress with Chrome and Cypress UI: ##

```sh
npm run test 
```

(You can then select 'E2E Testing' in the UI menu, and then select Chrome as your test browser)

## To run Cypress headlessly (And generate a report) ##

```sh
npm run headless
```

## After running a test, reports are added to the location of your repo. for example: ##

C:\Users\<YourUser>\StackAdaptTest\cypress\reports\html

Open the 'index.html' file to view the report. That's it!


**NOTES:**

I attempted to speed up the login process by hitting the API directly, unfortunately I did not get time to configure the header response on time to do it properly. My attempt can be found
in the commands.ts section with the following function. I should clarify that I truly feel I was very close to accomplishing this point, but was only hindered by time! :(

```js
  Cypress.Commands.add('loginByCSRF', (csrfToken, name, email, password) => {
    cy.request({
      method: 'POST',
      url: '/signup',
      failOnStatusCode: false, 
      form: true, 
      body: {
       next: '', 
       csrf_token: csrfToken,
       name: name,
       email: email,
       password: password,
       agree: 'y',
       submit: 'Sign up',
      },
    })
  })

```




