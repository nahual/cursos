//steal/js nahual/promociones/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('nahual/promociones/scripts/build.html',{to: 'nahual/promociones'});
});
