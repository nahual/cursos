/**
 * @tag models, home
 * Wraps backend promocion services.  Enables 
 * [Nahual.Promociones.Models.Promocion.static.findAll retrieving],
 * [Nahual.Promociones.Models.Promocion.static.update updating],
 * [Nahual.Promociones.Models.Promocion.static.destroy destroying], and
 * [Nahual.Promociones.Models.Promocion.static.create creating] promocions.
 */
$.Model.extend('Nahual.Promociones.Models.Promocion',
/* @Static */
{
	editableAttributes: [
		{
			Name: 'titulo',
			Description: 'Título'
		},
		{
			Name: 'descripcion',
			Description: 'Descripción'
		}
	],
	promociones: [],
	lastId: 0,
	
	/**
 	 * Retrieves promocions data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped promocion objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/promocion',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: function( settings, callbackType ) {
				return [Nahual.Promociones.Models.Promocion.promociones, 'success'];
			}
			//"//nahual/promociones/fixtures/promocions.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Updates a promocion's data.
	 * @param {String} id A unique id representing your promocion.
	 * @param {Object} attrs Data to update your promocion with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/promocions/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a promocion's data.
 	 * @param {String} id A unique id representing your promocion.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/promocions/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				for(var index = 0; index < Nahual.Promociones.Models.Promocion.promociones.length; ++index) {
					if (Nahual.Promociones.Models.Promocion.promociones[index].id == id) {
						Nahual.Promociones.Models.Promocion.promociones.splice(index, 1);
						return [Nahual.Promociones.Models.Promocion.promociones, 'success'];
					}
				}
				return [Nahual.Promociones.Models.Promocion.promociones, 'error'];
			} 
			//"-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a promocion.
	 * @param {Object} attrs A promocion's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/promocions',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: function( settings, callbackType ) {
				var data = attrs;
				data.id = ++Nahual.Promociones.Models.Promocion.lastId;
				Nahual.Promociones.Models.Promocion.promociones.push(new Nahual.Promociones.Models.Promocion(data));
				return [Nahual.Promociones.Models.Promocion.promociones, 'success'];
			} 
			//"-restCreate" //uses $.fixture.restCreate for response.
		});
	}
},
/* @Prototype */
{
	titulo: "",
	descripcion: ""
});
