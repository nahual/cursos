steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	
	.css('promociones')	// loads styles

	.resources(
		'jquery.nahual.js'
	)					// 3rd party script's (like jQueryUI), in resources folder

	.models('promocion')						// loads files in models folder 

	.controllers('base_controller', 'promocion')					// loads files in controllers folder

	.views(
		'promocion/edit.ejs',
		'promocion/init.ejs',
		'promocion/list.ejs',
		'promocion/show.ejs'
	).then( function() {
		jQuery(document).ready( function() {
			Nahual.Promociones.Controllers.BaseController.basePathVersionPostfix = '.v2';
			new Nahual.Promociones.Controllers.Promocion($('#promocion'));
		});
	});						// adds views to be added to build