Hello team StackAdapt! This is Step 3 from my test. I hope things are clear but if you have 
any questions, please email me to slsanch@gmail.com - Sergio S. 

``` 
Important Note

Due to an honest mistake, I based my answer for the assignment step 2 on the actual site:

https://us.lindafarrow.com/collections/optical

Instead of: 

https://stackadapt-interview.s3.amazonaws.com/support/Chrysler+Optical+A+D-Frame+in+Tortoiseshell+by+LINDA+FARROW+Linear+%E2%80%93+LINDA+FARROW+(U.S.).html 

The concepts are the same, but I apologize for the change. I was accidentally redirected and realized too late into the work :(.
```

Instructions:
=============

## First, let's install all dependencies: ##

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

I attempted to speed up the login process by hitting the API directly, unfortunately I did not get time to configure the header response on time to do it properly. My attempt can be found in the commands.ts section with the following function. I should clarify that I truly feel I was very close to accomplishing this point, but was only hindered by time! Another mention is that this could also be easily accelerated using the cy.session helper from Cypress, which should preserve the login credentials.

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




