describe('PropertyDetails Page', () => {
    beforeEach(() => {
      cy.visit('/property-details');
    });
  
    it('should render the page components correctly', () => {
      // Check if the header is present
      cy.get('ion-header').should('be.visible');
  
      // Check if the property image is present
      cy.get('#property-image img').should('have.attr', 'src', 'src/assets/img/rental-image.jpg');
  
      // Check if the property details are correct
      cy.get('#property-image .text-2xl').contains('Anu Home');
      cy.get('#property-image .text-gray-500').contains('No. 15, #rd Main Road, Anna Nagar, Chennai, Tamil Nadu. 600040, India');
      cy.get('#property-image').contains('Spacious Bedroom in anna nagar with modern kitchen, balcony and amenities likeswimming pool and gym.');
  
      // Check Lease Info
      cy.get('#lease-info').contains('Start Date 01/01/2023 End Date 12/31/2023');
  
      // Check Tenant Info
      cy.get('#tenant').contains('9876532145');
      cy.get('#tenant').contains('Kumar');
      cy.get('#tenant').contains('Suite 2B, Plaza Towers, %th Avenue, Ashok Nagar, Chennai');
      cy.get('#tenant').contains('Add Tenant');
  
      // Check Activity Info
      cy.get('#activity').contains('Rent for June Month Paid');
      cy.get('#activity').contains('Rent Remainder Sent to Tenant');
    });
  
    it('should handle Rent Request dialog', () => {
      // Open the Rent Request dialog
      cy.contains('Request Rent').click();
      
      // Check if the dialog content is correct
      cy.get('.p-dialog-header').contains('Rent Request');
      cy.get('.p-dialog-content').contains('Do you want to Request?');
      
      // Check Send button functionality
      cy.get('.p-dialog-footer .pi-send').click();
      cy.get('.p-dialog').should('not.exist');
  
      // Reopen the dialog and check Cancel button functionality
      cy.contains('Request Rent').click();
      cy.get('.p-dialog-footer .pi-times-circle').click();
      cy.get('.p-dialog').should('not.exist');
    });
  
    it('should handle Delete Property dialog', () => {
      // Open the Delete Property dialog
      cy.contains('Delete').click();
  
      // Check if the dialog content is correct
      cy.get('.p-dialog-header').contains('Delete Property');
      cy.get('.p-dialog-content').contains('Do you want to Delete this Property?');
  
      // Check Delete button functionality
      cy.get('.p-dialog-footer .pi-trash').click();
      cy.get('.p-dialog').should('not.exist');
  
      // Reopen the dialog and check Cancel button functionality
      cy.contains('Delete').click();
      cy.get('.p-dialog-footer .pi-times-circle').click();
      cy.get('.p-dialog').should('not.exist');
    });
  
    it('should handle navigation in footer tabs', () => {
      // Check navigation to Home
      cy.get('ion-tab-button[tab="home"]').click();
      cy.url().should('include', '/home');
  
      // Check navigation to Property Details
      cy.get('ion-tab-button[tab="property"]').click();
      cy.url().should('include', '/property-details');
  
      // Check navigation to History
      cy.get('ion-tab-button[tab="history"]').click();
      cy.url().should('include', '/history');
  
      // Check navigation to Profile
      cy.get('ion-tab-button[tab="profile"]').click();
      cy.url().should('include', '/profile');
    });
  });
  