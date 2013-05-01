//steal/js nahual/promociones/scripts/compress.js

var inputDir = 'nahual/promociones.v3';
var outputDir = 'nahual/out/promociones.v3';
var resourcesToCopy = ['resources', 'resources/external'];

var stealDir = './steal';
var ignoreResources = ['.svn'];

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build(inputDir + '/scripts/build.html',{to: inputDir});

	print('Creating output at:' + outputDir);
	new steal.File(outputDir).removeDir();
	new steal.File(outputDir).mkdirs();

	print('Copying HTML, JS and CSS files in output...');
	new steal.File(inputDir + '/index.production.html').copyTo(outputDir + '/index.html');
	new steal.File(inputDir + '/production.js').copyTo(outputDir + '/production.js').remove();
	new steal.File(inputDir + '/production.css').copyTo(outputDir + '/production.css').remove();
	new steal.File(inputDir + '/CHANGELOG.txt').copyTo(outputDir + '/CHANGELOG.txt');
	
	print('Copying steal.production.js from: ' + stealDir);
	new steal.File(stealDir + '/steal.production.js').copyTo(outputDir + '/steal.production.js');

	print('Copying resources...');
	for(var i = 0; i < resourcesToCopy.length; ++i) {
		var resourceIn = inputDir + '/' + resourcesToCopy[i];
		var resourceOut = outputDir + '/' + resourcesToCopy[i];

		print('Copying ' + resourceIn + ' to ' + resourceOut); 
		new steal.File(resourceOut).mkdirs();
		new steal.File(resourceIn).copyTo(resourceOut, ignoreResources);
	}
});
