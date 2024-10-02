class CustomObject<T> {
    private keys:string[] = []
    private values: T[] = []

    addField(key:string, value:T): void {
        const index = this.keys.indexOf(key)
        if (index === -1) {
            this.keys.push(key)
            this.values.push(value)
        }else {
            this.values[index] = value
        }
    }
    removeField(key:string): void {
        const index = this.keys.indexOf(key)
        if (index !== -1) {
            this.keys.splice(index,1)
            this.values.splice(index,1)
        }
    }

    getField(key:string): T|undefined {
        const index = this.keys.indexOf(key)
        return  (index !== -1) ? this.values[index]:undefined
    }

    [Symbol.iterator](): Iterator<[string,T]> {
        let index = 0
        const keys = this.keys
        const values = this.values
        return {
          next(): IteratorResult<[string, T]> {
              if (index<keys.length){
                  const result:[string,T] = [keys[index],values[index]]
                  index++
                  return {value:result,done:false}
              }else {
                  return {value:undefined,done:true}
              }
          }
        };
    }

}
{
    const obj = new CustomObject<number>();

    obj.addField('id', 1);
    obj.addField('age', 30);

    console.log(obj.getField('id'));   // 1
    console.log(obj.getField('age'));  // 30


    obj.removeField('age');
    console.log(obj.getField('age'));// undefined


}
