/**
 * @tag models, home
 * Wraps backend usuario services.  Enables 
 * [Nahual.Promociones.Models.Usuario.static.findAll retrieving],
 * [Nahual.Promociones.Models.Usuario.static.update updating],
 * [Nahual.Promociones.Models.Usuario.static.destroy destroying], and
 * [Nahual.Promociones.Models.Usuario.static.create creating] usuarios.
 */
$.Model.extend('Nahual.Promociones.Models.Usuario',
/* @Static */
{
	editableAttributes: [
		{
			Name: 'cuenta',
			Description: 'Cuenta',
			ShowInList: true,
			Required: true,
			MaxLength: 50
		},
		{
			Name: 'nombre',
			Description: 'Nombre',
			ShowInList: true,
			Required: true
		},
		{
			Name: 'apellido',
			Description: 'Apellido', 
			ShowInList: true
		},
		{
			Name: 'password',
			Description: 'Password',
			Type: 'password',
			Required: true,
			MaxLength: 16
		}
	],
	lastId: 0,
	
	/**
 	 * Retrieves usuarios data from your backend services.
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
				var usuarios = $.nahual.data.usuarios.getAll();
				$.each(usuarios, function (index, value) {
					modelObjects.push(new Nahual.Promociones.Models.Usuario(value));
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
			url: '/usuarios/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				$.nahual.data.usuarios.set(id, attrs);
				var usuarios = $.nahual.data.usuarios.getAll();
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
			url: '/usuarios/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture:  function( settings, callbackType ) {
				var usuario = $.nahual.data.usuarios.del(id);
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
			url: '/usuarios',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: function( settings, callbackType ) {
				var id = $.nahual.data.usuarios.getLatestId() + 1;
				$.nahual.data.usuarios.set(id, attrs);
				var usuarios = $.nahual.data.usuarios.getAll();
				return 'success';
			} 
		});
	}
},
/* @Prototype */
{
	nombreCompleto: function (){
		return this.nombre + " " + this.apellido;
	}
});
