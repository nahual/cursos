/**
 * @tag controllers, home
 * Displays a table of promocions.	 Lets the user 
 * ["Nahual.Promociones.Controllers.Promocion.prototype.form submit" create], 
 * ["Nahual.Promociones.Controllers.Promocion.prototype.&#46;edit click" edit],
 * or ["Nahual.Promociones.Controllers.Promocion.prototype.&#46;destroy click" destroy] promocions.
 */
Nahual.Promociones.Controllers.BaseController.extend('Nahual.Promociones.Controllers.Promocion',
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
	Nahual.Promociones.Models.Promocion.findAll({}, this.callback('list')); 
 },
 /**
 * Displays a list of promocions and the submit form.
 * @param {Array} promocions An array of Nahual.Promociones.Models.Promocion objects.
 */
 list: function( promociones ){
	$('#promocion').html(this.view('init', {promociones:promociones} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Nahual.Promociones.Models.Promocion.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	var promocion = el.closest('.promocion').model();
	this.submit(el, promocion);
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
	var promocion = el.closest('.promocion').model();
	this.edit(promocion);
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The promocion's cancel link element.
 */
'.cancel click': function( el ){
	this.cancel();
},
 /**
 * Shows a promocion's information.
 */
show: function( promocion ){
	promocion.elements().html(this.view('show',promocion));
},
/**
 * Submits a promocion's element.
 */
submit: function( el, promocion ){
	this._super(el, promocion);
	
	if (promocion)
		promocion.update(el.formParams());
	else
		new Nahual.Promociones.Models.Promocion(el.formParams()).save();
},
 /**
 * Cancel the edition of a promocion's element.
 */
cancel: function( ){
	this._super();
	this.load();
},
 /**
 * Allow editing a promocion's element.
 */
edit: function( promocion ){
	this._super(promocion);
	$('#promocion').html(this.view('edit', promocion));
	$('#editForm').validate();
	$('#fechaInicio').datepicker();
	$('#fechaFin').datepicker();
},
 /**
 *	 Handle's clicking on a promocion's destroy link.
 */
'.delete click': function( el ){
	var model = el.closest('.promocion').model();
	if(confirm("¿Está seguro que desea eliminar '" + model.titulo + "'?")){
		model.destroy();
	}
 },
/**
 * Listens for promocions being created.	 When a promocion is created, displays the new promocion.
 * @param {String} called The open ajax event that was called.
 * @param {Event} promocion The new promocion.
 */
'promocion.created subscribe': function( called, promocion ){
	this.load();
},
 /**
 * Listens for updated promocions.	 When a promocion is updated, 
 * update's its display.
 */
'promocion.updated subscribe': function( called, promocion ){
	this.load();
},
 /**
 *	 Listens for promocions being destroyed and removes them from being displayed.
 */
"promocion.destroyed subscribe": function(called, promocion){
	promocion.elements().remove();
 }
});
