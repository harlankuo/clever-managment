angular.module('clever.management.i18n.en', ['pascalprecht.translate']).config(function($translateProvider) {
	$translateProvider.translations('en', {
		TITLE_WEBSITE : 'CLEVER Management Platform',
		LANGUAGE : 'Language',
		LANGUAGE_ZH : 'Chinese',
		LANGUAGE_EN : 'English',

		// Message box
		MESSAGE_BOX_BTN_YES : 'Yes',
		MESSAGE_BOX_BTN_NO : 'No',
		MESSAGE_BOX_BTN_OK : 'OK',
		MESSAGE_BOX_BTN_CANCEL : 'Cancel',

		// Busy service
		BUSY_LOADING : 'Loading...',
		BUSY_UPLOADING : 'Uploading...',
		
		SEARCH_HINT : 'Key words',

		// Home
		ARCHETYPE_MANAGEMENT : 'Archetype Management',
		STORAGE_MANAGEMENT : 'Storage Management',
		APPLICATION_MANAGEMENT : 'Application Management',
		INTEGRATION_MANAGEMENT : 'Intergration Management',

		// Header
		HEADER_WELCOME : 'Welcome',
		HEADER_LOGIN : 'Login',
		HEADER_LOGOUT : 'Logout',

		// Login page
		LOGIN_TITLE : 'Login',
		LOGIN_USER_NAME : 'Username',
		LOGIN_PASSWORD : 'Password',
		LOGIN_REMEMBER_ME : 'Remember me',
		LOGIN_BUTTON : 'Login',
		LOGIN_WRONG_USERNAME_PASSWORD : 'Incorrect username or password!',
		LOGIN_UNAUTHORIZED : 'Please login first',
		LOGIN_SESSION_EXPIRED : 'The session has been expired，plaese relogin!',

		// Archetype upload
		ARCHETYPE_UPLOAD_ADD_FILE : 'Add files',
		ARCHETYPE_UPLOAD_VALIDATE : 'Validate',
		ARCHETYPE_UPLOAD_RESET : 'Reset',
		ARCHETYPE_UPLOAD_RETRY : 'Retry',
		ARCHETYPE_UPLOAD_UPLOAD : 'Upload',
		ARCHETYPE_UPLOAD_UPLOADING_HINT : 'Uploading，Please waitiing...',
		ARCHETYPE_UPLOAD_VALIDATING_HINT : 'Validating...',
		ARCHETYPE_UPLOAD_VALIDATION_PAST_HINT : 'Validation succeed ,Please wait...',
		ARCHETYPE_UPLOAD_VALIDATION_FAILED_HINT : 'Validation failed',
		ARCHETYPE_UPLOAD_DELETE : 'Delete',
		ARCHETYPE_UPLOAD_FILE_DETAILS : 'Details',
		ARCHETYPE_UPLOAD_FILE_TO_UPLOAD : 'Read to Upload',
		ARCHETYPE_UPLOAD_FILE_UPLOADING : 'Uploading...',
		ARCHETYPE_UPLOAD_FILE_VALIDATING : 'Validating...',
		ARCHETYPE_UPLOAD_FILE_VALID : 'Valid',
		ARCHETYPE_UPLOAD_FILE_INVALID : 'Invalid',
		ARCHETYPE_UPLOAD_FILE_FAILED : 'Failed',
		ARCHETYPE_UPLOAD_SUCCEEDED : 'Successful operation',
		ARCHETYPE_UPLOAD_SUCCEEDED_HINT : 'Archetype uploaded successfully.',
		ARCHETYPE_UPLOAD_FAILED : 'Operation failure',
		ARCHETYPE_UPLOAD_FAILED_HINT : 'Archetype upload fails，ERROR：{{errorMsg}}',

		// Archetype edit
		ARCHETYPE_EDIT_EDIT : 'Edit',
		ARCHETYPE_EDIT_SUBMIT : 'Submit',
		ARCHETYPE_EDIT_DRAFT : 'My draft',
		ARCHETYPE_EDIT_PUBLISHED : 'Published',
		ARCHETYPE_EDIT_SUCCEEDED : 'Operation succeed',
		ARCHETYPE_EDIT_FAILED : 'Operation failed',
		ARCHETYPE_EDIT_EDIT_SUCCEEDED_HINT : 'Edit Archetype successfully',
		ARCHETYPE_EDIT_SAVE_SUCCEEDED_HINT : 'Save Achtetype successfully',
		
		//ARCHETYPE_EDIT_SUBMIT_SUCCEEDED_HINT : '原型提交成功',
		ARCHETYPE_EDIT_EDIT_FAILED_HINT : ' Archetype edting failed,ERROR: {{errorMsg}}',
		ARCHETYPE_EDIT_SUBMIT_SUCCEEDED_HINT : 'Archetype  submit successfully',
		ARCHETYPE_EDIT_SUBMIT_FAILED_HINT : 'Archetype  submit failed,ERROR: {{errorMsg}}',
		ARCHETYPE_NEW_VERSION_INSTRUCTION : 'Can not edit arthetype submitted or released,please create a new version of archetype by context menu', 
        ARCHETYPE_EDIT_ADD_FAILED_HINT : ' Archetype edting failed,ERROR: {{errorMsg}}',
        ARCHETYPE_EDIT_ADD_SUCCEEDED_HINT : 'Add archetype successfully',
		// Storage template edit
		STORAGE_TEMPLATE_EDIT_SAVE : 'Save',
		STORAGE_TEMPLATE_EDIT_SUBMIT : 'Submit',
		STORAGE_TEMPLATE_EDIT_DIFF : 'Compare',
		STORAGE_TEMPLATE_EDIT_EXPAND : 'ExpandAll',
		STORAGE_TEMPLATE_SUCCEEDED : 'operation succeed ',
		STORAGE_TEMPLATE_FAILED : 'Operation',
		STORAGE_TEMPLATE_EDIT_SUCCEEDED_HINT : 'Edit template successfully',
		STORAGE_TEMPLATE_EDIT_FAILED_HINT : 'Edit template failed,ERROR: {{errorMsg}}',
		STORAGE_TEMPLATE_SUBMIT_SUCCEEDED_HINT : 'Submit template successfully',
		STORAGE_TEMPLATE_SUBMIT_FAILED_HINT : 'Failed to submit template,ERROR: {{errorMsg}}',
		STORAGE_TEMPLATE_NEW_VERSION_INSTRUCTION : 'Can not edit arthetype submitted or released,please create a new version of archetype by context menu',
		STORAGE_TEMPLATE_ADD_SUCCEEDED_HINT : 'Add template successfully',
		STORAGE_TEMPLATE_ADD_FAILED_HINT : 'Failed to add template，ERROR： {{errorMsg}}',
 
		// Archetype verify
		ARCHETYPE_VERIFY : 'All approval items',
		ARCHETYPE_VERIFY_ADL_DIFF : 'ADL contrast',
		ARCHETYPE_VERIFY_EDITOR : 'Editor',
		ARCHETYPE_VERIFY_TOTAL : 'Unapproved',
		ARCHETYPE_VERIFY_APPROVE : 'Approve',
		ARCHETYPE_VERIFY_REJECT : 'Reject',
		ARCHETYPE_VERIFY_REMOVE : 'Remove',
		ARCHETYPE_VERIFY_MSG_HINT : 'Operation tips',
		ARCHETYPE_VERIFY_APPROVE_HINT : 'Approve {{archetypeName}}?',
		ARCHETYPE_VERIFY_APPROVE_SUCCEEDED_HINT : 'Approve archetype successfully  ',
		ARCHETYPE_VERIFY_APPROVE_FAILED_HINT : 'Failed to approve archetype, ERROR: {{errorMsg}}',
		ARCHETYPE_VERIFY_REJECT_HINT : 'Reject {{archetypeName}}?',
		ARCHETYPE_VERIFY_REJECT_FAILED_HINT : 'Failed to Reject, ERROR: {{errorMsg}}',
		ARCHETYPE_VERIFY_REMOVE_HINT : 'Reject and remove {{archetypeName}}?',
		ARCHETYPE_VERIFY_REMOVE_FAILED_HINT : 'Failed to Reject and remove, ERROR: {{errorMsg}}',

		// Storage template upload
		STORAGE_TEMPLATE_UPLOAD_ADD : 'Add',
		STORAGE_TEMPLATE_UPLOAD_BTN_BROWSE : 'Brower',
		STORAGE_TEMPLATE_UPLOAD_BTN_DELETE : 'Delete',
		STORAGE_TEMPLATE_UPLOAD_BTN_RETRY : 'Retry',
		STORAGE_TEMPLATE_UPLOAD_BTN_UPLOAD : 'upload',
		STORAGE_TEMPLATE_UPLOAD_BTN_RESET : 'Retry',
		STORAGE_TEMPLATE_UPLOAD_BTN_VALIDATE : 'Validate',
		STORAGE_TEMPLATE_UPLOAD_OET_HINT : 'Please select an OET fils...',
		STORAGE_TEMPLATE_UPLOAD_ARM_HINT : 'Please select an ARM fils...',
		STORAGE_TEMPLATE_UPLOAD_VALIDATING_HINT : 'Validating...',
		STORAGE_TEMPLATE_UPLOAD_OET_ERROR_HINT : 'Please select an OET fils...',
		STORAGE_TEMPLATE_UPLOAD_ARM_ERROR_HINT : 'Please select an ARM fils...',
		STORAGE_TEMPLATE_UPLOAD_VALIDATE_ERROR_HINT : 'Validate failed',
		STORAGE_TEMPLATE_UPLOAD_VALIDATE_DETAILS_HINT : 'Particulars...',
		STORAGE_TEMPLATE_UPLOAD_SUCCEEDED : 'Operation succeed',
		STORAGE_TEMPLATE_UPLOAD_SUCCEEDED_HINT : 'Storage template upload succeed',
		STORAGE_TEMPLATE_UPLOAD_FAILED : 'Operation failed',
		STORAGE_TEMPLATE_UPLOAD_FAILED_HINT : 'Storage template upload succeed，ERROR：{{errorMsg}}',
          
		// Storage template edit
		
		
		
		// Storage template verify
		STORAGE_TEMPLATE_VERIFY_OET_DIFF : 'OET comparation',
		STORAGE_TEMPLATE_VERIFY_APPROVE : 'Approve',
		STORAGE_TEMPLATE_VERIFY_TOTAL : 'Unapproved',
		STORAGE_TEMPLATE_VERIFY_EDITOR : 'Editor',
		STORAGE_TEMPLATE_VERIFY_REJECT : 'Reject',
		STORAGE_TEMPLATE_VERIFY_REMOVE : 'Remove',
		STORAGE_TEMPLATE_VERIFY_MSG_HINT : 'Operation tips',
		STORAGE_TEMPLATE_VERIFY_APPROVE_HINT : 'Approve {{templateName}}?',
		STORAGE_TEMPLATE_VERIFY_APPROVE_SUCCEEDED_HINT : 'Template Approved',
		STORAGE_TEMPLATE_VERIFY_APPROVE_FAILED_HINT : 'Template unapproved ，ERROR：{{errorMsg}}',
		STORAGE_TEMPLATE_VERIFY_REJECT_HINT : 'Reject{{templateName}}?',
		STORAGE_TEMPLATE_VERIFY_REJECT_FAILED_HINT : 'Failed to reject template ，ERROR：{{errorMsg}}',
		STORAGE_TEMPLATE_VERIFY_REMOVE_HINT : 'Reject and delete template {{templateName}}?',
		STORAGE_TEMPLATE_VERIFY_REMOVE_FAILED_HINT : 'Failed to reject and delete template ，ERROR：{{errorMsg}}',

		// Document diff service
		DOCUMENT_DIFF_SERVICE_SIDE_BY_SIDE : 'Crosswise contrast',
		DOCUMENT_DIFF_SERVICE_INLINE : 'Inline contrast',
		DOCUMENT_DIFF_SERVICE_BTN_OK : 'Ok',

		// Storage template deploy
		STORAGE_TEMPLATE_DEPLOY : 'Deploy',
		STORAGE_TEMPLATE_DEPLOY_TODO : 'Undeployed',
		STORAGE_TEMPLATE_DEPLOY_DONE : 'Deployed',
		STORAGE_TEMPLATE_DEPLOY_SELECT_ALL : 'Select All',
		STORAGE_TEMPLATE_DEPLOY_TODO_LIST : 'Template list',
		STORAGE_TEMPLATE_DEPLOY_RECORD : 'Deploy records',
		STORAGE_TEMPLATE_DEPLOY_VERSION : 'Version',
		STORAGE_TEMPLATE_DEPLOY_FILE_DEPLOYING : 'Depolying',
		STORAGE_TEMPLATE_DEPLOY_MSG_HINI : 'Deploy hint',
		STORAGE_TEMPLATE_DEPLOY_SUCCEEDED_HINI : 'Depoly successfully',
		STORAGE_TEMPLATE_DEPLOY_FAILED_HINI : 'Deploy failed， ERROR：{{errorMsg}}',
		STORAGE_TEMPLATE_DEPLOY_SUCCEEDED : 'Success',
		STORAGE_TEMPLATE_DEPLOY_FAILED : 'Failure',
		STORAGE_TEMPLATE_DEPLOY_TIME : 'Deploy time',
		STORAGE_TEMPLATE_DEPLOY_DEPLOYER : 'Deployer',
		STORAGE_TEMPLATE_DEPLOY_IS_SUCCEEDED : 'Result',
		STORAGE_TEMPLATE_DEPLOY_COMMENT : 'Remarks',
		STORAGE_TEMPLATE_DEPLOY_DETAILS : 'Details',
		STORAGE_TEMPLATE_DEPLOY_ERROR_MSG : 'Error message',

		// Menu
		MENU_RETURN : 'Previous page',
		MENU_ENTER : 'Entry>>',
		MENU_HOME : 'Home',
		MENU_MANAGEMENT : 'Management fuction',
		MENU_MANAGEMENT_BRIEF : 'Synopsis',
		MENU_MANAGEMENT_ARCHETYPE : 'Achetype Management',
		MENU_MANAGEMENT_ARCHETYPE_VIEW : 'Archetype display',
		MENU_MANAGEMENT_ARCHETYPE_UPLOAD : 'Archetype upload',
		MENU_MANAGEMENT_ARCHETYPE_EDIT : 'Archetype edit',
		MENU_MANAGEMENT_ARCHETYPE_VERIFY : 'Archetype verify',
		MENU_MANAGEMENT_STORAGE : 'Storage Management',
		MENU_MANAGEMENT_STORAGE_VIEW : 'Template display',
		MENU_MANAGEMENT_STORAGE_UPLOAD : 'Template upload',
		MENU_MANAGEMENT_STORAGE_EDIT : 'Template edit',
		MENU_MANAGEMENT_STORAGE_VERIFY : 'Template verify',
		MENU_MANAGEMENT_STORAGE_DEPLOY : 'Template deploy',
		MENU_MANAGEMENT_APPLICATION : 'Applcation management',	
		MENU_MANAGEMENT_APPLICATION_VIEW : 'Application display',
		MENU_MANAGEMENT_APPLICATION_EDIT : 'Application edit',
		MENU_MANAGEMENT_INTEGRATION : 'Integration Management',
		MENU_MANAGEMENT_DEVELOPMENT : 'Development platform',
		MENU_MANAGEMENT_DEVELOPMENT_DESIGN : 'Designer',
		MENU_MANAGEMENT_DEVELOPMENT_API_DISPLAY : 'API display',
		MENU_MANAGEMENT_DEVELOPMENT_CDR : 'Database service',
		
		//MENU_MANAGEMENT_ARCHETYPE_VIEW_INFO : 'Archetype是CLEVER™的核心，它基于openEHR规范实现，是一套从临床基本概念出发的信息模型，而且与软件系统开发独立，因而可由临床人员直接管理和维护，具备较高灵活性。Archetype是CLEVER™的核心，它基于openEHR规范实现，是一套从临床基本概念出发的信息模型，而且与软件系统开发独立，因而可由临床人员直接管理和维护，具备较高灵活性。',//'原型查看简介',

		//Menu-infomation
		MENU_INFO : 'Outline information',
		MENU_MANAGEMENT_INFO : 'CLEVER Management Platform，Function modules management',
		MENU_MANAGEMENT_ARCHETYPE_INFO : 'Archetype is the kernel of CLEVER™，it is a information module origined base concept of clinic, implemented based on the standard of openEHR, and independent of software system development. Therefore it can be managed and maintained by clinical staff directly,which is highly flexible.',
		MENU_MANAGEMENT_ARCHETYPE_VIEW_INFO : 'You can check all the archetypes in database here, including all the states and vertions',//'原型查看简介',
		MENU_MANAGEMENT_ARCHETYPE_UPLOAD_INFO : 'You can upload archetypes to database here.The archetypes should be ADL files.Uploaded archetypes will be stored in database in draft status.',//'原型上传简介',
		MENU_MANAGEMENT_ARCHETYPE_VERIFY_INFO : 'You can audit the submitted archetypes here. Approve archetype:Status changed into released; Reject archetype:Status restore to draft;Delete archetype:remove archetype. ',//'原型审核简介',
		MENU_MANAGEMENT_ARCHETYPE_EDIT_INFO : 'You can creat archetype and edit archetypen here. Archetype editing includes that edit the basic information of archetype,add delete or modify the nodes of the part of archetype definition and ontology edit',//'原型编辑简介',
		MENU_MANAGEMENT_STORAGE_INFO : 'DataManager is responsible for the data management of CLEVER™ platform，All the data classify by archetype,which is conveniet for clinic staff to query,add,modify and delete.All the operation will be reflected to physical memory safely',
		MENU_MANAGEMENT_STORAGE_VIEW_INFO : 'You can check the templates in database including all the states and versions.',
		MENU_MANAGEMENT_STORAGE_UPLOAD_INFO : 'You can upload templates to database here，including OET files and ARM files',
		MENU_MANAGEMENT_STORAGE_EDIT_INFO : 'You can create template for perticular archetype，edit the occurrences attribute of nodes and make slot operation',
		MENU_MANAGEMENT_STORAGE_VERIFY_INFO : 'You can audit the templates submitted.Approve Template：change the state of template into published to deploy; Reject template： change the state of template into draft for further edit; Remove Template： Delete the template in database directly',
		MENU_MANAGEMENT_STORAGE_DEPLOY_INFO : 'You can deployed the template in published condition into database, deploy operation will carete tables in database based on template.', 
		MENU_MANAGEMENT_APPLICATION_INFO : 'CLEVER™ provide a full set of standard interface and archetype data access lauguage,and a method to generate application software template which is based on archetype.  Various data application software can be developed on this basis,which could promote the development and usage of data.',
		MENU_MANAGEMENT_APPLICATION_VIEW_INFO : 'You can check all the applications here.',
		MENU_MANAGEMENT_APPLICATION_EDIT_INFO : 'You can modify the name ,Introduction,url,and image of applications.',
		MENU_MANAGEMENT_INTEGRATION_INFO : 'SHINE™ ,the engine of IHE，integrate various different strcture system to CLEVER™ platform. SHINE™ provide Integration method based on archetype semantic ，which can be configured convenietly and efficiently.',
		MENU_MANAGEMENT_DEVELOPMENT_DESIGN_INFO : 'Introduction of designer',
        MENU_MANAGEMENT_DEVELOPMENT_INFO : 'Introduction of development platform',
        MENU_MANAGEMENT_DEVELOPMENT_API_INFO : 'Introduction of API display',
        MENU_MANAGEMENT_DEVELOPMENT_CDR_INFO : 'Introduction of Database service',
		// Application edit and view
		APPLICATION_EDIT_FIND_HINT : 'Application name',
		APPLICATION_EDIT_NAME : 'Name',
		APPLICATION_EDIT_DESCRIPTION : 'Synopsis',
		APPLICATION_EDIT_URL : 'URL',
		APPLICATION_EDIT_ADD_APPLICATION : 'Add Application',
		APPLICATION_EDIT_BTN_UPLOAD : 'Upload',
		APPLICATION_EDIT_BTN_UPDATE : 'Update',
		APPLICATION_EDIT_BTN_DELETE : 'Delete',
		APPLICATION_EDIT_BTN_BROWSE : 'Brower',
		APPLICATION_EDIT_SUCCEEDED : 'Operate successfully',
		APPLICATION_EDIT_FAILED : 'Operate unsuccessfully',
		APPLICATION_EDIT_UPLOAD_SUCCEEDED_HINT : 'Application upload successfully',
		APPLICATION_EDIT_UPLOAD_FAILED_HINT : 'Application upload failed，ERROR：{{errorMsg}}',
		APPLICATION_EDIT_UPDATE_SUCCEEDED_HINT : 'Application updat successfully',
		APPLICATION_EDIT_UPDATE_FAILED_HINT : 'Application updat failed，ERROR：{{errorMsg}}',
		APPLICATION_EDIT_DELETE : 'Delete',
		APPLICATION_EDIT_DELETE_HINT : 'Are you sure to delete "{{appName}}"',
		APPLICATION_VIEW_FIND_HINT : 'Application name',
		APPLICATION_VIEW_EDIT : 'Edit',

		// Archetype master pane
		ARCHETYPE_MASTER_PANE_INFO : 'Basic information',
		ARCHETYPE_MASTER_PANE_LOG : 'Operation record',
		ARCHETYPE_MASTER_PANE_VERSION : 'Version',
		ARCHETYPE_MASTER_PANE_STATE : 'State',
		ARCHETYPE_MASTER_PANE_OPERATION : 'Operation',
		ARCHETYPE_MASTER_PANE_OPERATIOR : 'Operator',
		ARCHETYPE_MASTER_PANE_OPERATE_TIME : 'Operate time',

		// Archetype pane
		ARCHETYPE_PANE_LANGUAGE : 'Lauguage',
		ARCHETYPE_PANE_INFO : 'Basic information',
		ARCHETYPE_PANE_DOWNLOAD : 'Download',
		ARCHETYPE_PANE_COPY : 'Copy',

		// Template master pane
		TEMPLATE_MASTER_PANE_INFO : 'Basic Information',
		TEMPLATE_MASTER_PANE_LOG : 'Operation record',
		TEMPLATE_MASTER_PANE_VERSION : 'Version',
		TEMPLATE_MASTER_PANE_STATE : 'State',
		TEMPLATE_MASTER_PANE_OPERATION : 'Operation',
		TEMPLATE_MASTER_PANE_OPERATIOR : 'Operator',
		TEMPLATE_MASTER_PANE_OPERATE_TIME : 'Operate time',

		// Storage template pane
		STORAGE_TEMPLATE_PANE_INFO : 'Information',
		STORAGE_TEMPLATE_PANE_DOWNLOAD : 'Download',
		
		//archetype editor pane
		ARCHETYPE_PANE_CREATE: 'Create',
		ARCHETYPE_PANE_SAVE: 'Save',
		ARCHETYPE_PANE_SUBMIT: 'Submit',
		ARCHETYPE_PANE_DIFF: 'Compare',
		
		
		//verify pane
		SUBMIT_TIME: 'Submit time',
		EDITOR : 'Editor',
		ARCHETYPE_TYPE : 'Achtetype type',
		TEMPLATE_TYPE : 'Template type',
		CONCEPT_NAME : 'Concept Name',
		
		//header pane
		BASE_INFORMATION : 'Base information' ,
		AUTHORSHIP : 'Author information',
		OTHER_DETAILS: 'Other details',
	});
});
