/**
 * @tag models, home
 * Wraps backend usuario services.  Enables 
 * [Nahual.Promociones.Models.Publicacion.static.findAll retrieving],
 * [Nahual.Promociones.Models.Publicacion.static.update updating],
 * [Nahual.Promociones.Models.Publicacion.static.destroy destroying], and
 * [Nahual.Promociones.Models.Publicacion.static.create creating] publicaciones.
 */
$.Model.extend('Nahual.Promociones.Models.Publicacion',
/* @Static */
{
	editableAttributes: [
		{
			Name: 'nombre',
			Description: 'Nombre',
			ShowInList: true,
			Required: true,
			MaxLength: 20
		},
		{
			Name: 'contacto',
			Description: 'Contacto',
			ShowInList: true,
			Required: true,
			MaxLength: 50
		},
		{
			Name: 'telefono',
			Description: 'Teléfono', 
			Required: true,
			MaxLength: 13,
			Type: 'regex',
			TypeRegex: '[\d\s-]*'
		},
		{
			Name: 'mail',
			Description: 'Mail',
			ShowInList: true,
			Required: true,
			MaxLength: 20,
			Type: 'regex',
			TypeRegex: '\w+@\w+\.\w+'
		},
		{
			Name: 'fecuencia',
			Description: 'Frecuencia',
			Required: true,
			Type: 'select',
			TypeValues: ['Diario', 'Semanal', 'Quincenal', 'Mensual']
		},
		{
			Name: 'tipoDeMedio',
			Description: 'Tipo de Medio',
			Required: true,
			Type: 'select',
			TypeValues: ['Revista', 'Diario', 'TV', 'Internet', 'Vía Pública']
		},
		{
			Name: 'observaciones',
			Description: 'Observaciones',
			Type: 'textarea',
			MaxLength: 500
		}
	],
	lastId: 0,
	
	/**
 	 * Retrieves publicaciones data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped usuario objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/usuario',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(success),
			error: error,
			fixture: function( settings, callbackType ) {
				var modelObjects = [];
				var publicaciones = $.nahual.data.publicaciones.getAll();
				$.each(publicaciones, function (index, value) {
					modelObjects.push(new Nahual.Promociones.Models.Publicacion(value));
				});
				return [modelObjects, 'success'];
			} 
		});
	},
	/**
	 * Updates an usuario's data.
	 * @param {String} id A unique id representing your usuario.
	 * @param {Object} attrs Data to update your usuario with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/publicaciones/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				$.nahual.data.publicaciones.set(id, attrs);
				var publicaciones = $.nahual.data.publicaciones.getAll();
				return 'success';
			} 
		});
	},
	/**
 	 * Destroys an usuario's data.
 	 * @param {String} id A unique id representing your usuario.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/publicaciones/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				var usuario = $.nahual.data.publicaciones.del(id);
				return (usuario ? 'sucess' : 'error');
			} 
		});
	},
	/**
	 * Creates a usuario.
	 * @param {Object} attrs A usuario's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/publicaciones',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: function( settings, callbackType ) {
				var id = $.nahual.data.publicaciones.getLatestId() + 1;
				$.nahual.data.publicaciones.set(id, attrs);
				var publicaciones = $.nahual.data.publicaciones.getAll();
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
