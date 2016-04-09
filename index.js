#!/usr/bin/env node
'use strict';

var args = process.argv.slice(2);

var cp = require('child_process');
cp.exec('node --v8-options', function (error, stdout, stderr) {
    var lines = stdout.split('\n');
    lines = lines.filter(function (line) {
        return line.includes('--harmony');
    });
    lines = lines.map(function (line) {
        return line.trimLeft().split(' ')[0];
    });
    var cmd = 'node ' + lines.concat(args).join(' ');
    var result = cp.spawnSync('node', lines.concat(args), { stdio: 'inherit' });
    if (result.error != null) {
        console.log('failed');
    }
    process.exit(result.status);
});
