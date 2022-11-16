var AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports = ddb;