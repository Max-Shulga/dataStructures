import {CustomArray} from "./Array";

export class Stack<T>{
    private storage:CustomArray<T>

    constructor(){
        this.storage = new CustomArray()
    }

    push(item: T):void{
        this.storage.push(item)
    }

    isEmpty():boolean{
        return this.storage.length === 0
    }

    delete(index:number):void{
        this.storage.delete(index)
    }

    pop():T|undefined{
        if (this.isEmpty()){
            return undefined
        }
        const lastIndex = this.storage.length - 1
        const item = this.storage.get(lastIndex)
        this.storage.delete(lastIndex)
        return item
    }

    peek():T|undefined{
        if (this.isEmpty()){
            return undefined
        }
        return this.storage.get(this.storage.length - 1);
    }
    size():number{
        return this.storage.length
    }
    toString(): string {
        return this.storage.toString();
    }
}

{
    const stack = new Stack<number>();

    test(`Pop from an empty stack`, () => {
        const popped = stack.pop();
        return popped === undefined ? "undefined" : popped.toString();
    }, "undefined");

    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    stack.push(50);

    test(`Push elements to the stack`, () => stack.size().toString(), "5");

    test(`Peek at the top element`, () => {
        const peeked = stack.peek();
        return peeked === undefined ? "undefined" : peeked.toString();
    }, "50");

    test(`Pop the top element`, () => {
        const popped = stack.pop();
        return popped === undefined ? "undefined" : popped.toString();
    }, "50");

    test(`Peek after popping top element`, () => {
        const peeked = stack.peek();
        return peeked === undefined ? "undefined" : peeked.toString();
    }, "40");

    test(`Pop all elements one by one`, () => {
        stack.pop();
        stack.pop();
        stack.pop();
        const poppedLast = stack.pop();
        return poppedLast === undefined ? "undefined" : poppedLast.toString();
    }, "10");

    test(`Pop from an empty stack after clearing all elements`, () => {
        const popped = stack.pop();
        return popped === undefined ? "undefined" : popped.toString();
    }, "undefined");

    test(`Check stack size after all pops`, () => stack.size().toString(), "0");

    test(`Check isEmpty on an empty stack`, () => stack.isEmpty().toString(), "true");

    // Refill the stack to test multiple pushes and pops
    stack.push(100);
    stack.push(200);
    stack.push(300);

    test(`Check stack size after refilling`, () => stack.size().toString(), "3");

    test(`Peek the top after refilling`, () => {
        const peeked = stack.peek();
        return peeked === undefined ? "undefined" : peeked.toString();
    }, "300");

    test(`Pop all elements again`, () => {
        stack.pop();
        stack.pop();
        const lastPopped = stack.pop();
        return lastPopped === undefined ? "undefined" : lastPopped.toString();
    }, "100");

    test(`Check stack size after popping all again`, () => stack.size().toString(), "0");
}

function test(testName: string, callback: () => string, expectedValue: string) {
    const result = callback();
    const isPassed = result === expectedValue;

    const color = isPassed ? "\x1b[32m" : "\x1b[31m";
    const resetColor = "\x1b[0m";
    console.log(`Test: ${testName}`);
    console.log(
        `${color}Expected output: ${expectedValue}; Result output: ${result}${resetColor}`,
    );
    console.log(`Status: ${isPassed ? "✅ Passed" : "❌ Failed"}`);
    console.log("-----------------------------------\n");
}

