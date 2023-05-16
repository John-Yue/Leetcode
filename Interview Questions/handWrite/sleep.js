async function sleep(time) {
  // return new Promise((resolve) => {
  //   setTimeout(resolve, time);
  // });
  async function _sleep() {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
  await _sleep();
  console.log("1111");
}

// sleep(1000).then();

console.log("1");
sleep(5);
console.log("2");
