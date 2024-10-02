import {Queue} from "./Queue";

class Graph<T>{
    private connections :Map<T,T[]>
    private isDirected:boolean

    constructor(isDirected:boolean = false) {
        this.connections = new Map<T,T[]>()
        this.isDirected = isDirected
    }

    addVertex(vertex:T):void{
        if (!this.connections.has(vertex)){
            this.connections.set(vertex, [])
        }
    }

    addEdge(vertex1:T,vertex2:T):void {
            if (this.connections.has(vertex1)){
                this.addVertex(vertex1)
            }
            if (!this.connections.has(vertex2)){
                this.addVertex(vertex2)
            }

            this.connections.get(vertex1)?.push(vertex2)

            if(!this.isDirected){
                this.connections.get(vertex2)?.push(vertex1)
            }
    }

    removeEdge(vertex1: T, vertex2: T): void {
        if (this.connections.has(vertex1)) {
            this.connections.set(vertex1,
                (this.connections.get(vertex1) || []).filter(edge => edge !== vertex2)
            );
        }

        if (!this.isDirected) {
            if (this.connections.has(vertex2)) {
                this.connections.set(vertex2,
                    (this.connections.get(vertex2) || []).filter(edge => edge !== vertex1)
                );
            }
        }
    }

    getEdges(vertex:T):T[]{
        return this.connections.get(vertex)
    }

    removeVertex(vertex:T):void{
        this.connections.delete(vertex)
        this.connections.forEach((edges,vertexName)=>{
            this.connections.set(vertexName,
                edges.filter(edge => edge !== vertex))
        })
    }

    DFS(start:T,callback:(node:T)=>void,visited = new Set<T>()):void {
        if (!visited.has(start)){
            callback(start)
            visited.add(start)
            const neighbours = this.connections.get(start)||[]
            neighbours.forEach(neighbor=> this.DFS(neighbor,callback,visited))
        }
    }

    BFS(start:T,callback:(node:T)=>void):void{
        const visited = new Set<T>()
        const queue = new Queue<T>()
        queue.add(start)

        while (!queue.isEmpty()){
            const vertex = queue.poll()
            if (!visited.has(vertex)){

                callback(vertex)
                visited.add(vertex)
                const neighbours = this.connections.get(vertex) || []
                neighbours.forEach((neighbour) => {
                  if (!visited.has(neighbour)) {
                    queue.add(neighbour);
                  }
                });
            }
        }
    }

    toString():string{
        let result = '\n'
        this.connections.forEach((edges,vertex)=>{
            result += `${vertex} -> ${edges.join(', ')}\n`;
        })
        return result.trim()
    }
}

{
    const graph = new Graph<number>();

    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    test('Adding vertices', () => graph.toString(), '1 ->\n2 ->\n3 ->');

    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    test('Adding an edge', () => graph.toString(), '1 -> 2, 3\n2 -> 1\n3 -> 1');

    const dfsNodes: number[] = [];
    graph.DFS(1, (node) => dfsNodes.push(node));
    test('DFS Bypass', () => dfsNodes.join(' '), '1 2 3');

    const bfsNodes: number[] = [];
    graph.BFS(1, (node) => bfsNodes.push(node));
    test('BFS Bypass', () => bfsNodes.join(' '), '1 2 3');

    graph.removeEdge(1, 2);
    test('Edge removal', () => graph.toString(), '1 -> 3\n3 -> 1');

    graph.removeVertex(3);
    test('Vertex removal', () => graph.toString(), '1 ->\n2 ->');
}
function test(testName: string, callback: () => string, expectedValue: string) {
    const result = callback();
    const isPassed = result === expectedValue;

    const color = isPassed ? "\x1b[32m" : "\x1b[31m";
    const resetColor = "\x1b[0m";
    console.log(`Test: ${testName}`);
    console.log(
        `${color}Expected output: ${expectedValue}; Result output: ${result}${resetColor}`
    );
    console.log(`Status: ${isPassed ? "✅ Passed" : "❌ Failed"}`);
    console.log("-----------------------------------\n");
}
