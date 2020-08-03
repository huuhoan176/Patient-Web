//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// const ipfs = new IPFS({ host: '‘localhost’', port: 5001, protocol: 'http' });

//run with local daemon
// const ipfsApi = require(‘ipfs-api’);
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});

export default ipfs;