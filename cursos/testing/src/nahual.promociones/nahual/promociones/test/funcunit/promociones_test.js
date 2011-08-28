module("promociones test", { 
	setup: function(){
		S.open("//nahual/promociones/promociones.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});