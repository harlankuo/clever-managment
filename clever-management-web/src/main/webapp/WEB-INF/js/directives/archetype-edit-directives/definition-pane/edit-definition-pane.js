angular.module('clever.management.directives.editDefinitionPane', []).directive('editDefinitionPane', function(archetypeSerializeService, archetypeEditService, archetypeParseEditService) {
	return {
		restrict : 'E',
		transclude : true,
		scope : {
			definition : '=',
			ontology : '=',
			languages : '=',
			maxHeight : '=',
		},
		templateUrl : 'js/directives/archetype-edit-directives/definition-pane/edit-definition-pane.html',

		controller : function($scope, $element, $attrs) {
            
        // node value logic ---??
            $scope.setValue = function(code){
            	angular.forEach($scope.ordinalCodes, function(value){
            		if(code!=value){
            			value.selected=undefined;
            		}
            	});
            	code.selected = "code-selected";
            };
           $scope.ordinalCodes = [
            {selected:undefined,
           	number:1,},
            {selected:undefined,
           	number:1,},
           	 {selected:undefined,
           	number:1,},
           ];
            $scope.dateTimePartterList=[{name : "asdf"},{name:"sdfas"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},{name : "asdf"},];
		    $scope.nodeBindUrl = 'nodeBind.html';
		    //node value logic end
		    
		
	         //node term bind 
	         $scope.selectedTerminology;
	         $scope.terminologyList = ['DS800','DSM-III-R, 1987','Current Dental Terminology(CDT), 4'];
	         $scope.currentTerminology;
	         $scope.avaiTerminologyList = ['DS800'];
	         $scope.add2AvailableList = function(){
	         	var hasExist;
	         	var terminology=  $scope.selectedTerminology;
	         	angular.forEach($scope.avaiTerminologyList,function(termi){
	         		if(termi == terminology){
	         			 hasExist = true;
	         		}
	         	});
	         	if(hasExist){
	         		return;
	         	}
           	$scope.avaiTerminologyList.push(terminology);
           	$scope.currentTerminology = terminology;
	         };
	         //
			
            
          $scope.$watch('languages',function(newValue){
          	if(newValue){
          		$scope.definitionLanguage = $scope.languages.originalLanguage;
          	}
          });


   
			//------constraint logic start -------------
			$scope.EXISTENCE = ["REQUIRED", "OPTIONAL", "NOT_ALLOWED"];

			$scope.getNodeInfo = function(node) {
				getLanguageList();
				$scope.currentLanguage = $scope.languages.originalLanguage;
				console.log($scope.currentLanguage);
				console.log("this is the selected node");
				console.log(node);
				$scope.currentNode = node;
				$scope.occurrences = node.oriNodeRef.occurrences;

				$scope.cardinality = node.oriNodeRef.cardinality;
				$scope.existence = node.oriNodeRef.existence;
				if ($scope.occurrences) {
					$scope.simpleOccurrences = {
						lower : parseInt($scope.occurrences.lower), //occurrences.lower,//
						upper : isTrue($scope.occurrences.upper) ? parseInt($scope.occurrences.upper) : undefined,
					};
				}
				if ($scope.existence) {
					$scope.simpleExistence = {
						value : "",
					};
					if ($scope.existence.lower == "1") {
						$scope.simpleExistence.value = "REQUIRED";

					} else if ($scope.existence.upper == "1" && $scope.existence.lower == "0") {
						$scope.simpleExistence.value = "OPTIONAL";
					} else {
						$scope.simpleExistence.value = "NOT_ALLOWED";
					}
				}

				if ($scope.cardinality) {
					$scope.simpleCardinality = {
						lower : parseInt($scope.cardinality.interval.lower),
						upper : isTrue($scope.cardinality.interval.upper) ? parseInt($scope.cardinality.interval.upper) : undefined,
					};
					console.log($scope.simpleCardinality);
				}
				
				
				
				//get ontology information
				var nodeId = node.oriNodeRef.node_id;
				if(nodeId){
				$scope.ontologyItem = getOntologyByNodeId(nodeId);
				}
               console.log($scope.ontologyItem);
			};
          
			function getLanguageList() {
				$scope.languageList = [];
				if (angular.isArray($scope.languages.languages)) {
					angular.forEach($scope.languages.languages, function(language) {
						$scope.languageList.push(language.code);
					});
				} else {
					$scope.languageList.push($scope.languages.languages.code);
				}
			}
           $scope.$watch('currentLanguage.code',function(newValue,oldValue){
           	  if(newValue&&oldValue){
           	  	$scope.ontologyItem = getOntologyByNodeId($scope.currentNode.oriNodeRef.node_id);
           	  }
           });

			$scope.$watch('simpleOccurrences.lower', function(newValue, oldValue) {
				if (newValue && oldValue) {
					$scope.currentNode.oriNodeRef.occurrences.lower = newValue.toString();
				}
			});
			$scope.$watch('simpleOccurrences.upper', function(newValue, oldValue) {
				if (newValue && oldValue) {
					$scope.currentNode.oriNodeRef.occurrences.upper = newValue.toString();
				}
			});
			$scope.$watch('simpleExistence.value', function(newValue, oldValue) {
				if (newValue && oldValue) {
					switch(newValue) {
					case "REQUIRED":
						$scope.existence.lower = "1";
						$scope.existence.upper = "1";
						break;
					case "OPTIONAL":
						$scope.existence.lower = "0";
						$scope.existenc.upper = "1";
						break;
					case "NOT_ALLOWED":
						$scope.existence.lower = "0";
						$scope.existence.upper = "0";
						break;
					}
				}
			});
			$scope.$watch('simpleCardinality.upper', function(newValue, oldValue) {
				if (newValue && oldValue) {
					$scope.currentNode.oriNodeRef.cardinality.interval.upper = newValue.upper.toString();
				}
			});
			$scope.$watch('simpleCardinality.lower', function(newValue, oldValue) {
				if (newValue && oldValue) {
					$scope.currentNode.oriNodeRef.cardinality.interval.lower = newValue.lower.toString();
				}
			});

			function isTrue(value) {
				return value != undefined && value != null;
			}

			//--------------------constraint logic end--------------------------

         
        
         //ontology logic start
        
         function getOntologyByNodeId(nodeId){
         	var termDefinitions = $scope.ontology.term_definitions;
         	var ontologyTerm;
         	if(termDefinitions){
         		termDefinitions = termDefinitions.oriNodeRef;
         		if(angular.isArray(termDefinitions)){
         			angular.forEach(termDefinitions,function(termDefinition){
         				if(termDefinition._language == $scope.currentLanguage.code){
         					ontologyTerm =  getTerm(termDefinition.items,nodeId);
         					}
         			});
         		}
         		else {
         			if(termDefinitions._language == $scope.currentLanguage.code){
         				ontologyTerm = getTerm(termDefinitions.items,nodeId);
         			}
         		}
         	}
         	return ontologyTerm;
         }
       
			function getTerm(items, nodeId) {
				var ite;
				if (angular.isArray(items)) {
					angular.forEach(items, function(item) {
						if (item._code == nodeId) {
							amendItem(item.items);
							ite = item.items;
						}
					});
				} else {
					if (items._code == nodeId) {
						amendItem(items.items);
						ite = items.items;
					}
				}
				return ite;
			}

         function amendItem(items){
         	if(items[0]._id != "text"){     		
         
         		angular.forEach(items,function(item){
         			if(item._id == "text"){
         				var temp;
         				temp = items[0];
         				items[0] = item;
         				item = temp;
         			}
         		});
         	}
         	
         	if(items[1]._id != "description" ){
         		angular.forEach(items,function(item){
         			if(item._id == "description"){
         				var temp;
         				temp = items[1];
         				items[1] = item;
         				item = temp;
         			}
         		});
         	}
         	
         }
         
         
         // synchronize two section of ontology       
         $scope.$watch('ontologyItem[0].__text',function(newValue, oldValue){
         	if(newValue && oldValue){
         		setOntology(newValue);
         	}
         });
         function setOntology(value){
           var temp = $scope.getOntologyByCode($scope.currentNode.label.code);
           temp.text=value;     
         }
         //ontology logic end 
        
        
	
			//------------------------------------------------------------------------------------------
			
			
			var editor = archetypeEditService;
			//get the editor
			var parser = archetypeParseEditService;
			//get the parser

			$scope.treeControl = {};
			$scope.isCollapse = true;
			$scope.collapse = function() {
				$scope.treeControl.collapseAll();
				$scope.isCollapse = true;

			};

			$scope.expand = function() {
				$scope.treeControl.expandAll();
				$scope.isCollapse = false;
			};
			
			

			
			
		
           //when display the type in this type list,we want it display the parentAttribue text
			var typeWithSlot = ['ITEM_TREE', 'ITEM_LIST', 'CLUSTER'];
			var typeWithInterval = ['ITEM_TREE', 'ITEM_LIST', 'CLUSTER'];
// 
			// $scope.getTreeNodeMenu = function(node, aliasName) {
//       
				// var menuHtml = '<ul class="dropdown-menu" role="menu" ng-if="true" >';
				// if (node.label.slot) {
				// } else {
// 
					// if (typeWithSlot.indexOf(node.label.picType) != -1) {
						// menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">Slot</a>' + '<ul class="dropdown-menu">' + '<li class="menu-item " ng-repeat = "value in nodeMenu.baseSlotType"><a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ', BaseSlot + value)">{{value}}</a></li>' + '</ul></li>';
					// }
                    // // if the pictype is 'section', the submenu should be section slot type 
					// if (node.label.picType == 'SECTION') {
						// menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">Slot</a>' + '<ul class="dropdown-menu">' + '<li class="menu-item " ng-repeat = "value in nodeMenu.sectionSlotType"><a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ',SectionSlot + value)">{{value}}</a></li>' + '</ul></li>';
					// }
                    // // get submenu which interval type should have
					// if (typeWithInterval.indexOf(node.label.picType) != -1) {
						// menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">INTERVAL</a>' + '<ul class="dropdown-menu">' + '<li class="menu-item " ng-repeat = "value in nodeMenu.intervalType"><a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ',value)">{{value}}</a></li>' + '</ul></li>';
					// }
					// if (node.label.picType.indexOf('<') == -1) {
						// menuHtml += '<li  ng-repeat = "item in nodeMenu.' + node.label.picType + '"><a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ',item)">{{item}}</a></li>';
					// }
				// }
// 
				// menuHtml += '</ul>';
// 
				// return menuHtml;
			// };

            $scope.getTreeNodeMenu = function(node, aliasName) {
                var menuList;
				var menuHtml = '<ul class="dropdown-menu" role="menu" ng-if="true" >';
				if (node.label.slot) {
				} else {
					if (typeWithSlot.indexOf(node.label.picType) != -1) {				
						menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">Slot</a>' + 
						'<ul class="dropdown-menu">' ;				
						angular.forEach($scope.nodeMenu.baseSlotType, function(menuItem){
							menuHtml += '<li class="menu-item ">' +
						                '<a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ', '+ '\'' + 'BS_' + menuItem +'\')">' +menuItem + '</a></li>' ;
						});					
						menuHtml += '</ul></li>';
					}
                    // if the pictype is 'section', the submenu should be section slot type 
					if (node.label.picType == 'SECTION') {
					    menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">Slot</a>' + 
						'<ul class="dropdown-menu">' ;
						angular.forEach($scope.nodeMenu.sectionSlotType, function(menuItem){
							menuHtml += '<li class="menu-item ">' +
						                '<a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ', '+ '\'' + 'SS_' + menuItem +'\')">' +menuItem + '</a></li>' ;
						});						
						menuHtml += '</ul></li>';					
					}
                    // get submenu which interval type should have
					if (typeWithInterval.indexOf(node.label.picType) != -1) {
					    menuHtml += '<li class="menu-item dropdown dropdown-submenu" ng-if="item==slot"><a class="dropdown-toogle" data-toogle="dropdown">INTERVAL</a>' + '<ul class="dropdown-menu">';
						angular.forEach($scope.nodeMenu.intervalType, function(menuItem){
							menuHtml += '<li class="menu-item ">' +
						                '<a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ', '+ '\'' + menuItem +'\')">' + menuItem +  '</a></li>' ;
						});				
						menuHtml += '</ul></li>';
					}
					if (node.label.picType.indexOf('<') == -1) {
						angular.forEach($scope.nodeMenu[node.label.picType], function(menuItem){
							menuHtml += '<li class="menu-item ">' +
						                '<a class="pointer" role="menuitem"  ng-click="editNodeByMenu(' + aliasName + ', '+ '\'' + menuItem +'\')">' +menuItem + '</a></li>' ;
						});
					}
				}
				menuHtml += '</ul>';
				return menuHtml;
			};
			
            
			$scope.nodeMenu = {
				ACTION :         ["Ism_Transitions", "Protocol", "Subject", "otherParticipations", "Links"],
				OBSERVATION :    ["Data", "State", "Protocol", "Subject", "otherParticipations", "Links"],
				EVALUATION :     ["Protocol", "Subject", "otherParticipations", "Links"],
				INSTRUCTION :    ["Protocol (0-1)", "Subject", "otherParticipations", "Links"],
				ADMIN_ENTRY :    ["Data", "State", "Protocol", "Subject", "otherParticipations", "Links"],
				SECTION :        ['sub_Section'],
				COMPOSITION :    ["Content", "Context", "Protocol", "Composer", "Category", "Language", "Territory"],
				ITEM_TREE :      ["TEXT", "CODED_TEXT", "QUANTITY", "COUNT", "DATE_TIME", "DURATION", "ORDINAL", "BOOLEAN", "MULTIMEDIA", "URI", "IDENTIFIER", "PROPERTION", "CLUSTER"],
				ITEM_LIST :      ["TEXT", "CODED_TEXT", "QUANTITY", "COUNT", "DATE_TIME", "DURATION", "ORDINAL", "BOOLEAN", "MULTIMEDIA", "URI", "IDENTIFIER", "PROPERTION", "CLUSTER"],
				CLUSTER :        ["TEXT", "CODED_TEXT", "QUANTITY", "COUNT", "DATE_TIME", "DURATION", "ORDINAL", "BOOLEAN", "MULTIMEDIA", "URI", "IDENTIFIER", "PROPERTION", "CLUSTER"],

				otherParticipations : ["Participation"],
				subject :        ['PARTY_SELF', 'PARTY_IDENTIFIED', 'PARTY_RELATED'],
				links :          ['LINK'],
				ism_transition : ['ISM_TRANSITION'],
				//data:['EVENT'],
				EVENT :          ['EVENT_STATE'],
				events :         ['EVENT'],
				activities :     ["ACTIVITY"],

				sectionSlotType : ['ACTION', 'INSTRUCTION', 'EVALUATION', 'OBSERVATION', 'ADMIN_ENTRY', 'ENTRY', 'SECTION'],
				baseSlotType :   ['ITEM', 'CLUSTER', 'ELEMENT'],
				intervalType :   ['INTERVAL[DATE_TIME]', 'INTERVAL[QUANTITY]', 'INTERVAL[INTEGER]']

			};


			
		
			//there would not a items attributs behind this type, so when we add a type to this node , a items attribute should be added;
			var needCheckedType = ['ITEM_TREE','ITEM_LIST','ITEM_TABLE','CLUSTER','SECTION'];
			var checkList = ['SECTION'];
			$scope.editArchetype = function(node, type) {
				if(needCheckedType.indexOf(node.label.picType) != -1){
					 editor.attributeCheck(node);
				}
				type = type.toLowerCase();//normalize the type

				switch(type) {
				case "otherparticipations":
					return addOtherParticipations(node);

				case "participation":
					return addParticipation(node);

				case "subject":
					return addSubject(node);

				//  subject:['PARTY_SELF','PARTY_IDENTIFIED','PARTY_RELATED'],
				case"party_self":
					return addPartySelf(node);

				case"party_identified":
					return addPartyIdentified(node);

				case"party_related":
					return addPartyRelated(node);

				case "links":
					return addLinks(node);

				case "link":
					return addLink(node);
				case "protocol":
					return addProtocol(node);

				//--------action--------
				case "ism_transitions":
					return addIsmTransitions(node);
				case "ism_transition":
					return addIsmTransition(node);

				//--------instruction-----
				case "activity":
					return addActivity(node);

				//--------observation--------
				case "data":
					return addData(node);
				case "state":
					return addState(node);
				case "event_state":
					return addStateToEvent(node);
				case "event":
					return addEvent(node);
				
				//---------section---------
				case 'sub_section':
					return addSubSection(node);
			    //ss means section slot
				case 'ss_action':
				case 'ss_observation':
				case 'ss_admin_entry':
				case 'ss_instruction':
				case 'ss_evaluation':
				case 'ss_entry':
				case 'ss_section':
					return addSectionSlot(node,type.slice(3,type.length).toUpperCase());
				

				//---------composition--------
				case 'context':
					return addContext(node);
				case 'content':
					return addContent(node);

				//------------base type--------
				case "text":
					var element = addText(node);
					return element;

				case "coded_text":
					return addCodedText(node);

				case "quantity":
					return addQuantity(node);

				case"count":
					return addCount(node);

				case"date_time":
					return addDateTime(node);

				case "duration":
					return addDuration(node);

				case "ordinal":
					return addOrdinal(node);

				case "boolean":
					return addBoolean(node);

				case "interval<quantity>":
					return addInterval_quantity(node);

				case "interval<integer>":
					return addInterval_integer(node);

				case "interval<date_time>":
					return addInterval_dateTime(node);

				case "multimedia":
					return addMultimedia(node);

				case "uri":
					return addUri(node);

				case "identifier":
					return addIdentifier(node);

				case"propertion":
					return addProportion(node);

				case "cluster":
					return addCluster(node);
				//bs : base type slot
				case "bs_element":
				case "bs_cluster":
				case "bs_item":
				   return addBaseSlot(node,type.slice(3,type.length).toUpperCase());
				//-----------base type end--------------

				}
			};

			function addSectionSlot(node, type) {
				console.log("before add");
				console.log(node);
				var nodeId = getNextNodeId();

				var slot = editor.getArchetypeSlot(type, nodeId, editor.getDefaultOccurrences(0, '*'), editor.defaultIncludes, undefined);
				node.oriNodeRef.attributes.children = pushTo(slot, node.oriNodeRef.attributes.children);
                
                editor.synchronizeOntology($scope.ontology, nodeId, "SLOT_"+type,"*");
                return   parser.myProcessNode(slot, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);       
			}
			
			function addSubSection(node){
			  var nodeId = getNextNodeId();
			  var subSection =editor.getCComplexObject([],nodeId,editor.getDefaultOccurrences(0,1),"SECTION");
			  node.oriNodeRef.attributes.children = pushTo(subSection, node.oriNodeRef.attributes.children);
			  
			  editor.synchronizeOntology($scope.ontology, nodeId, "sub_Section","*");
			  return parser.myProcessNode(subSection, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute); 
			 
			}

			//-------------archetype common attribute added function------
			//protocol function

			function addProtocol(node) {
				var nodeId = getNextNodeId();
				var Item_tree = getITEM_TREE(nodeId);
				var protocol = editor.getCSingleAttribute(Item_tree, editor.getDefaultExistence(1, 1), "protocol");
				node.oriNodeRef.attributes = pushTo(protocol, node.oriNodeRef.attributes);

				editor.synchronizeOntology($scope.ontology, nodeId, "Tree", "@ internal @");
				return parser.processAttribute(protocol, node, node.children, $scope.ontology.term_definitions);
			}

			function getITEM_TREE(nodeId) {
				return editor.getCComplexObject([], nodeId, editor.getDefaultOccurrences(1, 1), "ITEM_TREE");
			}

			//subject function
			function addSubject(node) {
				var subjectAttribute = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), "subject");
				node.oriNodeRef.attributes = pushTo(subjectAttribute, node.oriNodeRef.attributes);

				return parser.processAttribute(subjectAttribute, node, node.children, $scope.ontology.term_definitions);
				// return subjectAttribute;
			}

			//children type node follow the subject
			// PARTY_SELF, PARTY_IDENTIFIED, PARTY_RELATED
			function addPartySelf(node) {
				var nodeId = getNextNodeId();
				var genericId = editor.getCComplexObject([], "", editor.getDefaultOccurrences(1, 1), "GENERIC_ID");
				var id = editor.getCSingleAttribute(genericId, editor.getDefaultExistence(1, 1), "id");
				var PARTY_REF = editor.getCComplexObject(id, "", editor.getDefaultOccurrences(1, 1), "PARTY_REF");
				var externalRef = editor.getCSingleAttribute(PARTY_REF, editor.getDefaultExistence(1, 1), "externalRef");
				var PARTY_SELF = editor.getCComplexObject(externalRef, nodeId, editor.getDefaultOccurrences(1, 1), "PARTY_SELF");
				node.oriNodeRef.children = pushTo(PARTY_SELF, node.oriNodeRef.children);

				editor.synchronizeOntology($scope.ontology, nodeId, "New Party_Self", "*");
				return parser.myProcessNode(PARTY_SELF, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addPartyIdentified(node) {
				var PARTY_IDNENTIFIED = editor.getCComplexObject([], "", editor.getDefaultOccurrences(0, 1), "PARTY_IDENTIFIED");
				node.oriNodeRef.children = pushTo(PARTY_IDNENTIFIED, node.oriNodeRef.children);

				return parser.myProcessNode(PARTY_IDNENTIFIED, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}

			function addPartyRelated(node) {
				var DV_CODED_TEXT = getDV_CODED_TEXT();
				var relationship = editor.getCSingleAttribute(DV_CODED_TEXT, editor.getDefaultExistence(1, 1), "relationship");
				var PARTY_RELATED = editor.getCComplexObject(relationship, "", editor.getDefaultOccurrences(1, 1), "PARTY_RELATED");
				
				node.oriNodeRef.children = pushTo(PARTY_RELATED, node.oriNodeRef.children);
				return parser.myProcessNode(PARTY_RELATED, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}
			//subject function end


			//-----------------participation function--------------------------------

			function addOtherParticipations(node) {
				var nodeId = getNextNodeId();
				var parObject = editor.getCComplexObject([], nodeId, editor.getDefaultOccurrences(0, 1), "PARTICIPATION");
				var otherParAttribute = editor.getCMultipleAttribute(parObject, editor.getDefaultCardinality(1), editor.getDefaultExistence(1, 1), "otherParticipations");
				
				node.oriNodeRef.attributes = pushTo(otherParAttribute, node.oriNodeRef.attributes);
				editor.synchronizeOntology($scope.ontology, nodeId, "New Participation", "*");
				return parser.processAttribute(otherParAttribute, node, node.children, $scope.ontology.term_definitions);
			}

			function addParticipation(node) {
				var nodeId = getNextNodeId();
				var participation = editor.getCComplexObject([], nodeId, editor.getDefaultOccurrences(0, 1), "PARTICIPATION");			
				
				node.oriNodeRef.children = pushTo(participation, node.oriNodeRef.children);
				editor.synchronizeOntology($scope.ontology, nodeId, "New Participation", "*");
				return parser.myProcessNode(participation, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			//participation function end

			// links function
			function addLinks(node) {
				var links = editor.getCSingleAttribute([], editor.getDefaultExistence(0, 1), "links");
				
				node.oriNodeRef.attributes = pushTo(links, node.oriNodeRef.attributes);
				return parser.processAttribute(links, node, node.children, $scope.ontology.term_definitions);
			}

			function addLink(node) {
				var nodeId = getNextNodeId();
				var DV_TEXT = getDV_TEXT("value");
				var meaning = editor.getCSingleAttribute(DV_TEXT, editor.getDefaultExistence(1, 1), "meaning");
				var DV_EHR_URI = getDV_EHR_URI("value");
				var target = editor.getCSingleAttribute(DV_EHR_URI, editor.getDefaultExistence(1, 1), "target");
				var LINK = editor.getCComplexObject([meaning, target], nodeId, editor.getDefaultOccurrences(0, 1), "LINK");

				node.oriNodeRef.children = pushTo(LINK, node.oriNodeRef.children);
				editor.synchronizeOntology($scope.ontology, nodeId, "New Link", "*");
				return parser.myProcessNode(LINK, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}
			//link function end


			//-----------------compositoin archetype--------------------------
			function addContext(node) {
				var nodeId = getNextNodeId();
				var itemTree = getITEM_TREE(nodeId);
				var otherContext = editor.getCSingleAttribute(itemTree, editor.getDefaultExistence(1, 1), 'other_context');
				var EVENT_CONTEXT = editor.getCComplexObject(otherContext, '', editor.getDefaultOccurrences(1, 1), 'EVENT_CONTEXT');
				var context = editor.getCSingleAttribute(EVENT_CONTEXT, editor.getDefaultExistence(1, 1), 'context');
				
				editor.synchronizeOntology($scope.ontology, nodeId, "Tree", "*");
				node.oriNodeRef.attributes = pushTo(context, node.oriNodeRef.attributes);
				var returnObj = parser.processAttribute(context, node, node.children, $scope.ontology.term_definitions);
				return returnObj;
			}

			function addContent(node) {
				var content = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), 'content');
				node.oriNodeRef.attributes = pushTo(content, node.oriNodeRef.attributes);

				return parser.processAttribute(content, node, node.children, $scope.ontology.term_definitions);
			}
			

			//------------attribute for action archetype--------------------

			function addIsmTransitions(node) {
				var ism_transition = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), "ism_transition");
				
				node.oriNodeRef.attributes = pushTo(ism_transition, node.oriNodeRef.attributes);
				return parser.processAttribute(ism_transition, node, node.children, $scope.ontology.term_definitions);
			}

			function addIsmTransition(node) {
				var nodeId = getNextNodeId();
				var DV_CODED_TEXT_1 = getDV_CODED_TEXT();
				var current_state = editor.getCSingleAttribute(DV_CODED_TEXT_1, editor.getDefaultExistence(1, 1), "current_state");
				var DV_CODED_TEXT_2 = getDV_CODED_TEXT();
				var careflow_step = editor.getCSingleAttribute(DV_CODED_TEXT_2, editor.getDefaultExistence(1, 1), "careflow_step");
				var ISM_TRANSITION = editor.getCComplexObject([current_state, careflow_step], nodeId, editor.getDefaultOccurrences(1, 1), "ISM_TRANSITION");

				node.oriNodeRef.children = pushTo(ISM_TRANSITION, node.oriNodeRef.children);
				editor.synchronizeOntology($scope.ontology, nodeId, "New Ism_Transition", "*");
				return parser.myProcessNode(ISM_TRANSITION, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}

			
			//-------------------instruction archetype-----------------

			function addActivity(node) {
				var nodeId_tree = getNextNodeId();
				var ItemTree = getITEM_TREE(nodeId_tree);
				editor.synchronizeOntology($scope.ontology, nodeId_tree, "Tree", "*");
				var nodeId_acti = getNextNodeId();
				var description = editor.getCSingleAttribute(ItemTree, editor.getDefaultExistence(1, 1), "description");
				var activityObject = editor.getCComplexObject(description, nodeId_acti, editor.getDefaultOccurrences(0, 1), "ACTIVITY");
				editor.synchronizeOntology($scope.ontology, nodeId_acti, "New Acitivity", "*");

				node.oriNodeRef.children = pushTo(activityObject, node.oriNodeRef.children);

				return parser.myProcessNode(activityObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}

			

			// -------------observation archetype-----------------------------

			function getPath(event) {

				var dataPath;
				var statePath;
				if (angular.isArray(event.attributes)) {
					angular.forEach(event.attributes, function(attribute) {
						if (attribute.rm_attribute_name == "data") {
							dataPath = attribute.children.idPath;
						}
						if (attribute.rm_attribute_name == "state") {
							statePath = attribute.children.idPath;
						}
					});
				} else {
					attribute = event.attributes;
					if (attribute.rm_attribute_name == "data") {
						dataPath = attribute.children.idPath;
					}
					if (attribute.rm_attribute_name == "state") {
						statePath = attribute.children.idPath;
					}
				}
				return {
					dataPath : dataPath,
					statePath : statePath,
				};
			}

			function addEvent(node) {
				var path;
				var amiEvent;
				if (angular.isArray(node.oriNodeRef.children)) {
					aimEvent = node.oriNodeRef.children[0];
				} else {
					aimEvent = node.oriNodeRef.children;

				}
				
				path = getPath(aimEvent);

				var nodeId = getNextNodeId();
				var EVENT = editor.getCComplexObject([], nodeId, editor.getDefaultOccurrences(1, 1), "EVENT");
				if (path.dataPath) {
					var dataRef = editor.getArchetypeInternalRef('ITEM_TREE', editor.getDefaultOccurrences(1, 1), path.dataPath);
					var dataAttr = editor.getCSingleAttribute(dataRef, editor.getDefaultExistence(1, 1), "data");
					EVENT.attributes.push(dataAttr);
				}
				if (path.statePath) {
					var stateRef = editor.getArchetypeInternalRef('ITEM_TREE', editor.getDefaultOccurrences(1, 1), path.statePath);
					var stateAttr = editor.getCSingleAttribute(stateRef, editor.getDefaultExistence(1, 1), "state");
					EVENT.attributes.push(stateAttr);
				}
				
				editor.synchronizeOntology($scope.ontology, nodeId, "Any Events", "*");
				node.oriNodeRef.children = pushTo(EVENT, node.oriNodeRef.children);
				return parser.myProcessNode(EVENT, node, node.children, $scope.ontology.term_definitions);

			}

			function addState(node) {
				var HISTORY = getHISTORY($scope.ontology);
				var stateAttribute = editor.getCSingleAttribute(HISTORY, editor.getDefaultExistence(1, 1), "state");
			
				node.oriNodeRef.attributes = pushTo(stateAttribute, node.oriNodeRef.attributes);
				return parser.processAttribute(stateAttribute, node, node.children, $scope.ontology.term_definitions);
				//return stateAttribute;

			}

			function synchronizeOtherEvents(node) {
				var oriEvents = node.parent.oriNodeRef.children;
				var disEvents = node.parent.children;
				if (angular.isArray(oriEvents) && oriEvents.length > 1) {
					path = getPath(oriEvents[0]);
					for (var i = 1; i < oriEvents.length; i++) {
						if (path.statePath) {
							var stateRef = editor.getArchetypeInternalRef('ITEM_TREE', editor.getDefaultOccurrences(1, 1), path.statePath);
							var stateAttr = editor.getCSingleAttribute(stateRef, editor.getDefaultExistence(1, 1), "state");
							oriEvents[i].attributes.push(stateAttr);
							parser.processAttribute(stateAttr, disEvents[1], disEvents[i].children, $scope.ontology.term_definitions);
						}
					};
				}
			}

			function getEVENT(ontology) {
				var nodeId_itemTree = editor.getTermDefinitionNodeId(ontology);
				var ItemTree = getITEM_TREE(nodeId_itemTree);
				editor.synchronizeOntology(ontology, nodeId_itemTree, "Tree", "@ internal @");
				var dataAttribute = editor.getCSingleAttribute(ItemTree, editor.getDefaultExistence(1, 1), "data");
				var nodeId_event = editor.getTermDefinitionNodeId(ontology);
				var eventObject = editor.getCComplexObject(dataAttribute, nodeId_event, editor.getDefaultOccurrences(0, 1), "EVENT");
				editor.synchronizeOntology(ontology, nodeId_event, "Any event", "*");
				return eventObject;
			}

			function getHISTORY(ontology) {
				var nodeId_history = editor.getTermDefinitionNodeId(ontology);
				var eventObject = getEVENT(ontology);
				var eventsAttribute = editor.getCMultipleAttribute(eventObject, editor.getDefaultCardinality(1), editor.getDefaultExistence(1, 1), "events");
				var historyObject = editor.getCComplexObject(eventsAttribute, nodeId_history, editor.getDefaultOccurrences(1, 1), "HISTORY");
				editor.synchronizeOntology(ontology, nodeId_history, "state Event Series", "@ internal @");
				return historyObject;
			}

			function addStateToEvent(node) {
				var nodeId = getNextNodeId();
				var itemTree = getITEM_TREE(nodeId);
				editor.synchronizeOntology($scope.ontology, nodeId, "Tree", "@ internal @");
				var state = editor.getCSingleAttribute(itemTree, editor.getDefaultExistence(1, 1), "state");
				node.oriNodeRef.attributes = pushTo(state, node.oriNodeRef.attributes);
				var returnedNode = parser.processAttribute(state, node, node.children, $scope.ontology.term_definitions);
				synchronizeOtherEvents(node);

				//parser.myProcessNode(node.parent.oriNodeRef.children, node.parent, node.parent.children, $scope.ontology.term_definitions);
				return returnedNode;
			}

		
			//==========================add base type node  function==================================

			//this function can be used to add element which is not special type ,just a ccomplexibject and attribute.no CType
			function addElement(node, type) {
				//attributeCheck(node);
				var nodeId = getNextNodeId();
				var baseObject = editor.getCComplexObject(undefined, "", editor.getDefaultOccurrences(1, 1), type);
				var attribute = editor.getCSingleAttribute(baseObject, editor.getDefaultExistence(1, 1), "value");
				var element = editor.getCComplexObject(attribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(element, node.oriNodeRef.attributes.children);		

				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				
			
				return parser.myProcessNode(element, node, node.children,$scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addText(node) {
				return addElement(node, "DV_TEXT");
				console.log(node);
			}

		
			function addCodedText(node) {
				var element = addElement(node, "DV_CODED_TEXT");
				var defining_code = editor.getCSingleAttribute(undefined, editor.getDefaultExistence(1, 1), "defining_code");
				element.oriNodeRef.attributes.children.attributes = defining_code;

				return element;

			}


			function addQuantity(node) {
				var nodeId = getNextNodeId();
				var cDvQuantity = editor.getCDvQuantity();
				var attribute = editor.getCSingleAttribute(cDvQuantity, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(attribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);

				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				//return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}

			function addCount(node) {
				return addElement(node, "DV_COUNT");
			}

			function addDateTime(node) {
				var cDateTime = editor.getCDateTime();
				var primitiveObject = editor.getCPrimitiveObject(cDateTime, "", editor.getDefaultOccurrences(1, 1), "DATE_TIME");
				var nodeId = getNextNodeId();
				var bottomAttribute = editor.getCSingleAttribute(primitiveObject, editor.getDefaultExistence(1, 1), "value");
				var dateTimeObject = editor.getCComplexObject(bottomAttribute, undefined, editor.getDefaultOccurrences(0, 1), "DV_DATE_TIME");
				var topAttribute = editor.getCSingleAttribute(dateTimeObject, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(topAttribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);

				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				//return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}

			function addDuration(node) {
				var cDuration = editor.getCDuration();
				var primitiveObject = editor.getCPrimitiveObject(cDuration, "", editor.getDefaultOccurrences(1, 1), "DURATION");
				var nodeId = getNextNodeId();
				var bottomAttribute = editor.getCSingleAttribute(primitiveObject, editor.getDefaultExistence(1, 1), "value");
				var durationObject = editor.getCComplexObject(bottomAttribute, undefined, editor.getDefaultOccurrences(0, 1), "DV_DURATION");
				var topAttribute = editor.getCSingleAttribute(durationObject, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(topAttribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);				

				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addOrdinal(node) {
				var cDvOrdinal = editor.getCDvOrdinal();
				var attribute = editor.getCSingleAttribute(cDvOrdinal, editor.getDefaultExistence(1, 1), "value");
				var nodeId = getNextNodeId();
				var eleObject = editor.getCComplexObject(attribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);
							
				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addBoolean(node) {
				var cBoolean = editor.getCBoolean();
				var primitiveObject = editor.getCPrimitiveObject(cBoolean, "", editor.getDefaultOccurrences(1, 1), "BOOLEAN");
				var nodeId = getNextNodeId();
				var bottomAttribute = editor.getCSingleAttribute(primitiveObject, editor.getDefaultExistence(1, 1), "value");
				var durationObject = editor.getCComplexObject(bottomAttribute, undefined, editor.getDefaultOccurrences(0, 1), "DV_BOOLEAN");
				var topAttribute = editor.getCSingleAttribute(durationObject, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(topAttribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);
			
				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addInterval_quantity(node) {
				var nodeId = getNextNodeId();
				var cDvQuantity_upper = editor.getCDvQuantity();
				var cDvQuantity_lower = editor.getCDvQuantity();
				var eleObject = addInterval(cDvQuantity_upper, cDvQuantity_lower, "DV_QUANTITY", nodeId);
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);
			
				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);


			}

			function addInterval_dateTime(node) {
				var nodeId = getNextNodeId();
				var cDateTime_upper = editor.getCDateTime();
				var cDateTime_lower = editor.getCDateTime();
				var eleObject = addInterval(cDateTime_upper, cDateTime_lower, "DV_DATE_TIME", nodeId);
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);

				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);

			}

			function addInterval_integer(node) {
				var nodeId = getNextNodeId();
				var count_upper = editor.getCComplexObject(undefined, "", editor.getDefaultOccurrences(1, 1), "DV_COUNT");
				var count_lower = editor.getCComplexObject(undefined, "", editor.getDefaultOccurrences(1, 1), "DV_COUNT");
				var eleObject = addInterval(count_upper, count_lower, "DV_COUNT",nodeId);
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);

				
				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions,node.childrenAttribute);

			}

			function addInterval(upper, lower, type,nodeId) {
				var objectName = "DV_INTERVAL<" + type + ">";
				var upperAttribute = editor.getCSingleAttribute(lower, editor.getDefaultExistence(1, 1), "lower");
				var lowerAttribute = editor.getCSingleAttribute(upper, editor.getDefaultExistence(1, 1), "upper");
				var attributes = [upperAttribute, lowerAttribute];
				var intervalObject = editor.getCComplexObject(attributes, undefined, editor.getDefaultOccurrences(1, 1), objectName);
				var topAttribute = editor.getCSingleAttribute(intervalObject, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(topAttribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");

				//add display object
				return eleObject;

			}

			function addMultimedia(node) {
				var nodeId = getNextNodeId();
				var cCodePhrase = editor.getCCodePhrase();
				cCodePhrase.terminology_id = {};
				cCodePhrase.terminology_id.value = "openEHR";
				var bottomAttribute = editor.getCSingleAttribute(cCodePhrase, editor.getDefaultExistence(1, 1), "media_type");
				var mediaObject = editor.getCComplexObject(bottomAttribute, "", editor.getDefaultOccurrences(0, 1), "DV_MULTIMEDIA");
				var topAttribute = editor.getCSingleAttribute(mediaObject, editor.getDefaultExistence(1, 1), "value");
				var eleObject = editor.getCComplexObject(topAttribute, nodeId, editor.getDefaultOccurrences(0, 1), "ELEMENT");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);

				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Element", "*");
				// return disObject;
                return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions);

			}

			function addUri(node) {
				return addElement(node, "DV_URI");
			}

			function addIdentifier(node) {
				return addElement(node, "DV_IDENTIFIER");
			}

			function addProportion(node) {
				return addElement(node, "DV_PROPORTION");
			}
            
			function addCluster(node) {
				var nodeId = getNextNodeId();
				var eleObject = editor.getCComplexObject("", nodeId, editor.getDefaultOccurrences(0, 1), "CLUSTER");
				node.oriNodeRef.attributes.children = pushTo(eleObject, node.oriNodeRef.attributes.children);
				//shchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, "New Cluster", "*");			
				return parser.myProcessNode(eleObject, node, node.children, $scope.ontology.term_definitions);

			}

			function addParsable(node) {
				return addElement(node, "DV_PARSABLE");
			}

			function addBaseSlot(node, type) {
				var nodeId = getNextNodeId();
				var slotObject = editor.getArchetypeSlot(type, nodeId, editor.getDefaultOccurrences(0, 1), editor.defaultIncludes, undefined);
				node.oriNodeRef.attributes.children = pushTo(slotObject, node.oriNodeRef.attributes.children);
		
				//synchronize ontology
				editor.synchronizeOntology($scope.ontology, nodeId, type, "*");
				return parser.myProcessNode(slotObject, node, node.children, $scope.ontology.term_definitions, node.childrenAttribute);
			}
			
 // ['PARTY_REF','DV_TEXT', 'DV_CODED_TEXT', 'DV_QUANTITY', 'DV_ORDINAL', 
 // 'DV_DATE_TIME', 'DV_DATE', 'DV_TIME', 'DV_BOOLEAN', 'DV_COUNT', 'DV_DURATION', 
 // 'DV_INTERVAL<DV_DATE>', 'DV_INTERVAl<DV_TIME>', 'DV_INTERVAL<DV_DATE_TIME>', 
 // 'DV_INTERVAL<COUNT>', 'DV_INTERVAL<QUANTITY>', 'DV_MULTIMEDIA', 'DV_URI', 'DV_EHR_URI', 
 // 'DV_PROPORTION', 'DV_IDENTIFIER', 'DV_PARSABLE', 'DV_BOOLEAN'];

			function getDV_TEXT(){}
			function getDV_CODED_TEXT(){}
			function getDV_QUANTITY(){}
			function getDV_ORDINAL(){}
			function getDV_DATE_TIME(){}
			function getDV_DATE(){}
			function getDV_TIME(){}
			function getDV_BOOLEAN(){}
			function getDV_COUNT(){}
			function getDV_DURATION(){}
			function getDV_INTERVAL(type){}
			function getDV_MULTIMEDIA(){}
			function getDV_URI(){}
			function getDV_EHR_URI(){}
			function getDV_PROPORTION(){}
			function getDV_IDENTIFIER(){}
			function getDV_PARSABLE(){}
            // -------------------auxiliary function-----------------------
			
			function pushTo(node, Array) {

				if (angular.isArray(Array)) {
					Array.push(node);
				} else {
					var tempNode = Array;
					Array = [];
					if (tempNode) {
						Array.push(tempNode);
					};
					Array.push(node);
				}
				return Array;

			}			

			function getNextNodeId() {
				return editor.getTermDefinitionNodeId($scope.ontology);
			}

			function getDV_CODED_TEXT() {
				var CodePhrase = editor.getCCodePhrase();
				var defining_code = editor.getCSingleAttribute(CodePhrase, editor.getDefaultExistence(1, 1), "defining_code");
				var DV_CODED_TEXT = editor.getCComplexObject(defining_code, "", editor.getDefaultOccurrences(1, 1), "DV_CODED_TEXT");
				return DV_CODED_TEXT;
			}

			function getDV_TEXT(attribute) {
				var attr;
				if (attribute) {
					attr = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), attribute);
					var DV_TEXT = editor.getCComplexObject(attribute, "", editor.getDefaultOccurrences(1, 1), "DV_TEXT");

				}
				var DV_TEXT = editor.getCComplexObject([], "", editor.getDefaultOccurrences(1, 1), "DV_TEXT");
				return DV_TEXT;

			}

			function getDV_EHR_URI(attribute) {
				if (attribute) {
					attr = editor.getCSingleAttribute([], editor.getDefaultExistence(1, 1), attribute);
					var DV_EHR_URI = editor.getCComplexObject(attribute, "", editor.getDefaultOccurrences(1, 1), "DV_TEXT");

				}
				var DV_EHR_URI = editor.getCComplexObject([], "", editor.getDefaultOccurrences(1, 1), "DV_EHR_URI");
				return DV_EHR_URI;
			}



			//---------delete Element-------------
			$scope.deleteElement = function() {
				
			};
		},
		link : function($scope, element, attrs) {
			var typeList = ["ITEM_TREE", "ITEM_LIST", "ITEM_TABLE", "HISTORY"];
			$scope.getTreeNodeLabel = function(node,nodeAliasName) {
				var picType = node.label.picType.toLowerCase();
				if (picType.indexOf('<') != -1) {
					picType = picType.replace(/(<dv)/, '_');
					picType = picType.replace(/>/g, "");
				}
				var label = '';
				label += '<span class="archetype-edit-icon ' + picType + '" style="padding: 7px 10px; background-position-y: 10px;"></span>';
				if (typeList.indexOf(node.label.picType) != -1) {
					label += '<span style="color: brown;">&nbsp' + node.label.text + '</span>';
				} else if (node.label.code) {
					if (node.label.archetypeNode) {
						label += '<span style="color: black;font-weight: bold;">&nbsp';
					} else {
						label += '<span style="color: brown;">&nbsp';
					}

					label += getOntologyByCode(node.label.code, $scope.ontology).text;
					label += '</span>';
				} else if (node.label.text) {
					label += '<span style="color: brown;">&nbsp' + node.label.text + '</span>';
				}

				return label;
			}; 
			
           	$scope.getOntologyByCode = function(code) {
				return getOntologyByCode(code, $scope.ontology);
			};
			
			
			function getOntologyByCode(code, ontology) {
				if (ontology && code) {
					var matchedOntology;
					if (ontology.term_definitions) {
						angular.forEach(ontology.term_definitions, function(term) {
							if (term.language == $scope.definitionLanguage.code) {//$scope.selectedLanguage){
								angular.forEach(term.items, function(value) {
									if (value.code == code)
										matchedOntology = value;
									return matchedOntology;
								});
							}
						});
					}
					return matchedOntology;
				}
			}


			$scope.contentHeight = angular.isDefined(attrs.maxHeight) ? $scope.$parent.$eval(attrs.maxHeight) : undefined;
			console.log($scope.contentHeight);
		}
	};

});

