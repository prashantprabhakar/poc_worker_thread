const {Parser} = require('json2csv');
const csvjson = require('csvjson');
const fs = require('fs')
const Papa = require('papaparse')

exports.jsonToCsv = (jsonArr, fields) => {

    return Papa.unparse(jsonArr, {
        columns: fields
    })

    //return new Parser({ fields }).parse(jsonArr);

    // using csvjson

    // const data =  csvjson.toCSV(jsonArr, {
    //     headers: 'key'
    // });

    //    fs.writeFileSync('data.csv', data)
    // return data
}


exports.syncForLoop = (loopId, maxCount=5000) => {
    let sum = 0
    console.log(`Processing sync loop id: ${loopId}`)
    for(let i=0; i<maxCount; i++) {
        // do nothing
        sum += i
    }
    console.log(`Processed sync loop id: ${loopId} & sum: ${sum}`)
    return sum
}

exports.promisifiedForLoop = (loopId, maxCount=5000) => {
    return new Promise(resolve => {
        let sum = 0
        console.log(`Processing promisified loop id: ${loopId}`)
        for(let i=0; i<maxCount; i++) {
            // do nothing
            sum += i
        }
        console.log(`Processed promisified loop id: ${loopId} & sum: ${sum}`)
        resolve(sum)
    })
}