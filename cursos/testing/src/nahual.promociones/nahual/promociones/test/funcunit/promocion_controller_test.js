/*global module: true, ok: true, equals: true, S: true, test: true */
module("promocion", {
	setup: function () {
		// open the page
		S.open("//nahual/promociones/nahual.html");

		//make sure there's at least one promocion on the page before running a test
		S('.promocion').exists();
	},
	//a helper function that creates a promocion
	create: function () {
		S("[name=name]").type("Ice");
		S("[name=description]").type("Cold Water");
		S("[type=submit]").click();
		S('.promocion:nth-child(2)').exists();
	}
});

test("promocions present", function () {
	ok(S('.promocion').size() >= 1, "There is at least one promocion");
});

test("create promocions", function () {

	this.create();

	S(function () {
		ok(S('.promocion:nth-child(2) td:first').text().match(/Ice/), "Typed Ice");
	});
});

test("edit promocions", function () {

	this.create();

	S('.promocion:nth-child(2) a.edit').click();
	S(".promocion input[name=name]").type(" Water");
	S(".promocion input[name=description]").type("\b\b\b\b\bTap Water");
	S(".update").click();
	S('.promocion:nth-child(2) .edit').exists(function () {

		ok(S('.promocion:nth-child(2) td:first').text().match(/Ice Water/), "Typed Ice Water");

		ok(S('.promocion:nth-child(2) td:nth-child(2)').text().match(/Cold Tap Water/), "Typed Cold Tap Water");
	});
});

test("destroy", function () {

	this.create();

	S(".promocion:nth-child(2) .destroy").click();

	//makes the next confirmation return true
	S.confirm(true);

	S('.promocion:nth-child(2)').missing(function () {
		ok("destroyed");
	});

});