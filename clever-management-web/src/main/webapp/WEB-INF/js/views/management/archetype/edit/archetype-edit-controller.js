function ArchetypeEditCtrl($scope, $modal,$log, $q, $timeout, msgboxService,busyService,archetypeEditService,documentDiffModalService, resourceService,archetypeParseEditService,templateParseToEditService,archetypeSerializeService, archetypeParseService, treeDataFormatService, ARCHETYPE_LIST_EDIT_DRAFT_URL, ARCHETYPE_LIST_EDIT_PUBLISHED_URL, ARCHETYPE_CREATE_BY_URL,  ARCHETYPE_EDIT_BY_ID_URL, ARCHETYPE_SUBMIT_BY_ID_URL,ARCHETYPE_REMOVE_BY_ID_URL) {
    
   
	$scope.treeControl = {};
	$scope.isCollapse = true;
	$scope.isArchetypeListHidden = false;
	var editor = archetypeEditService;

	$scope.tabContainerHeight = {
		value : $scope.$parent.containerHeight - 35
	};
	$scope.$watch(function() {
		return $scope.$parent.containerHeight;
	}, function(newValue) {
		$scope.tabContainerHeight.value = newValue - 35;
	});

	$scope.initData = function() {
		var busyId = busyService.pushBusy('BUSY_LOADING');
		resourceService.get(ARCHETYPE_LIST_EDIT_DRAFT_URL).then(function(list) {
			$scope.draftArchetypeList = list;
			initArchetypeSpecialise(list);
			$scope.draftOver = true;
			generateTreeData();
			busyService.popBusy(busyId);
		});
		var busyId = busyService.pushBusy('BUSY_LOADING');
		resourceService.get(ARCHETYPE_LIST_EDIT_PUBLISHED_URL).then(function(list) {
			$scope.publishedArchetypeList = list;
			initArchetypeSpecialise(list);
			$scope.publishedOver = true;
			console.log(list);
			generateTreeData();
			busyService.popBusy(busyId);
		});

	};
	$scope.initData();
	function generateTreeData() {
		if ($scope.draftOver && $scope.publishedOver) {
			$scope.draftOver = false;
			$scope.publishedOver = false;
			var list = $scope.draftArchetypeList.concat($scope.publishedArchetypeList);
			//var list = $scope.publishedArchetypeList;
			$scope.originalArchetypeList = list;
			$scope.formatedObject = treeDataFormatService.formatTreeData(list, 'specialiseArchetype');
			$scope.archetypeList = $scope.formatedObject.formatedList;
			console.log($scope.archetypeList);
			var name = $scope.needLocatedObjectName;
			if (name) {
				$timeout(function() {
					$scope.locateArchetype(findArchetypeByName(name));
					$scope.needLocatedObjectName = undefined;
				}, 0);
			}
		}
	}

  
	function findArchetypeByName(name) {
		var list = $scope.originalArchetypeList;
		var matchArchetype;
		if (list) {
			if (angular.isArray(list)) {
				angular.forEach(list, function(archetype) {
					console.log(archetype.name);
					console.log(name);
					if (archetype.name == name) {

						matchArchetype = archetype;
					}
				});
			} else {
				if (list.name == naem) {
					matchArchetype = archetype;
				}
			}
		}
		return matchArchetype;
	}

	function initArchetypeSpecialise(list) {
		if (angular.isArray(list)) {
			angular.forEach(list, function(archetype) {
				if (angular.isArray(archetype.specialiseArchetype)) {
				} else if ((!archetype.specialiseArchetype) || (!archetype.specialiseArchetype.adl)) {
					archetype.specialiseArchetype = [];
				}
			});
		} else {
			var archetype = list;
			if (angular.isArray(archetype.specialiseArchetype)) {
			} else if ((!archetype.specialiseArchetype) || (!archetype.specialiseArchetype.adl)) {
				archetype.specialiseArchetype = [];
			}
		}
	}

	function refreshArchetypeList(list) {
		$scope.formatedArchetypeList.refreshFormatList(list);
	}


	$scope.locateArchetype = function(arc) {
		$scope.treeControl.locateNode(arc);
	};

	$scope.searchKeyMapper = function(node) {
		if (node.isDirectory) {
			return node.name;
		} else {
			return node.conceptName + ' (' + node.latestArchetypeVersion + ')';
		}
	};
	
	$scope.$watch('archetypeListFilter', function(newValue) {
		if (newValue != undefined) {
			$scope.treeControl.search(newValue);
		}
	});
	
	$scope.getFixedTitle = function(title, length) {
		if (title) {
			var titleLength = length || 40;
			if (title.length > titleLength) {
				return title.substring(0, titleLength / 2) + '...' + title.substring(title.length - titleLength / 2, title.length);
			} else
				return title;
		}
	};
	
	$scope.generateDiff = function() {
		var editedArchetype = archetypeSerializeService.serializeArchetype($scope.oriArchetype);
		console.log($scope.definition);
		documentDiffModalService.open('Modify records', editedArchetype, $scope.originalAdl);
	};


	$scope.submitSelectedArchetype = function() {
		console.log("submit archetype start");
		var archetype = archetypeSerializeService.serializeArchetype($scope.oriArchetype);
		resourceService.get(ARCHETYPE_SUBMIT_BY_ID_URL + $scope.selectedArchetype.id).then(function(result) {
			if (result.succeeded) {
				$scope.selectedArchetype.lifecycleState = 'Teamreview';
				$scope.selectedArchetype = undefined;
				msgboxService.createMessageBox('ARCHETYPE_EDIT_SUCCEEDED', 'ARCHETYPE_EDIT_SUBMIT_SUCCEEDED_HINT', {}, 'success');
			} else {
				msgboxService.createMessageBox('ARCHETYPE_EDIT_FAILED', 'ARCHETYPE_EDIT_SUBMIT_FAILED_HINT', {
					errorMsg : result.message
				}, "error");
			}
		});
	}; 

	$scope.saveSelectedArchetype = function() {
		var archetype = archetypeSerializeService.serializeArchetype($scope.oriArchetype);
		resourceService.post(ARCHETYPE_EDIT_BY_ID_URL + $scope.selectedArchetype.id, {
			adl : archetype
		}).then(function(result) {
			if (result.succeeded) {
				msgboxService.createMessageBox('ARCHETYPE_EDIT_SUCCEEDED', 'ARCHETYPE_EDIT_SAVE_SUCCEEDED_HINT', {}, 'success');
			} else {
				msgboxService.createMessageBox('ARCHETYPE_EDIT_FAILED', 'ARCHETYPE_EDIT_SAVE_FAILED_HINT', {
					errorMsg : result.message
				}, "error");
			}
		});
	}; 

	
	
	$scope.selectArchetype = function(archetype) {
		if (archetype.isDirectory) {
			busyService.popBusy(busyId);
			return;
		} else {
			//if (archetype.lifecycleState != 'Draft') {
				//$scope.selectedArchetype = undefined;
				//msgboxService.createMessageBox('ARCHETYPE_EDIT_FAILED', 'ARCHETYPE_NEW_VERSION_INSTRUCTION', {}, 'error');
			//} else {

				$scope.selectedArchetype = archetype;
				console.log("this is selectedArchetype");
				console.log(archetype);
				$scope.originalAdl = archetype.adl;

				//-----get original archetype(json) and then parse it, a display object can be get

				var busyId = busyService.pushBusy('BUSY_LOADING');

				$q(function(resolve, reject) {
					setTimeout(function() {
						var oriArchetype = archetypeParseEditService.getOriginalArchetype($scope.selectedArchetype.xml);
						//var result = archetypeParseEditService.parseArchetypeJson(oriArchetype);
						var transObject = [oriArchetype, archetypeParseEditService.parseArchetypeJson(oriArchetype)];
						if (transObject[0] && transObject[1]) {
							resolve(transObject);
						} else {
							reject("error");
						}
					}, 0);

				}).then(function(transObject) {
					var oriArchetype = transObject[0];
					var result = transObject[1];
					$scope.editableArchetype = result;
					$scope.oriArchetype = oriArchetype;
					console.log(oriArchetype);

					$scope.ontology = result.terminologies;
					$scope.definition = result.definitions;
					$scope.languages = result.languages;
					$scope.languages.selectedLanguage = result.languages.originalLanguage;

					//---get the header from the original archetype directly---
					$scope.header = {};
					$scope.header.archetype_id = oriArchetype.archetype_id;
					$scope.header.concept = oriArchetype.concept;
					$scope.header.description = oriArchetype.description;
					$scope.header.original_language = oriArchetype.original_language;
					$scope.header.translations = oriArchetype.translations;
					$scope.header.ontology = oriArchetype.ontology;
					busyService.popBusy(busyId);
				}, function(reason) {
					alert("Failed :" + reason);
				});
			//}
		}

	};

	$scope.getTreeElementMenu = function(node, aliasName) {
		if (!node.isDirectory) {
			var menuHtml = '<ul class="dropdown-menu"  role="menu" ng-if = "true">';
			menuHtml += '<li><a class="pointer" role= "menuitem" ng-click="specialiseNodeByMenu(' + aliasName + ')" >Specialise</a></li>';
			//menuHtml += '<li><a class="pointer" role="menuitem" ng-click="deleteNodeByMenu(' + aliasName + ')">Delete</a></li>';
			if (node.lifecycleState == "Published") {
				menuHtml += '<li><a class="pointer" role="menuitem" ng-click="operateNodeByContextMenu(' + aliasName + ', \'newVersion\' )">New version</a></li>';
			}
			menuHtml += '</ul>';
			return menuHtml;
		} else {
			return '';
		}
	}; 

    $scope.clickNodeMenu = function(node, type){
 //   console.log(value);
      switch(type){
      	case 'newVersion' :
      	   createNewVersionArchetype(node);
      	break;
      }
    	
    };
    $scope.createNewVersionArchetype = function() {
    	createNewVersionArchetype($scope.selectedArchetype);
    };

	function createNewVersionArchetype(archetype) {
		console.log(archetype);
		var jsonArchetype = archetypeParseEditService.getOriginalArchetype(archetype.xml);
		console.log(jsonArchetype);
		var archetypeId = jsonArchetype.archetype_id.value;
		var frontString = archetypeId.slice(0, archetypeId.lastIndexOf('v1') + 3);
		var lastString = archetypeId.slice(archetypeId.lastIndexOf('v1') + 3, archetypeId.length);
		var newVersion = parseInt(lastString) + 1;
		jsonArchetype.archetype_id.value = frontString + newVersion;
		pushToArchetypeList(jsonArchetype);
	}

	$scope.deleteArchetype = function(value) {
		if (value.parent) {
			value.parent.specialiseArchetype.splice(value.parent.specialiseArchetype.indexOf(value), 1);
			$scope.draftArchetypeList.splice($scope.draftArchetypeList.indexOf(value), 1);
		} else {
			$scope.draftArchetypeList.splice($scope.draftArchetypeList.indexOf(value), 1);
		}
		resourceService.get(ARCHETYPE_REMOVE_BY_ID_URL + value.id).then(function(result) {
			console.log(result);
		});
	};
	function createArchetype(info) {
		if (info.referenceModel == 'EHR') {
			createEhrArchetype(info);
		} else if (info.referenceModel == 'DEMOGRAPHIC') {
			createDemogrArchetype(info);
		}
	}

	function createEhrArchetype(info) {
		if (info) {
			switch(info.entityType) {
			case "INSTRUCTION":
				createInstruction(info);
				break;
			case "OBSERVATION":
				createObservation(info);
				break;
			case "EVALUATION":
				createEvaluation(info);
				break;
			case "COMPOSITION":
				createComposition(info);
				break;
			case "ADMIN_ENTRY":
				createAdminEntry(info);
				break;
			case "ACTION":
				createAction(info);
				break;
			case "SECTION":
				createSection(info);
				break;
			case "ITEM_TREE":
				createItemTree(info);
				break;
			case "ITEM_LIST":
				createItemList(info);
				break;
			case "ITEM_SINGLE":
				createItemSingle(info);
				break;
			case "ITEM_TABLE":
				createItemTable(info);
				break;
			case "CLUSTER":
				createCluster(info);
				break;
			case "ELEMENT":
				createElement(info);
				break;
			}

		}
	}

	//-------------create action ---------------------
	function createAction(info) {
		var jsonAction = createBaseArchetype(info);
		pushToArchetypeList(jsonAction, info);
	}

	//-----------create instruction-------------------
	function createInstruction(info) {
		var jsonInstruction = createBaseArchetype(info);
		//add default element here
		addActivityToInstruction(jsonInstruction);
		pushToArchetypeList(jsonInstruction, info);
	}

	function addActivityToInstruction(instruction) {
		//	var editor = archetypeEditService;
		var ItemTree = editor.getCComplexObject(undefined, "at0002", editor.getDefaultOccurrences(1, 1), "ITEM_TREE");
		var description = editor.getCSingleAttribute(ItemTree, editor.getDefaultExistence(1, 1), "description");
		var activityObject = editor.getCComplexObject(description, "at0001", editor.getDefaultOccurrences(0, 1), "ACTIVITY");
		var activitiesAttribute = editor.getCMultipleAttribute(activityObject, editor.getDefaultCardinality(0), editor.getDefaultExistence(1, 1), "activities");
		instruction.definition.attributes.push(activitiesAttribute);

		editor.synchronizeOriOntology("at0002", "Tree", "@internal@", instruction.ontology);
		editor.synchronizeOriOntology("at0001", "Current Activity", "Current Activity", instruction.ontology);
	}

	//------------create observation-------------------
	function createObservation(info) {
		var jsonObservation = createBaseArchetype(info);
		//add default element here
		addDataToObservation(jsonObservation);
		pushToArchetypeList(jsonObservation, info);
	}

	function getEvent() {
		var ItemTree = editor.getCComplexObject(undefined, "at0003", editor.getDefaultOccurrences(1, 1), "ITEM_TREE");
		var dataAttribute = editor.getCSingleAttribute(ItemTree, editor.getDefaultExistence(1, 1), "data");
		var eventObject = editor.getCComplexObject(dataAttribute, "at0002", editor.getDefaultOccurrences(0, 1), "EVENT");
		return eventObject;
	}

	function addDataToObservation(observation) {
		var eventObject = getEvent();
		var eventsAttribute = editor.getCMultipleAttribute(eventObject, editor.getDefaultCardinality(1), editor.getDefaultExistence(1, 1), "events");
		var historyObject = editor.getCComplexObject(eventsAttribute, "at0001", editor.getDefaultOccurrences(1, 1), "HISTORY");
		var dataAttribute = editor.getCSingleAttribute(historyObject, editor.getDefaultExistence(1, 1), "data");
		observation.definition.attributes.push(dataAttribute);

		editor.synchronizeOriOntology("at0001", "Event Series", "@ internal @", observation.ontology);
		editor.synchronizeOriOntology("at0002", "Any event", "*", observation.ontology);
		editor.synchronizeOriOntology("at0003", "Tree", "@ internal @", observation.ontology);
	}

	//end

	//--------------create evaluation----------------------
	function createEvaluation(info) {
		var jsonEvaluation = createBaseArchetype(info);
		//add default element here
		var itemTree = editor.getCComplexObject(undefined, "at0001", editor.getDefaultOccurrences(1, 1), "ITEM_TREE");
		editor.synchronizeOriOntology("at0001", "Tree", "@ internal @", jsonEvaluation.ontology);
		var dataAttribute = editor.getCSingleAttribute(itemTree, editor.getDefaultExistence(1, 1), "data");
		jsonEvaluation.definition.attributes.push(dataAttribute);
		pushToArchetypeList(jsonEvaluation, info);
	}

	//----------create admin_entry------------------------
	function createAdminEntry(info) {
		var jsonAdminEntry = createBaseArchetype(info);
		//add default element here
		var ItemTree = editor.getCComplexObject(undefined, "at0001", editor.getDefaultOccurrences(1, 1), "ITEM_TREE");
		var dataAttribut = editor.getCSingleAttribute(ItemTree, editor.getDefaultExistence(1, 1), "data");
		jsonAdminEntry.definition.attributes.push(dataAttribut);
		//synchronize the ontology
		editor.synchronizeOriOntology("at0001", "Tree", "@ internal @", jsonAdminEntry.ontology);
		pushToArchetypeList(jsonAdminEntry, info);
	}

	//---------create section---------------------------
	function createSection(info) {
		var jsonSection = createBaseArchetype(info);
		//editor.synchronizeOriOntology("at0001","Tree","@ internal @",jsonAdminEntry.ontology);
		pushToArchetypeList(jsonSection, info);
	}

	//---------create conposition-----------------------
	function createComposition(info) {
		var jsonCompositon = createBaseArchetype(info);
		var codePhrase = editor.getCCodePhraseWithPara("openehr", ['433'], undefined);
		var definingCode = editor.getCSingleAttribute(codePhrase, editor.getDefaultExistence(1, 1), "defining_code");
		var codeText = editor.getCComplexObject(definingCode, undefined, editor.getDefaultOccurrences(1, 1), "DV_CODED_TEXT");
		var category = editor.getCSingleAttribute(codeText, editor.getDefaultExistence(1, 1), "category");

		jsonCompositon.definition.attributes.push(category);

		pushToArchetypeList(jsonCompositon, info);
	}

	//-----create item tree---------------
	function createItemTree(info) {
		var jsonItemTree = createBaseArchetype(info);
		pushToArchetypeList(jsonItemTree, info);
	}

	//------create item list-----
	function createItemList(info) {
		var jsonItemList = createBaseArchetype(info);
		pushToArchetypeList(jsonItemList, info);
	}

	//----create item single----------
	function createItemSingle(info) {
		var jsonItemSingle = createBaseArchetype(info);
		pushToArchetypeList(jsonItemSingle, info);
	}

	//-----create item table--------
	function createItemTable(info) {//not absolutely right
		var jsonItemTable = createBaseArchetype(info);

		var rotated = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), "rotated");
		var cluster = editor.getCComplexObject([], "at0002", editor.getDefaultOccurrences(0, 1), "CLUSTER");
		var rows = editor.getCMultipleAttribute(cluster, editor.getDefaultCardinality(1), editor.getDefaultExistence(1, 1), "rows");

		jsonItemTable.definition.attributes.push(rows);
		jsonItemTable.definition.attributes.push(rotated);

		editor.synchronizeOriOntology("at0002", "row", "@interval@", jsonItemTable.ontology);
		editor.synchronizeOriOntology("at0001", "Table", "@interval@", jsonItemTable.ontology);
		pushToArchetypeList(jsonItemTable, info);
	}

	function createCluster(info) {
		var jsonCluster = createBaseArchetype(info);
		pushToArchetypeList(jsonCluster, info);
	}

	function createElement(info) {
		var jsonElement = createBaseArchetype(info);
		pushToArchetypeList(jsonElement, info);
	}

	//-----archetype create auxiliary function---------------

	function createBaseArchetype(info) {
		console.log("create action archetype here");
		var archetypeId = getArchetypeId(info);
		info.archetypeId = archetypeId;
		var jsonObj = {
			adl_version : "1.4",
			archetype_id : {
				value : archetypeId
			},
			concept : "at0000",
			definition : {
				attributes : [],
				node_id : "at0000",
				occurrences : editor.getDefaultOccurrences(0, 1),
				rm_type_name : info.entityType,
			},
			description : getDefaultDescription(),
			ontology : getDefaultOntology(info),
			original_language : getLanguage("en", "ISO_639-1"),
		};

		return jsonObj;

	}
  

	function pushToArchetypeList(jsonObj) {
		var adl = archetypeSerializeService.serializeArchetype(jsonObj);
		resourceService.post(ARCHETYPE_CREATE_BY_URL, {
			adl : adl,
		}).then(function(result) {
			if (result.succeeded) {
				$scope.needLocatedObjectName = jsonObj.archetype_id.value;
				$scope.initData();
				msgboxService.createMessageBox('ARCHETYPE_EDIT_SUCCEEDED', 'ARCHETYPE_EDIT_ADD_SUCCEEDED_HINT', {}, 'success');
			} else {
				msgboxService.createMessageBox('ARCHETYPE_EDIT_FAILED', 'ARCHETYPE_EDIT_ADD_FAILED_HINT', {
					errorMsg : result.message
				}, "error");
			}

		});
	}

	function getArchetypeListId() {
		var i, id = 0;

		for ( i = 0; i < $scope.draftArchetypeList.length; i++) {
			if ($scope.draftArchetypeList[i].id > id) {
				id = $scope.draftArchetypeList[i].id;
			}
		}
		if ($scope.publishedArchetypeList) {
			for ( i = 0; i < $scope.publishedArchetypeList.length; i++) {
				if ($scope.publishedArchetypeList[i].id > id) {
					id = $scope.publishedArchetypeList[i].id;
				}
			}
		}
		return id + 1;
	}

	function getArchetypeId(info) {
		return info.organization + "-" + info.referenceModel + '-' + info.entityType + "." + info.concept + ".v1.1";
	}

	function getLanguage(codeString, terminologyId) {
		return {
			code_string : codeString,
			terminology_id : {
				value : terminologyId,
			},
		};
	}

	function getDefaultDescription() {
		return {
			original_author : {
				_id : "name"
			},
			lifecycle_state : "0",
			details : {
				copyright : "",
				missue : "",
				purpose : "",
				use : "",
				language : getLanguage("en", "ISO_639-1"),
			},

			other_details : {
				_id : "",
				__text : "",
			}
		};
	}

   function getDefaultOntology(info){
   	    return {
   	    	term_definitions:[{
   	    		_language:"en",
   	    		items:[{
   	    			_code:"at0000",
   	    			items:[{_id:"text", __text:info.concept,},
   	    			       {_id:"description",__text:"*"}]
   	    		},]
   	    	}]
   	    };
   }
  
  //-----------------auxiliary function end---------------------------
    $scope.organizations =["openEHR","ZJU"];
    $scope.referenceModels = ['EHR', 'DEMOGRAPHIC'];
	var ehrEntity=[
	    "OBSERVATION",
	    "EVALUATION",
	    "INSTRUCTION",
	    "COMPOSITION",
	    "ADMIN_ENTRY",
	    "ACTION",
	    "ELEMENT",
	    "ITEM_LIST",
	    "ITEM_SINGLE",
	    "ITEM_TREE",
	    "ITEM_TABLE",
	    "CLUSTER",
	    "DEMOGRAPHIC",
	    "SECTION",
	 ];
	 var demograEntity = [
	    'ADDRESS',
	    'AGENT',
	    'CAPABILITY',
	    'CLUSTER',
	    'CONTACT',
	    'ELEMENT',
	    'GROUP',
	    'ITEM_LIST',
	    'ITEM_SINGLE',
	    'ITEM_TABLE',
	    'ITEM_TREE',
	    'ORGANISATION',
	    'PARTY_IDENTIFIED',
	    'PARTY_RELATIONSHIP',
	    'PERSON',
	    'ROLE',
	 ];
	 
	
	$scope.entityMap = {
		EHR : ehrEntity,
		DEMOGRAPHIC : demograEntity,
	};

	// archetype create modal-----------------
	$scope.openCreate = function(size) {
		var modalInstance = $modal.open({
			animation : true, //animations on
			templateUrl : 'archetypeCreate.html',
			controller : function ArchetypeCreateCtrl($scope, $modalInstance, organizations, referenceModels, entityMap) {
				$scope.organizations = organizations;
				$scope.referenceModels = referenceModels;
				$scope.entityMap = entityMap;
				$scope.organization = "";
				$scope.referenceModel = "";
				$scope.entityType = "";

				$scope.concept = "";
				$scope.$watch('referenceModel', function(newValue) {
					if (newValue) {
						$scope.entityTypes = $scope.entityMap[newValue];
					}
				});

				$scope.ok = function() {
					$modalInstance.close({
						organization : $scope.organization,
						referenceModel : $scope.referenceModel,
						entityType : $scope.entityType,
						concept : $scope.concept,
					});
				};
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			},
			size : size,
			resolve : {
				organizations : function() {
					return $scope.organizations;
				},
				referenceModels : function() {
					return $scope.referenceModels;
				},
				entityMap : function() {
					return $scope.entityMap;
				}
			}
		});
		modalInstance.result.then(function(message) {// modal message back
			$scope.newArchetypeBaseInfo = message;
			createArchetype(message);
		});

	};

	$scope.specialiseArchetype = function() {
		$scope.specialisedArchetype = $scope.selectedArchetype;
		$scope.openSpecialise('lg');
	};
	//--------specialise logic---------------

	specialiseArchetype = function(value, conceptName) {
		console.log("specialise archetype in eidt pane");
		var name = value.name;
		var length = name.length;
		var fontString = name.slice(0, name.indexOf('.') + 1);
		var tempString = name.slice(name.indexOf('.') + 1, length);
		var midString = tempString.slice(1, tempString.indexOf('.'));
		var lastString = tempString.slice(tempString.indexOf('.'), tempString.length);
		var result = fontString + midString + "-" + conceptName + lastString;

		$scope.specialisingArchetype = {};
		angular.copy(value, $scope.specialisingArchetype);
		var archetypeListId = getArchetypeListId();
		$scope.specialisingArchetype.id = archetypeListId;
		$scope.specialisingArchetype.specialiseArchetype = [];

		$scope.specialisingArchetype.name = result;

		//parse to a js object then edit it
		//value.specialiseArchetype.push($scope.specialisingArchetype);
		var originalArchetype = archetypeParseEditService.getOriginalArchetype($scope.specialisingArchetype.xml);
		console.log("specialising");
		console.log(originalArchetype);
		// code change logic
		var oriCode = originalArchetype.concept;
		var resultCode = oriCode + '.1';
		originalArchetype.concept = resultCode;
		originalArchetype.parent_archetype_id = {
			value : value.name,
		};
		originalArchetype.archetype_id.value = result;
		originalArchetype.definition.node_id = resultCode;
		var termDefinition = originalArchetype.ontology.term_definitions;

		if (angular.isArray(termDefinition)) {
			angular.forEach(termDefinition, function(term) {
				angular.forEach(term.items, function(item) {
					if (item._code == oriCode) {
						item._code = resultCode;
					}
				});
			});

		} else {
			angular.forEach(termDefinition.items, function(item) {
				if (item._code == oriCode) {
					item._code = resultCode;
				}
			});
		}
		//logic end
		var adl = archetypeSerializeService.serializeArchetype(originalArchetype);
		var xml = archetypeSerializeService.serializeArchetypeToXml(originalArchetype);

		$scope.specialisingArchetype.xml = '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + '<archetype xmlns="http://schemas.openehr.org/v1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' + formatXml(xml) + '</archetype>';
		$scope.specialisingArchetype.adl = adl;
		value.specialiseArchetype.push($scope.specialisingArchetype);
		console.log(value);
		console.log($scope.specialisingArchetype);

		return $scope.specialisingArchetype;
	};

	$scope.openSpecialise = function(size) {
		var modalInstance = $modal.open({
			animation : true,
			templateUrl : 'archetypeSpecialise.html',
			controller : function ArchetypeSpecialiseCtrl($scope, $modalInstance, specialisingArchetypeName) {
				$scope.archetypeName = specialisingArchetypeName;
				$scope.newConceptName = '';
				$scope.ok = function() {
					$modalInstance.close({
						newConceptName : $scope.newConceptName,
					});
				};
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			},
			size : size,
			resolve : {
				specialisingArchetypeName : function() {
					return $scope.specialisingArchetypeName;
				}
			}
		});
		modalInstance.result.then(function(message) {
			specialiseArchetype($scope.specialisedArchetype, message.newConceptName);
			$scope.locateArchetype($scope.specialisingArchetype);

		});

	};

	function formatXml(xml) {
		var formatted = '';
		var reg = /(>)(<)(\/*)/g;
		xml = xml.replace(reg, '$1\r\n$2$3');
		var pad = 0;
		jQuery.each(xml.split('\r\n'), function(index, node) {
			var indent = 0;
			if (node.match(/.+<\/\w[^>]*>$/)) {
				indent = 0;
			} else if (node.match(/^<\/\w/)) {
				if (pad != 0) {
					pad -= 1;
				}
			} else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
				indent = 1;
			} else {
				indent = 0;
			}

			var padding = '';
			for (var i = 0; i < pad; i++) {
				padding += '  ';
			}

			formatted += padding + node + '\r\n';
			pad += indent;
		});
		formatted = formatted.replace(/\n$/, '');

		return formatted;
	}

	
};























