// any unknown never
//
// pick
//
// interface
//
interface Obj {
  name: string;
  age: number;
}
interface IA {
  constructor: (name: string, age: number) => Obj;
}

class A {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const Tom = new A("Tom", 18);

// CI/CD

/*
 * lazyMan("tom") //bin/
 *
 * lazyMan('tom').sleep(10)
 *
 * lazyMan('tom').sleep(10).eat(); // 
 *
 * lazyMan('tom').eat().eat()
 *
 *
 */

function LazyMan() {

}

lazyMan.prototype.sleep = async function(time: number){
  (await new Promise(resovle => setTimeout(resolve, time)))();
  // setTimeout(() => {
  //   return this;
  // },time)
  return this;

}
lazyMan.prototype.eat = function(){
  return this;

}

Promse  {

}

// [].map().reduce().filter();
//
//
//
//
//
//
//
//
