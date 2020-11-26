const rp = require('request-promise')

const loadTest = () => {
    for(let i=0 ;i<1000; i++) {
        console.log(`Api call: ${i+1}`)
        performHeavyTask(i+1)
    }
}

const performHeavyTask = async(i) => {
    let respose = await rp({uri: 'http://localhost:3000/heavy', qs: {i}})
    console.log(`response received for call ${i} `, respose)
}

loadTest()