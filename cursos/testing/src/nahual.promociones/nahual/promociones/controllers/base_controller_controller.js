/**
 * @tag controllers, home
 * Base class for Nahual.Promociones controllers.
 */
$.Controller.extend('Nahual.Promociones.Controllers.BaseController',
/* @Static */
{
	defaults: {
		startLoading: false
	},
	basePathVersionPostfix: ''
},
/* @Prototype */
{
 /**
 * When the page loads, gets all promocions to be displayed.
 */
 init: function(){
 },
 edit: function( entity ){
	this.inEditMode = true;
 },
 submit: function( el, entity ){
	this.inEditMode = false;
 },
 cancel: function( ){
	this.inEditMode = false;
 },
 normalizeViewPath: function( view ){
	var slashes = this.Class.fullName.replace(/\./g, "/");
	var basePath = jQuery.String.underscore(slashes.replace("/Controllers/" + this.Class.shortName, ""));
	var versionPostfix = Nahual.Promociones.Controllers.BaseController.basePathVersionPostfix;
	var controller_name = this.Class._shortName;
	var suffix = jQuery.View.ext;
	return  '//' + basePath + versionPostfix + '/views/' + controller_name + '/' + view + suffix; 
 },
 view: function( view, data, myhelpers ){
	var normalizedView = this.normalizeViewPath(view);
	var normalizedData = {};
	$.extend(normalizedData, data, { controller: this} );
	return this._super(normalizedView, normalizedData, myhelpers);
 }
}
);