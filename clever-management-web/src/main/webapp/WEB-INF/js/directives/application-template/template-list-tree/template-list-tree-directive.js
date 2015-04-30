angular.module('clever.management.directives.templateListTree', []).directive('templateListTree', function() {
		return {
		restrict : 'E',
		transclude : true,
		scope : {
			treeData : '=',
		},
		template : '<template-list-tree-node ng-repeat="node in treeData" node-data="node" tree-scope="treeScope" select-node-callback="selectNode" ng-mousedown="cloneItems(nodeData)">'
		            +'</template-list-tree-node>',
		controller : function($scope,$element,$document) {
		
			$scope.treeScope = {
				currentNode : undefined,
				nodes : [],
			};
			
			$scope.selectNode = function(selectedNode) {
				$scope.selectNodeCallback({
					node : selectedNode
				});
			};
			
			$scope.treeControl = {
				expandAll : function() {
					angular.forEach($scope.treeScope.nodes, function(node) {
						node.collapsed = false;
					});
				},
				collapseAll : function() {
					angular.forEach($scope.treeScope.nodes, function(node) {
						node.collapsed = true;
					});				
				},
			};
			
			$scope.$watch('treeData', function(newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.treeScope = {
						currentNode : undefined,
						nodes : [],
					};
				}
			});
		},
		link : function(scope, element, attrs) {

		},
	};
});
