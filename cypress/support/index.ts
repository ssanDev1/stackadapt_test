// Here we can configure our command types!

import './commands'

export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      generateEmail(baseEmail: string): Promise<string>;
      login(username: string, password: string): void;
      loginViaDB(): void;
      loginByCSRF(csrfToken: string | number | string[] | undefined, name: string, email: string, password: string): Promise<any>;
      vialoginByCSRF(csrfToken: string | number | string[] | undefined, email: string, password: string): Promise<any>;
      productTitle(): void;
    }
  }
}
 
export class EmailGenerator {
  static id = 1;
  static generate(baseEmail: string) {
    const uniqueId = `+${Math.random().toString(36).substring(2, 9)}`;;  
    return baseEmail.replace('@', `${uniqueId}@`); 
  }
}










