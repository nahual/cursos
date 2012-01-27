/**
 * @tag controllers, home
 * Lets the user 
 * ["Nahual.Promociones.Controllers.Login.prototype.form submit" login] in the system.
 */
Nahual.Promociones.Controllers.BaseController.extend('Nahual.Promociones.Controllers.Login',
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
	$('#tabs').hide();
	$('#login').html(this.view('init'));
 },
 /**
 * Responds to the create form being submitted by creating a new Nahual.Promociones.Models.Usuario.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	var login = el.formParams();
	if (this.validate_user(login)){
		$('#login').empty();
		$('#tabs').show();
	} else {
		alert('Usuario y/o contraseña no son correctos');
	}
},
'.cancel click': function( el ){
	this.load();
},
validate_user: function(login){
	var users = $.nahual.data.usuarios.getAll();
	if (users.length == 0 && login.cuenta == 'admin' && login.password == 'admin'){
		return true;
	} else {
		for(var i = 0; i < users.length; ++i){
			if (users[i].cuenta = login.cuenta && users[i].password == login.password)
				return true;
		}
		return false;
	}
}
});
