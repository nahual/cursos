steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	
	.css(
		'mediciones', 
		'resources/css/jquery-ui-1.8.16.custom'
	)	// loads styles
	.resources(
		'jquery.nahual.js',
		'external/jquery-ui-1.8.16.custom.min.js',
		'external/jquery.validate.js'
	)	// 3rd party script's (like jQueryUI), in resources folder

	.models('medicion')		// loads files in models folder 

	.controllers('base_controller', 'medicion')	// loads files in controllers folder

	.views(
		'medicion/edit.ejs',
		'medicion/init.ejs',
		'medicion/list.ejs',
		'medicion/show.ejs'
	)
	.then(function () {
		$(document).ready(function () {
			$('#tabs').tabs();
			Nahual.Mediciones.Controllers.BaseController.basePathVersionPostfix = '';
			new Nahual.Mediciones.Controllers.Medicion($('#medicion'));
		});
	}
	);						// adds views to be added to build