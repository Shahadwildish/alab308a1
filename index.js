// Stack Overflow
let counter = 0;

function recursiveFunction() {
    counter++;
    recursiveFunction();
}

try {
    recursiveFunction();
} catch (error) {
    console.log(`Stack overflow at recursion depth: ${counter}`);
    console.error('Error:', error);
}

//  Trampolines

// Recursive function to flatten nested arrays
function flattenArray(arr) {
    return arr.reduce((acc, item) => {
        return Array.isArray(item) ? acc.concat(flattenArray(item)) : acc.concat(item);
    }, []);
}

// Trampoline function to handle deep recursion
function trampoline(fn) {
    let result = fn;
    while (typeof result === 'function') {
        result = result();
    }
    return result;
}

// Example usage
const nestedArray = [1, [2, [3, [4, [5]]]]];
const flattened = trampoline(() => () => flattenArray(nestedArray));
console.log(flattened);

// Part 3: Deferred Execution

// Cache the HTML element
const resultElement = document.getElementById('result');

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// find and display prime numbers with deferred execution
function displayPrimes(n) {
    let current = 2;
    function findNextPrime() {
        if (current <= n) {
            if (isPrime(current)) {
                resultElement.textContent += `${current} `;
            }
            current++;
            setTimeout(findNextPrime, 0); // Schedule the next call
        } else {
            alert('Calculation finished!');
        }
    }
    findNextPrime();
}

displayPrimes(10000);
