// impotere chai og mocha
//have fun
//lets gooo!

import {assert, expect} from "chai"

import {cartSum} from "../controller/cartSumControl.js"
import { quantity } from "../controller/quantityControl.js"

describe("Adding two or more items to return the correct price", () => {
    it ("Should return the total sum of the cart", () => {
        const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
        const result = cartSum(cart).total;
        assert.equal(result, 157);
    })
    //dette skal da lige fikses:) På et andet tidspunkt:))
    // it ("Should catch a TypeError", () => {
    //     const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]

    //     expect(cartSum(cart)).to.throw(Error)
    // })
})

describe("Checks the amount of items in the cart", () => {
    it ("Should return the quantity of the cart", () => {
        const cart = [{imgsrc: "imgsrc", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 59}, {imgsrc: "image.png", titel: "titel", pris: 39}]
        const result = cartSum(cart).quantity;
        expect(result).to.be.eq(3);
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


