import {Stack} from "./Stack";
import {Queue} from "./Queue";

class TreeNode<T> {
    value: T;
    left:TreeNode<T>
    right:TreeNode<T>
    constructor(value: T) {
        this.value = value
        this.left = null
        this.right = null
    }
}

type orderType = 'preOrder'|'inOrder'|'postOrder';

class BinaryTree<T> {
    public root:TreeNode<T>


    constructor() {
        this.root = null
    }

    private _removeNode(node: TreeNode<T>, value: T): TreeNode<T> | null{
        if (!node){
            return null;
        }
        if (value<node.value){
            node.left = this._removeNode(node.left,value)
        }else if(value > node.value){
            node.right = this._removeNode(node.right,value)
        }else {
            if(!node.left && !node.right){
                return null
            }else if(!node.left){
                return node.right
            }else if(!node.right){
                return node.left
            }else {
                const minNode = this._findMin(node.right)
                node.value = minNode.value
                node.right = this._removeNode(node.right,minNode.value)
            }
        }
        return node
    }

    private _findMin(node: TreeNode<T>): TreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    private _searchNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) {
            return null;
        }
        if (value < node.value){
            return this._searchNode(node.left, value)
        }else if(value > node.value){
            return this._searchNode(node.right,value)
        }else {
            return node
        }

    }

    add(value: T) {
        const newNode = new TreeNode(value)
        if (!this.root){
            this.root = newNode
            return
        }
        let currentNode = this.root
        while (currentNode) {
            if (value < currentNode.value) {
                if (!currentNode.left){
                    currentNode.left = newNode
                    return;
                }
                currentNode = currentNode.left
            }else{
                if (!currentNode.right){
                    currentNode.right = newNode
                    return;
                }
                currentNode = currentNode.right
            }
        }
    }

    remove(value: T):void {
        this._removeNode(this.root, value);
    }

    search(value:T):TreeNode<T>|null{
        return this._searchNode(this.root, value);
    }

    preOrder(node:TreeNode<T>,callback: (value: TreeNode<T>) => void){
        const stack = new Stack<TreeNode<T>>();
        if (node){
            stack.push(node);
        }
        while (!stack.isEmpty()){
            const currentNode = stack.pop()
            if (currentNode) {
                callback(currentNode)

                if (currentNode.right){
                   stack.push(currentNode.right)
                }
                if (currentNode.left){
                    stack.push(currentNode.left)
                }
            }

        }

    }

    inOrder(node:TreeNode<T>,callback: (value: TreeNode<T>) => void){
        if (!node){
            return
        }

        this.inOrder(node.left,callback)

        if (callback){
            callback(node)
        }
        this.inOrder(node.right,callback)
    }

    postOrder(node:TreeNode<T>,callback: (value: TreeNode<T>) => void){
        if (!node){
            return
        }

        this.postOrder(node.left,callback)
        this.postOrder(node.right,callback)

        if (callback){
            callback(node)
        }
    }

    DFS(callback: (value: TreeNode<T>) => void,method:orderType = 'postOrder') {
        if (method === 'preOrder'){
           return  this.preOrder(this.root,callback)
        }
        if (method === 'inOrder'){
            return this.inOrder(this.root,callback)
        }
            return this.postOrder(this.root,callback)

    }

    BFS(callback: (value: TreeNode<T>) => void){
        const queue = new Queue<TreeNode<T>>()
        queue.add(this.root)
        while (!queue.isEmpty()){
            const node = queue.poll()
            callback(node)
            if (node.left){
                queue.add(node.left)
            }
            if (node.right) {
                queue.add(node.right)
            }
        }
    }
}

const myTree  = new BinaryTree()
myTree.add(7)
myTree.add(2)
myTree.add(6)
myTree.add(1)
myTree.add(33)
myTree.add(11)
myTree.add(5)

//             7
//     2              33
// 1        6     11
//       5

// 7 2 1 6 5 33 11
// console.log('--------preOrder---------')
//
// myTree.DFS((node)=>{
//     console.log(node.value)
// },'preOrder')
// console.log('--------inOrder---------')
// myTree.DFS((node)=>{
//     console.log(node.value)
// },'inOrder')
// console.log('--------postOrder--------')
// myTree.DFS((node)=>{
//     console.log(node.value)
// },'postOrder')
// console.log('--------BFS--------')
//
// myTree.BFS((node)=>{
//     console.log(node.value)
// })

// console.log("Node removal 1(sheet):");
// myTree.remove(1);
// myTree.DFS((node) => console.log(node.value), 'inOrder');
//
// // Удаление узла с одним ребенком (узел 6)
// console.log("Removal of node 6 (node with one child):");
// myTree.remove(6);
// myTree.DFS((node) => console.log(node.value), 'inOrder');
//
// // Удаление узла с двумя детьми (узел 2)
// console.log("Removal of node 2 (node with two children):");
// myTree.remove(2);
// myTree.DFS((node) => console.log(node.value), 'inOrder');
//
// // Удаление корня (узел 7)
// console.log("Root removal (node 7):");
// myTree.remove(7);
// myTree.DFS((node) => console.log(node.value), 'inOrder');
//
// // Попытка удаления несуществующего узла
// console.log("Attempting to delete a nonexistent node:");
// myTree.remove(100);
// myTree.DFS((node) => console.log(node.value), 'inOrder');
console.log('------------------------')
const searchResult = myTree.search(6);

console.log(searchResult ? `Найден узел: ${searchResult.value}` : 'Узел не найден'); // Должно вывести: Найден узел: 7
console.log(searchResult);
