module("Model: Nahual.Promociones.Models.Promocion")

asyncTest("findAll", function(){
	stop(2000);
	Nahual.Promociones.Models.Promocion.findAll({}, function(promocions){
		ok(promocions)
        ok(promocions.length)
        ok(promocions[0].name)
        ok(promocions[0].description)
		start()
	});
	
})

asyncTest("create", function(){
	stop(2000);
	new Nahual.Promociones.Models.Promocion({name: "dry cleaning", description: "take to street corner"}).save(function(promocion){
		ok(promocion);
        ok(promocion.id);
        equals(promocion.name,"dry cleaning")
        promocion.destroy()
		start();
	})
})
asyncTest("update" , function(){
	stop();
	new Nahual.Promociones.Models.Promocion({name: "cook dinner", description: "chicken"}).
            save(function(promocion){
            	equals(promocion.description,"chicken");
        		promocion.update({description: "steak"},function(promocion){
        			equals(promocion.description,"steak");
        			promocion.destroy();
        			start()
        		})
            })

});
asyncTest("destroy", function(){
	stop(2000);
	new Nahual.Promociones.Models.Promocion({name: "mow grass", description: "use riding mower"}).
            destroy(function(promocion){
            	ok( true ,"Destroy called" )
            	start();
            })
})