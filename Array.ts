import {algoritmTest} from "./LinkedList";

export class CustomArray<T> {
    private data: { [index: number]: T };
    public length: number;

    constructor() {
        this.data = {};
        this.length = 0;

        return new Proxy(this, {
            get(target, property) {
                const index = typeof property === 'string' ? Number(property) : undefined;
                if (!isNaN(index) && index >= 0 && index < target.length) {
                    return target.get(index);
                }
                return target[property];
            },
            set(target, property, value) {
                const index = typeof property === 'string' ? Number(property) : undefined;
                if (!isNaN(index) && index >= 0) {
                    target.set(index, value);
                    return true;
                }
                (target as any)[property] = value;
                return true;
            }
        });
    }

    private _shiftItemsLeft(index: number): void {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
    }

    set(index: number, value: T): void {
        this.data[index] = value;
        if (index >= this.length) {
            this.length = index + 1;
        }
    }

    push(element: T) {
        this.data[this.length] = element;
        this.length++;
        return this.length;
    }

    get(index: number): T | undefined {
        return this.data[index];
    }

    delete(index: number): void {
        if (index < 0 || index >= this.length) {
            return;
        }
        this._shiftItemsLeft(index);
    }

    toString(): string {
        let result = "[";
        for (let i = 0; i < this.length; i++) {
            result += this.data[i];
            if (i < this.length - 1) result += ", ";
        }
        result += "]";
        return result;
    }

    * [Symbol.iterator](): Generator<T> {
        for (let i = 0; i < this.length; i++) {
            yield this.data[i];
        }
    }
}

function linearSearch<T>(arr: T[], element: T): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return i;
        }
    }
    return -1;
}

function binarySearch<T>(arr: T[], element: T, left: number = 0, right: number = arr.length - 1): number {
    if (left > right) return -1
    const mid = Math.floor((left + right) / 2);
    const midVal = arr[mid];
    if (midVal === element) return mid;
    if (midVal < element) return binarySearch(arr, element, mid + 1, right)
    else return binarySearch(arr, element, left, mid - 1)
}

function selectionSort<T>(arr:CustomArray<T>):void{
    for (let i = 0; i < arr.length; i++) {
        let maxIndex  = i
        let j = i + 1

        for (; j < arr.length; j++) {

            if (arr[j] <= arr[maxIndex]){
                maxIndex = j;
            }
        }

        if (maxIndex !== i) {
            [arr[i],arr[maxIndex]]=[arr[maxIndex],arr[i]]
        }
    }
}

function bubbleSort<T>(arr:CustomArray<T>):CustomArray<T>{
    let isSwapped:boolean
    for (let i = 0; i < arr.length - 1; i++) {
        isSwapped = false
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]){
                isSwapped = true;
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    if (!isSwapped)break
    }
    return arr
}

function quickSort<T>(arr: CustomArray<T>): void {
    const partition = (low: number, high: number): number => {
        const pivot = arr[low];

        let left = low + 1;
        let right = high;
        while (true) {

            while (left <= high && arr[left] <= pivot) {
                left++;
            }

            while (right > low && arr[right] >= pivot) {
                right--;
            }

            if (left >= right) {
                break;
            }
            [arr[left], arr[right]] = [arr[right], arr[left]];

        }


        [arr[low], arr[right]] = [arr[right], arr[low]];
        return right;
    };

    const sort = (low: number, high: number) => {
        if (high < low) return;
        const partitionIndex = partition(low, high);
        sort(low, partitionIndex - 1);
        sort(partitionIndex + 1, high);
    };

    sort(0, arr.length - 1);
}

function heapSort<T>(arr:CustomArray<T>):void {
    const heapify = (arr:CustomArray<T>,size:number, nodeIndex:number)=>{
        let largest = nodeIndex
        const left = 2 * nodeIndex + 1
        const right = 2 * nodeIndex + 2

       if (left < size &&arr[left] > arr[largest]){
           largest = left
       }

       if (right< size && arr[right] > arr[largest]){
           largest = right
       }

       if (largest !== nodeIndex){
           [arr[nodeIndex],arr[largest]] = [arr[largest],arr[nodeIndex]]
           heapify(arr, size, largest);
       }
    }

    const sort = () =>{
        for (let i =Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            heapify(arr,arr.length,i)
        }
        for (let i = arr.length - 1; i > 0; i--) {
            [arr[0],arr[i]]=[arr[i],arr[0]]
            heapify(arr,i,0)
        }
    }
    sort()
}

function mergeSort <T>(arr:CustomArray<T>):void {

    const merge = (left:number,mid:number,right:number) => {
        const leftLength = mid - left +1
        const rightLength = right-mid
        const leftArr :T[] = []
        const rightArr:T[] = [];

        for (let i = 0; i < leftLength; i++) {
            leftArr[i] = arr[left + i]
        }

        for (let i = 0; i < rightLength; i++) {
            rightArr[i] = arr[mid + 1 + i]
        }

        let leftArrIndex = 0,
            rightArrIndex = 0,
            mainArrIndex = left

        while (leftArrIndex < leftLength && rightArrIndex < rightLength){

            if(rightArr[rightArrIndex] >= leftArr[leftArrIndex]){
                arr[mainArrIndex] = leftArr[leftArrIndex]
                leftArrIndex++
            }else {
                arr[mainArrIndex] = rightArr[rightArrIndex]
                rightArrIndex++
            }

            mainArrIndex++
        }

        while (leftArrIndex < leftLength){
            arr[mainArrIndex] = leftArr[leftArrIndex]
            leftArrIndex++
            mainArrIndex++
        }

        while (rightArrIndex < rightLength){
            arr[mainArrIndex] = rightArr[rightArrIndex]
            rightArrIndex++
            mainArrIndex++
        }
    }

    const performMergeSort = (left:number,right:number) =>{
        if (left >= right)return

       const mid = Math.floor(left + (right-left)/2)
       performMergeSort(left,mid)
       performMergeSort(mid+1,right)
       merge(left,mid,right)
   }

   performMergeSort(0,arr.length - 1)
}

{
    const arr = new CustomArray<number>();
    test(`Delete from an empty array`, () => {
        arr.delete(0);
        return arr.toString();
    }, "[]");
    arr.push(10);
    arr.push(20);
    arr.push(30);
    arr.push(40);
    arr.push(50);

    test(`Delete the first element`, () => {
        arr.delete(0);
        return arr.toString();
    }, "[20, 30, 40, 50]");

    test(`Delete the last element`, () => {
        arr.delete(arr.length - 1);
        return arr.toString();
    }, "[20, 30, 40]");

    test(`Delete a middle element`, () => {
        arr.delete(1); // Delete the element at index 1 (30)
        return arr.toString();
    }, "[20, 40]");
    test(`Delete with an index out of bounds (negative index)`, () => {
        arr.delete(-1);
        return arr.toString();
    }, "[20, 40]");

    test(`Delete with an index out of bounds (index > length)`, () => {
        arr.delete(10);
        return arr.toString();
    }, "[20, 40]");

    test(`Delete all elements one by one`, () => {
        arr.delete(0);
        arr.delete(0);
        return arr.toString();
    }, "[]");

    test(`Check state after deletions`, () => arr.toString(), "[]");
}

// {
//     const selectionSortArray = new CustomArray<number>();
//     const bubbleSortArray = new CustomArray<number>();
//     const quickSortArray = new CustomArray<number>();
//     const heapSortArray = new CustomArray<number>();
//     const mergeSortArray = new CustomArray<number>();
//
//     for (let i = 0; i < 10; i++) {
//         const randomNumber = Math.floor(Math.random() * 20001) - 10000;
//         quickSortArray.push(randomNumber);
//         bubbleSortArray.push(randomNumber);
//         selectionSortArray.push(randomNumber);
//         heapSortArray.push(randomNumber)
//         mergeSortArray.push(randomNumber)
//     }
//     console.log(quickSortArray.toString())
//     algoritmTest('Selection sort',()=>selectionSort(selectionSortArray),selectionSortArray)
//     algoritmTest('Bubble sort',()=> bubbleSort(bubbleSortArray),bubbleSortArray)
//     algoritmTest('Quick sort',()=> quickSort(quickSortArray),quickSortArray)
//     algoritmTest('Heap sort',()=> heapSort(heapSortArray),heapSortArray)
//     algoritmTest('Merge sort',()=> mergeSort(mergeSortArray),mergeSortArray)
// }
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
