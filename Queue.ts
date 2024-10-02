import {LinkedList} from "./LinkedList";

export class Queue<T>{
    private storage:LinkedList<T>;

    isEmpty(): boolean {
        return this.storage.size() === 0;
    }
    constructor() {
        this.storage = new LinkedList();
    }

    add(item:T):void {
        this.storage.add(item)
    }

    poll():T|undefined{
        if (this.isEmpty()){
            return undefined
        }
        const firstItem = this.storage.firstNode.value
        this.storage.remove(0)
        return firstItem
    }

    delete(index:number ):void{
        this.storage.remove(index)
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.storage.firstNode.value
    }
    toString(): string {
        return this.storage.toString();
    }
}
// {
//     const queue = new Queue<number>();
//
//     test("Poll from an empty queue", () => queue.poll(), undefined);
//     test("Peek from an empty queue", () => queue.peek(), undefined);
//
//     queue.add(10);
//     queue.add(20);
//     queue.add(30);
//     queue.add(40);
//
//     test("Peek at the first element (should be 10)", () => queue.peek(), 10);
//     test("Queue toString after adding elements", () => queue.toString(), "[10, 20, 30, 40]");
//
//     test("Poll the first element (should be 10)", () => queue.poll(), 10);
//     test("Peek after polling the first element", () => queue.peek(), 20);
//     test("Queue toString after polling", () => queue.toString(), "[20, 30, 40]");
//
//     test("Poll the second element (should be 20)", () => queue.poll(), 20);
//     test("Queue toString after second polling", () => queue.toString(), "[30, 40]");
//
//     test("Poll third element", () => queue.poll(), 30);
//     test("Poll fourth element", () => queue.poll(), 40);
//     test("Queue toString after polling all elements", () => queue.toString(), "[]");
//
//     test("Check if queue is empty after polling everything", () => queue.isEmpty(), true);
//
// }

function test(testName: string, callback: () => string | number | boolean | undefined, expectedValue: string | boolean |number) {
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
