var AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
var ddb = null;
if(process.env.AWS_ENDPOINT) {
    ddb = new AWS.DynamoDB({apiVersion: '2012-08-10', endpoint: new AWS.Endpoint(process.env.AWS_ENDPOINT) });
} else {
    ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
}
module.exports = ddb;