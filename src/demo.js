process.on('message', (msg) => {
  console.log('Message from parent:', msg);
});

console.log("Child pid:" + process.pid);
let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);