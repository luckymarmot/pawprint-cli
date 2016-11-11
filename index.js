#!/usr/bin/env node

var cmd = require('commander');
var fs = require('fs');
var process = require('process');
var parser = require('curl-trace-parser');
var request = require('request');
var chalk = require('chalk');
var log = console.log;

var logPawprintCreation = function(pawprintData) {
  log('')
  log(chalk.green.bold('  ✓ Pawprint Created'));
  log(chalk.gray('    Share Link: ') + chalk.underline(pawprintData.public_link));
  log('')
  log(chalk.gray('    Embed as an iframe:'))
  log('    <iframe src="' + pawprintData.embed_link + '"></iframe>')
  log('')
  log(chalk.gray('    To delete this Pawprint'))
  log('    curl -X DELETE ' + pawprintData.delete_link)
};

var logError = function(errorMessage) {
  log('')
  log(chalk.red.bold('  𐄂 Error'))
  var lines = errorMessage.split('\n')
  for (var i = 0; i < lines.length; i++) {
    log(chalk.red('    ' + lines[i]))
  }
}

var createPawprint = function(httpRequest, httpResponse, isPrivate) {
  var isPublic = true;
  if (isPrivate === true) {
    isPublic = false;
  }
  request({
    uri: 'http://localluckymarmot.com:8000/api/v3/pawprints/',
    method: 'POST',
    json: {
      'name':'curl trace',
      'raw_http_file':{
        'http_request':httpRequest,
        'http_response':httpResponse
      },
      'public':isPublic,
    }
  }, (error, response, body) => {
    if (!error && response.statusCode >= 200 && response.statusCode < 300) {
      logPawprintCreation(body);
      return;
    }
    logError('Cannot create Pawprint, an error occured with the Pawprint API.')
  })
};

cmd.description('Utility tool to create and manage Pawprints HTTP traces.') 
   .version('1.0.0')
   .option('-p, --private', 'Create a private Pawprint')
   .parse(process.argv);

process.stdin.resume();
process.stdin.setEncoding('utf8');

var trace = '';

process.stdin.on('data', (chunk) => {
  trace += chunk;
});

process.stdin.on('end', () => {
  var p = parser.parse(trace);
  if (typeof p.request !== 'string' || typeof p.response !== 'string' ||
      p.request === '' || p.response === '') {
    logError('Invalid curl trace.\n' +
             'Try: curl --trace - http://httpbin.org/get | pawpt\n' +
             'Note that --trace should be followed by a dash (--trace -)')
    return;
  }
  createPawprint(p.request, p.response, cmd.private);
});
