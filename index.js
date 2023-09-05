// index.js
// where your node app starts

const os = require('os');
const si = require('systeminformation');
const networkInterfaces = os.networkInterfaces();


for (const interfaceName in networkInterfaces) {
  console.log(`Network Interface: ${interfaceName}`);
  networkInterfaces[interfaceName].forEach((address, index) => {
    console.log(`  Address ${index + 1}:`);
    console.log(`    Family: ${address.family}`);
    console.log(`    IP Address: ${address.address}`);
    console.log(`    Internal: ${address.internal}`);
  });
  console.log('\n');
}
// console.log('Operating System Platform:', os.platform());
// console.log('Operating System Release:', os.release());

// Get a list of installed software packages
// console.log(si.system())





// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  const acceptLanguageHeader = req.headers['accept-language'];

  const ipAddress = networkInterfaces['lo'][0].address; // Replace 'eth0' with your network interface name

    const userAgent = req.get('User-Agent');

  res.json({ipaddress:ipAddress ,language:acceptLanguageHeader,software:userAgent});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
