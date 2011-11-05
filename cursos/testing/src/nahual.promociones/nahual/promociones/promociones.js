steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	
	.css(
		'promociones', 
		'resources/css/jquery-ui-1.8.16.custom'
	)	// loads styles
	.resources(
		'jquery.nahual.js',
		'external/jquery-ui-1.8.16.custom.min.js',
		'external/jquery.validate.js'
	)	// 3rd party script's (like jQueryUI), in resources folder

	.models('promocion', 'publicacion', 'usuario')		// loads files in models folder 

	.controllers('base_controller', 'promocion', 'publicacion', 'usuario')	// loads files in controllers folder

	.views(
		'promocion/edit.ejs',
		'promocion/init.ejs',
		'promocion/list.ejs',
		'promocion/show.ejs',
		'publicacion/edit.ejs',
		'publicacion/init.ejs',
		'publicacion/list.ejs',
		'publicacion/show.ejs',
		'usuario/edit.ejs',
		'usuario/init.ejs',
		'usuario/list.ejs',
		'usuario/show.ejs'
	)
	.then(function () {
		$(document).ready(function () {
			$('#tabs').tabs();
			Nahual.Promociones.Controllers.BaseController.basePathVersionPostfix = '';
			new Nahual.Promociones.Controllers.Promocion($('#promocion'));
			new Nahual.Promociones.Controllers.Publicacion($('#publicacion'));
			new Nahual.Promociones.Controllers.Usuario($('#usuario'));
		});
	}
	);						// adds views to be added to build