let args = process.argv;

let sum = args.slice(2).reduce((first, second) => +first + +second);
console.log(sum);
