process.on('message', ({loopCount, indexVal}) => {
    console.log("loop running")
    for(let i=0; i<loopCount; i++) {}
    console.log("loop done")
    process.send({indexVal})
})


// process.on('message', ({ letter }) => {
//     for(let i=0; i<50; i++) {}; // ARTIFICIAL CPU INTENSIVE
//   let fruit = null;
//   switch (letter) {
//     case 'a':
//       fruit = 'apple';
//       break;
//     default:
//       fruit = 'unknown';
//   }
//   process.send({ fruit });
// });