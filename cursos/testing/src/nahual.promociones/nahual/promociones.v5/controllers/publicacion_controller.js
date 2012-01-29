/**
 * @tag controllers, home
 * Displays a table of publicaciones.	 Lets the user 
 * ["Nahual.Promociones.Controllers.Publicacion.prototype.form submit" create], 
 * ["Nahual.Promociones.Controllers.Publicacion.prototype.&#46;edit click" edit],
 * or ["Nahual.Promociones.Controllers.Publicacion.prototype.&#46;destroy click" destroy] publicaciones.
 */
Nahual.Promociones.Controllers.BaseController.extend('Nahual.Promociones.Controllers.Publicacion',
/* @Static */
{
},
/* @Prototype */
{
 /**
 * When the page loads, gets all promocions to be displayed.
 */
 init: function(){
	this._super();

	this.load();
 },
 load: function(){
	Nahual.Promociones.Models.Publicacion.findAll({}, this.callback('list')); 
 },
 /**
 * Displays a list of publicaciones and the submit form.
 * @param {Array} publicaciones An array of Nahual.Promociones.Models.Publicacion objects.
 */
 list: function( publicaciones ){
	$('#publicacion').html(this.view('init', {publicaciones:publicaciones} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Nahual.Promociones.Models.Publicacion.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	var publicacion = el.closest('.publicacion').model();
	this.submit(el, publicacion);
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The publicacion's edit link element.
 */
'.add click': function( el ){
	this.edit(null);
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The publicacion's edit link element.
 */
'.edit click': function( el ){
	var publicacion = el.closest('.publicacion').model();
	this.edit(publicacion);
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The publicacion's cancel link element.
 */
'.cancel click': function( el ){
	this.cancel();
},
 /**
 * Shows a publicacion's information.
 */
show: function( publicacion ){
	publicacion.elements().html(this.view('show',publicacion));
},
/**
 * Submits a publicacion's element.
 */
submit: function( el, publicacion ){
	this._super(el, publicacion);
	
	if (publicacion)
		publicacion.update(el.formParams());
	else
		new Nahual.Promociones.Models.Publicacion(el.formParams()).save();
},
 /**
 * Cancel the edition of a publicacion's element.
 */
cancel: function( ){
	this._super();
	this.load();
},
 /**
 * Allow editing a publicacion's element.
 */
edit: function( publicacion ){
	this._super(publicacion);
	$('#publicacion').html(this.view('edit', publicacion));
	
	$('#editForm').validate();
},
 /**
 *	 Handle's clicking on a publicacion's destroy link.
 */
'.delete click': function( el ){
	var model = el.closest('.publicacion').model();
	if(confirm("¿Está seguro que desea eliminar '" + model.nombre + "'?")){
		model.destroy();
	}
 },
/**
 * Listens for publicaciones being created.	 When a publicacion is created, displays the new publicacion.
 * @param {String} called The open ajax event that was called.
 * @param {Event} publicacion The new publicacion.
 */
'publicacion.created subscribe': function( called, publicacion ){
	this.load();
},
 /**
 * Listens for updated publicaciones.	 When a publicacion is updated, 
 * update's its display.
 */
'publicacion.updated subscribe': function( called, publicacion ){
	this.load();
},
 /**
 *	 Listens for publicaciones being destroyed and removes them from being displayed.
 */
"publicacion.destroyed subscribe": function(called, publicacion){
	publicacion.elements().remove();
 }
});
