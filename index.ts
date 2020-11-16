import * as isReachable from 'is-reachable';
import * as fs from 'fs';
(async () => {
    // fs.readFileSync(process.
    let outFile = process.argv.pop()
    let inFile = process.argv.pop()
    let lines = fs.readFileSync(inFile).toString('utf8').trim().split('\n')
    let tryLS = []
    for (let line of lines) {
        let parts = line.split(' ')
        let ip = parts[2]
        let name = parts[3]
        // computers without a name or brother priners are not interesting
        if (name == '*' || /^BRW/.exec(name)) {
            continue
        }
        for (let port of [80, 9100]) {
            tryLS.push(`${name}:${port}`)
        }
    }
    let hostsWithMetrics = (await Promise.all(tryLS.map(async x => (await isReachable(`http://${x}/metrics`)) ? x : null))).filter(x => !!x)
    let ret = [
        {
          "labels": {
            "scraper": "dhcp"
          },
          "targets": hostsWithMetrics
        }
    ]
    fs.writeFileSync(outFile, JSON.stringify(ret))
    console.log(`Found ${hostsWithMetrics.length} hosts`) 
	//=> true
})();