// This is the Page Object Model (POM) Excercise from the 2nd point in the 
// StackAdapt test. It is unrelated to the rest of the source code from step 3.

// SUMMARY:

// I would split the Optical Page's WebElements in 5 parts:   
// topMenuNavigation / productFilters / productView / socialElements / footerNavigation

// At the bottom of this file, I would place any functions or methods that could speed up my process (like email input, 
// generators etc). On Cypress however, I would prefer to keep them all in the e2e > support > commands.ts file as 
// these can be reused on any other file or page.

// We would import the opticalPage class into the opticalPage.cy.ts test run file as:
// import { opticalPage } from '../<fileLocation>'
export class OpticalPage {

    topMenuNavigation = {

       main: {
            sunglasses: () => cy.get('[data-menu=sunglasses]'),
            opticals: () => cy.get('[data-menu=opticals]'),
            collaborations: () => cy.get('[data-menu=collaborations]'),
            accessories: () => cy.get('[data-menu=accessories]'),
            virtualTryOn: () => cy.get('[data-menu=virtual-try-on]'),

             // I prefer going for 'data-menu' or 'data-id' since classes are prone to be changed/renamed. The ideal best scenario
             // Is to create our own automation attributes, such as 'data-test=element-name'

             // These properties can be accessed in the test.cy.ts file as (example): 
             // topMenuNavigation.main.sunglasses.click()
        },

       featureHeading: {
            heading: () => cy.get('.text-feature-heading'),

            // we can validate this one later as:
            // featureHEading
        },

       icons: {
            search: () => cy.get('.header-search-icon'),
            profile: () => cy.get('.header-account'),
            wishlist: () => cy.get('.header-wishlist'),
            shoppingBag: () => cy.get('.header-basket'),
            country: () => cy.get('.current-country')
        }, 
    }

    productFilters = {

        frameColour: {
            black: () => cy.get('[data-value=frame_colour_Black]'),
            brown: () => cy.get('[data-value=frame_colour_Brown]'),
            clear: () => cy.get('[data-value=frame_colour_Clear]')
            //.. rest of colors
         },
         designer: {
            linda_farrow: () => cy.get('[data-value=designer_Linda%20Farrow]'),
            linda_farrow_linear: () => cy.get('[data-value=designer_Linda%20Farrow%20Linear]'),
            //.. rest of designers

            // Note: We could get even fancier if for example, there are more designers later on or if the designer name changes. 
            // We could update the property value dinamically. Some pseudo code like this:
            //
            // type Designer = {
            //     name: string;
            //   };

            //   const myVar = 'name';

            //   const obj: Designer = {
            //     [myVar]: 'Linda',
            //   };
         },
        
        // pattern for filters would continue as:

        //  frameStyle: {} ...
        //  gender: {} ... and so on.

        sortedBy: {
        
        // For the sorting dropdown we can either look at the children contents:
            mostPopular: () => cy.get('.collection-sort__input').children().contains('Most Popular'),

        // Or find by the attribute name (example: High To Low)
            highToLow: () => cy.get('.collection-sort__input').children().get(('[value=price-descending]')),
         },
    
    }

    socialElements = {
        // same cy.get concept

    }

    footerNavigation = {
          // same cy.get concept
    }

    // FUNCTIONS AND COMMANDS:


    // For productView (product listings), since there are so many, we can speed up the work with some declarations and simple functions. Here are two
    // Examples that could exist in the pom file... however! Cypress works best using the commands.ts file. That's where these should always be stored
    // which makes it much easier to maintain. In the next example, we can do something like this to get the product title and cost:

     productTitle(productContainer: any ) {
         productContainer.find('.product-title').invoke('text').then((text: string) => {
            return text
          })
     }

    productCost(productContainer: any) {
         productContainer.find('.money').invoke('text').then((text: string) => {
            return text
        })
     }

    // In our test scenario, this function would look something like:
    
    // expect(page.productTitle(myProductContainer.eq(0)).to.contain('Alba Cat Eye Optical')) // eq 0 means this is the first container.   



// Other Functions + Simple Commands example (email input)

    enterEmail(userEmail: string) {
        cy.get('[id=Email]')
            .clear()
            .type(userEmail);
        return this
    }

}

