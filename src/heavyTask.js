
exports.heavyTask = () => {
    for(let i=0; i<5000000000; i++) {

    }
    console.log(`heavy task done`)
    return true
}

exports.heavyTaskProcess = () => {
    process.on('message', () => {
        for(let i=0; i<5000000000; i++) {}
        process.send({message: true})
    })
}
