/**
 * @tag models, home
 * Wraps backend promocion services.  Enables 
 * [Nahual.Mediciones.Models.Promocion.static.findAll retrieving],
 * [Nahual.Mediciones.Models.Promocion.static.update updating],
 * [Nahual.Mediciones.Models.Promocion.static.destroy destroying], and
 * [Nahual.Mediciones.Models.Promocion.static.create creating] promocions.
 */
$.Model.extend('Nahual.Mediciones.Models.Medicion',
/* @Static */
{
	editableAttributes: [
		{
			Name: 'id',
			Description: 'ID',
			ShowInList: true,
			Type: 'id'
		},
		{
			Name: 'fechaMedicion',
			Description: 'Fecha Medicion',
			ShowInList: true,
			Type: 'date',
			Required: true
		},
		{
			Name: 'horaMedicion',
			Description: 'Hora Medición',
			ShowInList: true,
			Required: true,
			MaxLength: 10
		},
		{
			Name: 'pulsaciones',
			Description: 'Pulsaciones',
			ShowInList: true,
			Required: true,
			Type: 'number',
			MaxLength: 10
		},
		{
			Name: 'estadoDelClima',
			Description: 'EstadoDelClima',
			ShowInList: true,
			Type: 'select',
			TypeValues: ['Soleado', 'Nublado', 'Lluvioso', 'Nevado']
		},
		{
			Name: 'tiempoDuracion',
			ShowInList: true,
			Description: 'Tiempo Duración de la Actividad',
			Required: true,
			Type: 'number',
			MaxLength: 10
		}
	],
	lastId: 0,
	
	/**
 	 * Retrieves promocions data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped promocion objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/medicion',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(success),
			error: error,
			fixture: function( settings, callbackType ) {
				var modelObjects = [];
				var mediciones = $.nahual.data.mediciones.getAll();
				$.each(mediciones, function (index, value) {
					modelObjects.push(new Nahual.Mediciones.Models.Medicion(value));
				});
				return [modelObjects, 'success'];
			} 
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
			url: '/mediciones/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				$.nahual.data.mediciones.set(id, attrs);
				var mediciones = $.nahual.data.mediciones.getAll();
				return 'success';
			} 
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
			url: '/mediciones/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				var medicion = $.nahual.data.mediciones.del(id);
				return (medicion ? 'sucess' : 'error');
			} 
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
			url: '/mediciones',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: function( settings, callbackType ) {
				var id = $.nahual.data.mediciones.getLatestId() + 1;
				$.nahual.data.mediciones.set(id, attrs);
				var mediciones = $.nahual.data.mediciones.getAll();
				return 'success';
			} 
		});
	}
},
/* @Prototype */
{
	fechaMedicion: "qqq"
});
