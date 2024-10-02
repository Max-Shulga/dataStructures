import {CustomArray} from "./Array";

class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev:ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  firstNode: ListNode<T> | null = null;
  lastNode: ListNode<T> | null = null;
  listSize: number = 0;

  toString(): string {
    if (this.listSize === 0) {
      return "[]";
    }

    let result = `[`;
    let currentNode = this.firstNode;
    for (let i = 0; i < this.listSize; i++) {
      result += `${currentNode?.value}`;
      currentNode = currentNode.next;
      if (i < this.listSize - 1) {
        result += ", ";
      }
    }
    result += "]";
    return result;
  }

  private _createNode(value: T): ListNode<T> {
    return new ListNode(value);
  }

  private _checkIndex(index: number): void {
    if (index < 0 || index >= this.listSize) {
      throw new RangeError("Index out of range");
    }
  }

  private _getNodeAtIndex(index: number): ListNode<T> {
    this._checkIndex(index);
    let current: ListNode<T> | null;
    if (index < this.listSize / 2) {
      current = this.firstNode;
      for (let i = 0; i < index; i++) {
        current = current?.next;
      }
    } else {
      current = this.lastNode;
      for (let i = this.listSize - 1; i > index; i--) {
        current = current?.prev;
      }
    }
    return current;
  }

  constructor() {}

  add(element: T): void {
    const newNode = this._createNode(element);
    if (this.listSize === 0) {
      this.firstNode = this.lastNode = newNode;
    } else {
      if (this.lastNode) {
        this.lastNode!.next = newNode;
        newNode.prev = this.lastNode;
        this.lastNode = newNode;
      }
    }
    this.listSize++;
  }

  set(element: T, index: number) {
    this._checkIndex(index);
    let current: ListNode<T> | null= this._getNodeAtIndex(index)

    if (current) {
      current.value = element;
    }
  }

  addAll(...elements: T[]): void {
    elements.forEach((element) => this.add(element));
  }

  size(): number {
    return this.listSize;
  }

  get(index: number): T {
    this._checkIndex(index);
    const current = this._getNodeAtIndex(index);

    if (!current) {
      throw new Error("Node not found");
    }

    return current?.value;
  }

  remove(index: number): void {
    this._checkIndex(index);

    const current = this._getNodeAtIndex(index);
    let prevNode: ListNode<T> | null = current.prev;
    let nextNode: ListNode<T> | null = current.next;

    if (prevNode) {
      prevNode.next = nextNode;
    } else {
      this.firstNode = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    } else {
      this.lastNode = prevNode;
    }

    this.listSize--;
  }

  linearSearch(element: T): number {
    let current = this.firstNode;
    let index = 0;
    while (current) {
      if (current.value === element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  binarySearch(element: T): number {
    if (this.listSize === 0) return -1;
    let left = 0;
    let right = this.listSize - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      const midValue = this.get(mid);

      if (midValue === element) {
        return mid;
      }

      if (midValue < element) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  selectionSort() {
    if (this.listSize < 2) return;
    let currentNode = this.firstNode;

    for (let i = 0; i < this.listSize - 1 && currentNode; i++) {
      let minNode = currentNode;
      let compareNode = currentNode.next;

      while (compareNode) {
        if (compareNode.value < minNode.value) {
          minNode = compareNode;
        }
        compareNode = compareNode.next;
      }
      if (minNode !== currentNode) {
        [currentNode.value, minNode.value] = [minNode.value, currentNode.value];
      }
      currentNode = currentNode.next;
    }
  }

  bubbleSort() {
    if (this.listSize < 2) {
      return;
    }
    let isSwapped: boolean;
    for (let i = 0; i < this.listSize - 1; i++) {
      isSwapped = false;
      let currentNode: ListNode<T> | null = this.firstNode;

      for (let j = 0; j < this.listSize - 1 - i; j++) {
        if (currentNode && currentNode.next) {
          let nextNode = currentNode.next;

          if (currentNode.value > nextNode.value) {
            [currentNode.value, nextNode.value] = [
              nextNode.value,
              currentNode.value,
            ];
            isSwapped = true;
          }

          currentNode = currentNode.next;
        }
      }

      if (!isSwapped) break;
    }
  }

  quickSort() {
    const partition = (low: number, high: number): number => {
      const lowNode = this._getNodeAtIndex(low)
      const pivot = lowNode.value
      let left = low + 1
      let right = high
      let leftNode = this._getNodeAtIndex(left);
      let rightNode = this._getNodeAtIndex(right);
      while (left <= right){
        while (leftNode && leftNode.value <= pivot) {
          left++
          leftNode = leftNode.next
        }

        while (rightNode.value > pivot){
          right--
          rightNode = rightNode.prev;
        }

        if(left < right){
          [leftNode.value,rightNode.value] = [rightNode.value, leftNode.value];
        }
      }

      [lowNode.value, rightNode.value] = [rightNode.value, lowNode.value];
      return right
    };

    const sort = (low:number,high:number) =>{
      if (high <= low) return ;
      const partitionIndex  = partition(low,high)
      sort(low,partitionIndex -1)
      sort(partitionIndex  + 1, high )
    }
    sort(0,this.listSize-1)
  }

  quickSortWithStartPivot(pivotIndex?: number) {
    const portition = (low: number, high: number): number => {
      let lowNode = this._getNodeAtIndex(low)
      let pivot = lowNode.value
      let left = low + 1
      let right = high
      let leftNode = this._getNodeAtIndex(left);
      let rightNode = this._getNodeAtIndex(right);
      while (left <= right){

        while (leftNode && leftNode.value<=pivot) {
          left++
          leftNode = leftNode.next
        }

        while (rightNode.value > pivot){
          right--
          rightNode = rightNode.prev;
        }

        if(left < right){
          [leftNode.value,rightNode.value] = [rightNode.value, leftNode.value];
        }
      }

      [lowNode.value, rightNode.value] = [rightNode.value, lowNode.value];
      return right
    };

    const sort = (low:number,high:number) =>{
      if (high <= low) return ;
      let partitionIndex  = portition(low,high)
      sort(low,partitionIndex -1)
      sort(partitionIndex  + 1, high )
    }
    sort(pivotIndex,this.listSize-1)
  }

  heapSort(){
    const heapify = (size:number, rootIndex:number):void =>{
      let largest = rootIndex;
      const leftIndex =  2 * rootIndex + 1
      const rightIndex = 2 * rootIndex + 2

      const largestNode = this._getNodeAtIndex(largest);
      const leftNode = leftIndex < size? this._getNodeAtIndex(leftIndex) : null;
      const rightNode =  rightIndex < size ? this._getNodeAtIndex(rightIndex) : null;

       if(leftNode && leftNode.value > largestNode.value){
         largest = leftIndex
       }

       if(rightNode && rightNode.value > this._getNodeAtIndex(largest).value){
         largest = rightIndex

       }

       if (largest !== rootIndex){
         const newLargestNode = this._getNodeAtIndex(largest);

         [largestNode.value,newLargestNode.value] = [newLargestNode.value,largestNode.value]
         heapify(size,largest)
       }
    }

    const performHeapSort  = () => {
      const size = this.listSize
      for (let i =  Math.floor(size / 2) - 1; i >=0 ; i--) {
        heapify(size,i)
      }

      for (let i = size - 1; i > 0 ; i--) {

        const rootNode  = this._getNodeAtIndex(0);
        const lastNode  = this._getNodeAtIndex(i);

        [rootNode.value,lastNode.value]=[lastNode.value,rootNode.value]

        heapify(i,0)
      }
    }
    performHeapSort ()
  }

  mergeSort(){
    const getMiddle = (node: ListNode<T>): ListNode<T> =>{
      let slow = node
      let fast = node

      while (fast.next&& fast.next.next){
        slow = slow.next
        fast = fast.next.next
      }
      return slow
    }

    const merge=(left:ListNode<T>,right:ListNode<T>):ListNode<T>  => {
      if (!left) return right
      if (!right) return left

      if (left.value < right.value) {
        left.next = merge(left.next,right)
        return left
      }else {
        right.next = merge(left,right.next)
        return right
      }
    }

    const performMergeSort = (node:ListNode<T>|null):ListNode<T>|null =>{
      if(!node || !node.next) return node

      const middle = getMiddle(node)
      const rightHalf = middle.next
      middle.next = null

      const leftSorted = performMergeSort(node)
      const rightSorted = performMergeSort(rightHalf)

      return merge(leftSorted,rightSorted)
    }
    this.firstNode = performMergeSort(this.firstNode);
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.firstNode;
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value;
          current = current.next;
          return { done: false, value };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}

// {
//   const list = new LinkedList<number>();
//   list.add(10);
//   list.add(20);
//   list.add(30);
//   test(`.add method test`, () => list.toString(), "[10, 20, 30]");
//
//   list.addAll(40, 50,33, 60);
//   test(
//     `.addAll method test`,
//     () => list.toString(),
//     "[10, 20, 30, 40, 50, 60]",
//   );
//
//   test(`.get method test`, () => list.get(0).toString(), "10");
//   test(`.get method test`, () => list.get(2).toString(), "30");
//   console.log(list.toString())
//   test(`.get method test`, () => list.get(3).toString(), "60");
//   test(`.size method test`, () => list.size().toString(), "6");
//   list.set(100, 1);
//   test(`.set method test`, () => list.toString(), "[10, 100, 30, 40, 50, 60]");
//   list.set(999, 0);
//   test(
//     `.set first index method test`,
//     () => list.toString(),
//     "[999, 100, 30, 40, 50, 60]",
//   );
//
//   list.set(765, list.size() - 1);
//   test(
//     `.set last index method test`,
//     () => list.toString(),
//     "[999, 100, 30, 40, 50, 765]",
//   );
//   list.remove(1);
//   test(`.remove method test`, () => list.toString(), "[999, 30, 40, 50, 765]");
//   list.remove(0);
//   test(
//     `.remove first index method test`,
//     () => list.toString(),
//     "[30, 40, 50, 765]",
//   );
//   list.remove(list.size() - 1);
//   test(`.remove last index method test`, () => list.toString(), "[30, 40, 50]");
// }

{
  const quickSortList = new LinkedList<number>();
  const bubbleSortList = new LinkedList<number>();
  const selectionSortList = new LinkedList<number>();
  const heapSortList = new LinkedList<number>();
  const mergeSortList = new LinkedList<number>();

  for (let i = 0; i < 10000; i++) {
    const randomNumber = Math.floor(Math.random() * 20001) - 100000;
    quickSortList.add(randomNumber);
    bubbleSortList.add(randomNumber);
    selectionSortList.add(randomNumber);
    heapSortList.add(randomNumber)
    mergeSortList.add(randomNumber)
  }

  // console.log(`Original array: ${quickSortList}`)
  algoritmTest('Selection sort',selectionSortList.bubbleSort.bind(selectionSortList),selectionSortList)
  algoritmTest('Bubble sort',bubbleSortList.bubbleSort.bind(bubbleSortList),bubbleSortList)
  algoritmTest('Quick sort',quickSortList.quickSort.bind(quickSortList),quickSortList)
  algoritmTest('Heap sort',heapSortList.heapSort.bind(heapSortList),heapSortList)
  algoritmTest('Merge sort',mergeSortList.mergeSort.bind(mergeSortList),mergeSortList)
}

export function algoritmTest<T>(name:string, callback:()=>void,list:LinkedList<T> | CustomArray<T>) {
  const startTime = performance.now();
  callback()
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  const color = "\x1b[32m"
  const resetColor = "\x1b[0m";
  console.log(`${color}${name}${resetColor}, execution time: ${color}${elapsedTime.toFixed(2)} ${resetColor}milliseconds`);
  // console.log(`result:${list}`)
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


