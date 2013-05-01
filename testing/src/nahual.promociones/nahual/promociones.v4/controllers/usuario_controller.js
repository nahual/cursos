/**
 * @tag controllers, home
 * Displays a table of usuarios.	 Lets the user 
 * ["Nahual.Promociones.Controllers.Usuario.prototype.form submit" create], 
 * ["Nahual.Promociones.Controllers.Usuario.prototype.&#46;edit click" edit],
 * or ["Nahual.Promociones.Controllers.Usuario.prototype.&#46;destroy click" destroy] usuarios.
 */
Nahual.Promociones.Controllers.BaseController.extend('Nahual.Promociones.Controllers.Usuario',
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
	Nahual.Promociones.Models.Usuario.findAll({}, this.callback('list')); 
 },
 /**
 * Displays a list of usuarios and the submit form.
 * @param {Array} usuarios An array of Nahual.Promociones.Models.Usuario objects.
 */
 list: function( usuarios ){
	$('#usuario').html(this.view('init', {usuarios:usuarios} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Nahual.Promociones.Models.Usuario.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	var usuario = el.closest('.usuario').model();
	if (usuario)
		usuario.update(el.formParams());
	else
		new Nahual.Promociones.Models.Usuario(el.formParams()).save();
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The usuario's edit link element.
 */
'.add click': function( el ){
	this.edit(null);
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The usuario's edit link element.
 */
'.edit click': function( el ){
	var usuario = el.closest('.usuario').model();
	this.edit(usuario);
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The usuario's cancel link element.
 */
'.cancel click': function( el ){
	this.load();
},
 /**
 * Shows a usuario's information.
 */
show: function( usuario ){
	usuario.elements().html(this.view('show',usuario));
},
 /**
 * Allow editing a usuario's element.
 */
edit: function( usuario ){
	$('#usuario').html(this.view('edit', usuario));
	$('#editForm').validate();
},
 /**
 *	 Handle's clicking on a usuario's destroy link.
 */
'.delete click': function( el ){
	var model = el.closest('.usuario').model();
	if(confirm("¿Está seguro que desea eliminar '" + model.nombreCompleto() + "'?")){
		model.destroy();
	}
 },
/**
 * Listens for usuarios being created.	 When a usuario is created, displays the new usuario.
 * @param {String} called The open ajax event that was called.
 * @param {Event} usuario The new usuario.
 */
'usuario.created subscribe': function( called, usuario ){
	this.load();
},
 /**
 * Listens for updated usuarios.	 When a usuario is updated, 
 * update's its display.
 */
'usuario.updated subscribe': function( called, usuario ){
	this.load();
},
 /**
 *	 Listens for usuarios being destroyed and removes them from being displayed.
 */
"usuario.destroyed subscribe": function(called, usuario){
	usuario.elements().remove();
 }
});
