/**
 * @tag controllers, home
 * Displays a table of promocions.	 Lets the user 
 * ["Nahual.Mediciones.Controllers.Promocion.prototype.form submit" create], 
 * ["Nahual.Mediciones.Controllers.Promocion.prototype.&#46;edit click" edit],
 * or ["Nahual.Mediciones.Controllers.Promocion.prototype.&#46;destroy click" destroy] promocions.
 */
Nahual.Mediciones.Controllers.BaseController.extend('Nahual.Mediciones.Controllers.Medicion',
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
	Nahual.Mediciones.Models.Medicion.findAll({}, this.callback('list')); 
 },
 /**
 * Displays a list of promocions and the submit form.
 * @param {Array} promocions An array of Nahual.Mediciones.Models.Promocion objects.
 */
 list: function( mediciones ){
	$('#medicion').html(this.view('init', {mediciones:mediciones} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Nahual.Mediciones.Models.Promocion.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	var medicion = el.closest('.medicion').model();
	if (medicion)
		medicion.update(el.formParams());
	else
		new Nahual.Mediciones.Models.Medicion(el.formParams()).save();
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The promocion's edit link element.
 */
'.add click': function( el ){
	this.edit(null);
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The promocion's edit link element.
 */
'.edit click': function( el ){
	var medicion = el.closest('.medicion').model();
	this.edit(medicion);
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The promocion's cancel link element.
 */
'.cancel click': function( el ){
	this.load();
},
 /**
 * Shows a promocion's information.
 */
show: function( medicion ){
	medicion.elements().html(this.view('show',medicion));
},
 /**
 * Allow editing a promocion's element.
 */
edit: function( medicion ){
	$('#medicion').html(this.view('edit', medicion));
	$('#editForm').validate();
	$('#fechaMedicion').datepicker();
},
 /**
 *	 Handle's clicking on a promocion's destroy link.
 */
'.delete click': function( el ){
	var model = el.closest('.medicion').model();
	if(confirm("¿Está seguro que desea eliminar '" + model.titulo + "'?")){
		model.destroy();
	}
 },
/**
 * Listens for promocions being created.	 When a promocion is created, displays the new promocion.
 * @param {String} called The open ajax event that was called.
 * @param {Event} promocion The new promocion.
 */
'medicion.created subscribe': function( called, medicion ){
	this.load();
},
 /**
 * Listens for updated promocions.	 When a promocion is updated, 
 * update's its display.
 */
'medicion.updated subscribe': function( called, medicion ){
	this.load();
},
 /**
 *	 Listens for promocions being destroyed and removes them from being displayed.
 */
"medicion.destroyed subscribe": function(called, medicion){
	medicion.elements().remove();
 }
});
