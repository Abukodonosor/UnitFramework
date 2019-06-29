
class Men {}
export class Person {
    static #is(obj) {
      return obj instanceof Person;
    }
  
    constructor(name) {
      if (Person.#is(name)) {
        throw "It is already a person!";
      }
    }
  }
  
export function DjokaTeskt(){
    console.log("AA");
    debugger
    var x = [1,2,3]
    var res = 0;
    res = x.reduce( (acumulator, value) => acumulator + value*2, res )
    console.log(res)
}