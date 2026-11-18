const readLine = require("readline")

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

function calc(a, b, c){
    let d = (b * b) - ( 4 * a * c )
    let x_1 = (- b + Math.sqrt(d)) / (2 * a)
    let x_2 = (- b - Math.sqrt(d)) / (2 * a)

    console.log(`${a} x ^ 2 + ${b} x + ${c}`)
    console.log(`root 1: ${x_1}`)
    console.log(`root 2: ${x_2}`)

}

rl.question("Please enter the value of a: ", function(a){
    
    rl.question("Please enter the value of b: ", function(b){
        rl.question("Please enter the value of c: ", function(c){
            // calc(a,b,c)
            let d = (b * b) - ( 4 * a * c )
    let x_1 = (- b + Math.sqrt(d)) / (2 * a)
    let x_2 = (- b - Math.sqrt(d)) / (2 * a)

    console.log(`${a} x ^ 2 + ${b} x + ${c}`)
    console.log(`root 1: ${x_1}`)
    console.log(`root 2: ${x_2}`)
        })
    })
  
})

// console.log(a)
