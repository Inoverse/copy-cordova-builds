#!/usr/bin/env node

//Post install script, installs the cordova hook into scripts/ directory

//Assume script is run from its root directory

//Before
// ./proj
//		/node_modules
//			/copy-cordova-builds
//				copyBuildFiles.js
//				/scripts
//					install.js
//					uninstall.js

//After
// ./proj
//		/scripts
//			copyBuildFiles.js
//		/node_modules
//			/copy-cordova-builds
//				copyBuildFiles.js

var fs = require('fs'),
	path = require('path'),
	cwd = process.cwd(), //proj directory
	scriptPath = __dirname; //node_modules/copy-cordova-builds/scripts
	
var writePath = path.join(cwd, '../../scripts');

console.log(cwd, scriptPath, writePath);

if(!fs.existsSync(writePath)) {
	console.log('Creating directory: ', writePath);
	fs.mkdirSync(writePath);
}	


var buildIncrementPath = path.join(cwd, 'copyBuildFiles.js');

var incrementFile = fs.readFileSync(buildIncrementPath);
//console.log('incrementFile: ', incrementFile)
var incrementFilePath = path.join(writePath, 'copyBuildFiles.js')

console.log('Creating hook for copy build files after build: ', incrementFilePath)
fs.writeFileSync(incrementFilePath, incrementFile); 