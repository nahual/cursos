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
			Description: 'Título',
			ShowInList: true,
			Required: true,
			MaxLength: 50
		},
		{
			Name: 'fechaInicio',
			Description: 'Fecha Inicio',
			ShowInList: true,
			Type: 'date',
			Required: true
		},
		{
			Name: 'fechaFin',
			Description: 'Fecha Fin', 
			ShowInList: true,
			Type: 'date'
			
		},
		{
			Name: 'publicacion',
			Description: 'Publicación', 
			ShowInList: true,
			Type: 'select',
			TypeValues: function () {
				var publicaciones = $.nahual.data.publicaciones.getAll();
				var values = [];
				for(var i = 0; i < publicaciones.length; ++i) {
					values.push(publicaciones[i].nombre);
				}
				return values;
			},
			Required: true
		},
		{
			Name: 'descripcion',
			Description: 'Descripción',
			Type: 'textarea',
			MaxLength: 500
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
			url: '/promocion',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(success),
			error: error,
			fixture: function( settings, callbackType ) {
				var modelObjects = [];
				var promociones = $.nahual.data.promociones.getAll();
				$.each(promociones, function (index, value) {
					modelObjects.push(new Nahual.Promociones.Models.Promocion(value));
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
			url: '/promocions/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				$.nahual.data.promociones.set(id, attrs);
				var promociones = $.nahual.data.promociones.getAll();
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
			url: '/promocions/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				var promocion = $.nahual.data.promociones.del(id);
				return (promocion ? 'sucess' : 'error');
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
			url: '/promocions',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: function( settings, callbackType ) {
				var id = $.nahual.data.promociones.getLatestId() + 1;
				$.nahual.data.promociones.set(id, attrs);
				var promociones = $.nahual.data.promociones.getAll();
				return 'success';
			} 
		});
	}
},
/* @Prototype */
{
	titulo: "",
	descripcion: ""
});
