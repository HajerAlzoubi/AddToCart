/// <reference types= "cypress" />

Cypress.on('uncaught:exception',(err,runnable)=>{
  return false  //if run find code error ignore it plz
})


describe("Add random items from certian category", () => {
  it("Add random item from Women or Men", () => {
    cy.visit("https://magento.softwaretestingboard.com/");
    //cy.contains('Women').click() this is looking for word Women and click on it

    //add items to array to select from it randomly based on randomindex
    let ItemsToSelect = ["Women", "Gear"];
    let RandomIndex = Math.floor(Math.random() * ItemsToSelect.length);

    // cy.log(RandomIndex);  //to print result in cypress log
    
    cy.contains(ItemsToSelect[RandomIndex]).click();  // to select Women or Gear

    // select random item under main menu
    //cy.get('.products-grid.grid') to select main grid which is contains element
    // find('.product-item-info') find the element under grid

    let randomitemtoselect = Math.floor(Math.random() * 4); //4 because 4 items in this grid
    let randomsize = Math.floor(Math.random() * 5); // 5 sizes exist
    let randomcolor = Math.floor(Math.random() * 3); // 3 colors exist
    cy.get(".products-grid.grid").find(".product-item-info").eq(randomitemtoselect).click();

    if (RandomIndex == 0) { //select Women
      //Assertion
      //cy.get('.stock > span').invoke('text').should('contain',"In") //1 Assertion to check in stock
      cy.get('.stock > span').invoke('text').then((StockValue) => {  //2 assertion to check in stock
        if (StockValue == "In stock") {

          cy.get(".swatch-attribute.size").find(".swatch-option.text").eq(randomsize).click(); //select size
          cy.get(".swatch-option.color").eq(randomcolor).click(); //select color

          cy.get(".fieldset > .actions").click(); // add to cart
        }
        else{
          alert("sorry out of stock") //msg if out of stock
        }
      })

      
    } 
    else { //select Gear
      cy.get(".fieldset > .actions").click(); // add to cart
    }

    });

  });
