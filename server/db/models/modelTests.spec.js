const {expect} = require('chai')
const { db, models: { LineItem, Order, Product, Review } } = require('../index')

describe ("LineItem model", () => {
  it("has defaults to quantity of 1"), async () => {
    const lineItem = await LineItem.create({})

    expect(lineItem.quantity).to.equal(1)
  }

   it("has quantity field"), async () => {
     const lineItem = await LineItem.create({
       quantity: 10
     })

     expect(lineItem.quantity).to.equal(10)
   }
})

describe ("Order model", () => {
  it("has default status of 'cart'"), async () => {
    const order = await Order.create({})

    expect(order.status).to.equal("Cart")
    expect(order.email).to.equal(null)
  }
   it("has fields status and email"), async () => {
     const order = await Order.create({
       status:"Pending",
       email: "test@test.com"
     })

     expect(order.status).to.equal("Pending")
     expect(order.email).to.equal("test@test.com")
   }
})

describe ("Product model", () => {
  it("has default status of 'cart'"), async () => {
    const order = await Order.create({})

    expect(order.status).to.equal("Cart")
    expect(order.email).to.equal(null)
  }
   it("has fields title, price, description, quantity, category, imageUrl"), async () => {
     const product = await Product.create({
       title: "Product Name",
       price: 10.00,
       description: "Product description",
       quantity: 5,
       category: "Cleanser",
     })

     expect(product.title).to.equal("Product Name")
     expect(product.price).to.equal(10.00)
     expect(product.description).to.equal("Product description")
     expect(product.quantity).to.equal(5)
     expect(product.category).to.equal("Cleanser")
   }
})
