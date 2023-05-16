function CodingMan(name) {
  this.name = name;

  this.queue = [];

  let fn = () => {
    console.log("Hi! this is " + " " + this.name + "!");
    this.next();
  };

  this.queue.push(fn);

  setTimeout(() => {
    this.next();
  }, 0);

  return this;
}

CodingMan.prototype = {
  eat(food) {
    let fn = () => {
      console.log("eat " + food);
      this.next();
    };

    this.queue.push(fn);
    return this;
  },

  sleep(time) {
    let fn = () => {
      setTimeout(() => {
        console.log("sleep ", time);
        this.next();
      }, time * 1000);
    };

    this.queue.push(fn);
    return this;
  },

  next() {
    let fn = this.queue.shift(0);
    fn && fn();
  },
};

new CodingMan("handk").sleep(5).eat("haksjhdka");
