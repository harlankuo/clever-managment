var prefix = '/clever-management-web';
var config = {
	'WEBSITE_DOMAIN' : prefix,
	'AUTHENTICATION_URL' : prefix + '/authentication',
	'ARCHETYPE_VALIDATE_URL' : prefix + '/archetypes/action/validate',
	'ARCHETYPE_UPLOAD_URL' : prefix + '/archetypes/action/upload',
	'ARCHETYPE_LIST_URL' : prefix + '/archetypes/list',
	'ARCHETYPE_EDIT_URL' : prefix + '/archetypes/mylist',
	'ARCHETYPE_EDIT_SUBMIT_URL' : prefix + '/archetypes/action/submit',
	'ARCHETYPE_VERIFY_URL' : prefix + '/archetypes/verlist',
	'ARCHETYPE_VERIFY_APPROVE_URL' : prefix + '/archetypes/action/approve',
	'ARCHETYPE_VERIFY_REJECT_URL' : prefix + '/archetypes/action/reject',
	'ARCHETYPE_VERIFY_REJECT_AND_REMOVE_URL' : prefix + '/archetypes/action/rejectAndremove',
	'ARCHETYPE_MASTER_BY_ID_URL' : prefix + '/archetypes/master/id/',
	'ARCHETYPE_BY_ID_URL' : prefix + '/archetypes/id/',
	'ARCHETYPE_BY_NAME_URL' : prefix + '/archetypes/name/',
	'STORAGE_TEMPLATE_LIST_URL' :prefix +'/templates/storage/list',
	'STORAGE_TEMPLATE_MASTER_BY_ID_URL' : prefix + '/templates/storage/master/id/',
	'STORAGE_TEMPLATE_BY_NAME_URL' : prefix + '/templates/storage/name/',
	'STORAGE_TEMPLATE_BY_ID_URL' : prefix + '/templates/storage/id/',
	'STORAGE_TEMPLATE_EDIT_LIST_URL' : prefix + '/templates/storage/action/edit/list',
	'STORAGE_TEMPLATE_SUBMIT_BY_ID_URL' : prefix + '/templates/storage/action/submit/id/',
	'STORAGE_TEMPLATE_VERIFY_LIST_URL' : prefix + '/templates/storage/action/verify/list',
	'STORAGE_TEMPLATE_APPROVE_BY_ID_URL' : prefix + '/templates/storage/action/approve/id/',
	'STORAGE_TEMPLATE_REJECT_BY_ID_URL' : prefix + '/templates/storage/action/reject/id/',
	'STORAGE_TEMPLATE_REMOVE_BY_ID_URL' : prefix + '/templates/storage/action/remove/id/',
	'STORAGE_TEMPLATE_UPGRADE_BY_ID_URL' : prefix + '/templates/storage/action/upgrade/id/',
	'STORAGE_TEMPLATE_VALIDATE_URL' : prefix + '/templates/storage/action/validate',
	'STORAGE_TEMPLATE_UPLOAD_URL' : prefix + '/templates/storage/action/upload',
	'APPLICATION_LIST_URL' : prefix + '/applications/list',
	'APPLICATION_UPLOAD_URL' : prefix + '/applications/application',
	'APPLICATION_BY_ID_URL' : prefix + '/applications/application/id/',
	'TEMP_URL' : prefix + '/temp',
};
var configModel = angular.module('clever.management.config', []);
angular.forEach(config, function(value, key) {
	configModel.constant(key, value);
});
