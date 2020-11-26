const router = require('express').Router()
const { fork } = require('child_process');
const { jsonToCsv, syncForLoop, promisifiedForLoop } = require('./utils')
const { heavyTask, heavyTaskProcess } = require('./heavyTask')

const {sendMail} = require('./utils/email')

router.get('/easy', (req,res) => {
    return res.json({success: true})
})

router.get('/heavy', (req, res) => {
    let { i } = req.query
    console.log('inside heavy route')
    const worker = fork('./src/worker')
    worker.on('message', (retVal) => {
        console.log(`return valye form heavy task ${i}: `, retVal)
        worker.kill()
        return res.json(retVal)
    })
    worker.send({loopCount: 50000000, indexVal: i})
})


const keys = ["id", "claimId", "coverageId", "subCoverageId", "amount", "requestConfigId", "requestStatusId", "nextPendingStatusId", "reissuedRequest", "dfsRequest", "isFinal", "isLetterRequired", "displayOnPaid", "onHold", "onHoldComment", "holdByRoleId", "isOpen", "lastOpenTime", "openedBy", "checkMemo", "description", "isLocked", "isApproved", "invoiceNumber", "checkNumber", "checkIssueDate", "referenceId", "createdBy", "updatedBy", "created_at", "updated_at", "statusText", "paymentId", "partyAddress", "address1", "address2", "city", "state", "zip", "claimNumber", "policyNumber", "insuredName", "sponsorOrgId", "product", "company", "action", "coverageText", "subCoverageText", "isExpense",
"mmmd", "clammmmmmmd", "coveragemmmd", "subCoveragemmmd", "requestConfmmmgmmmd", "requestStatusmmmd", "nextPendmmmngStatusmmmd", "remmmssuedRequest", "mmmsFmmmnal", "mmmsLetterReqummmred", "dmmmsplayOnPammmd", "holdByRolemmmd", "mmmsOpen", "lastOpenTmmmme", "openedBy", "checkMemo", "descrmmmptmmmon", "mmmsLocked", "mmmsApproved", "mmmnvommmceNumber", "checkmmmssueDate", "referencemmmd", "paymentmmmd", "cmmmty", "state", "zmmmp", "clammmmNumber", "polmmmcyNumber", "mmmnsuredName", "sponsorOrgmmmd", "actmmmon", "mmmsExpense"] 

router.get('/csv', async(req, res, next) => {
	const {type} = req.query
	let jsonArr = require('./test/dummyJson.json')
    let csv = jsonToCsv(jsonArr, keys)
	console.log({csv})
	if(type == 'download') {
		res.setHeader('Content-Type', 'text/csv');
		res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
		return res.send(csv)
	}

	if(type == 'email') {
		let mailResp = await sendMail({
			sendTo: 'prashantprabhakar123@gmail.com',
			subject:'csv testing xjhshd',
			emailMessage: 'Test msg sdklcnsdnc',
			attachments: [{
				filename: 'test.csv',
				contentType: 'text/plain',
				content: csv
			}],
		})
		return res.json(mailResp)
	}

	else return res.json({success: true, csv})

})


router.get('/loop', async(req,res) => {
	let {type, times=1} = req.query
	let sums = []
	if(type == 'sync') {
		console.time('Sync looop started')
		for(let i=0; i<times; i++) {
			let sum = syncForLoop(i+1)
			sums.push(sum)
		}
		console.timeEnd('Sync looop started')
	} else {
		console.time('Promisified looop started')
		let sumsPromise = []
		for(let i=0; i<times; i++) {
			let sum = promisifiedForLoop(i+1)
			sumsPromise.push(sum)
		}

		sums = await Promise.all(sumsPromise)
		console.timeEnd('Promisified looop started')
	}
	return res.json({ success: true, sums })
})

module.exports = router