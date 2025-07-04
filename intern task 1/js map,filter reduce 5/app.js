const numbers = [9,8,7,6,5,4,3,2,1];


const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled); 


const evens = doubled.filter(num => num % 2 === 0);
console.log("Filter (Even Numbers):", evens); 


const sum = evens.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of Even Number :", sum); 
