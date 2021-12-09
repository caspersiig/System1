import {assert, expect} from "chai"
import {cartSum} from "../controller/cartSumControl.js"
import { quantity } from "../controller/quantityControl.js"

describe("Adding two or more items to return the correct price", () => {
    const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
    it ("Should return the total sum of the cart", () => {
        const result = cartSum(cart).total;
        assert.equal(result, 157);
    })
    it("Should be more than 0 (item.pris)", () => {
        cart.forEach(item => expect(item.pris).to.be.above(0));
    })
})

describe("Checks the amount of items in the cart", () => {
    const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
    it ("Should return the quantity of the cart", () => {
        const result = cartSum(cart).quantity;
        expect(result).to.be.eq(3);
    })
    it ("Should return the length of the cart", () => {
        expect(cart).to.have.lengthOf(3);
    })
})

describe("Checks if each item has the correct amount of quantity", () => {
    it("Should return an array of the cart with the correct number of quantity", () => {
        const cart = [{imgsrc: "imgsrc", titel: "mad1", pris: 59}, {imgsrc: "imgsrc", titel: "mad1", pris: 59}, {imgsrc: "imgsrc", titel: "mad2", pris: 59}, {imgsrc: "imgsrc", titel: "mad3", pris: 59}];
        const result = quantity(cart);

        //result[0] er mad1 
        assert.equal(result[0].quantity, 2)            
    })
})

describe("Checks if cart paramters has the correct values", () => {
    const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]        
    it ("Should be an array (cart)", () => {
        expect(cart).to.be.an("array");
    })
    it("Should be an object (item)", () => {
        cart.forEach(item => expect(item).to.be.an("object"))
    })
    it("Should be an String (imgsrc)", () => {
        cart.forEach(item => expect(item.imgsrc).to.be.a("string"))
    })
    it("Should be an String (titel)", () => {
        cart.forEach(item => expect(item.titel).to.be.a("string"))
    })
    it("Should be an Number (pris)", () => {
        cart.forEach(item => expect(item.pris).to.be.a("number"))
    })
})


