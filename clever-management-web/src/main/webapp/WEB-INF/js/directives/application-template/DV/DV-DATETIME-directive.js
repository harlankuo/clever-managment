angular.module('clever.management.directives.DVDATETIME', []).directive('dvDatetime',//驼峰式命名
function($document) {
    return {    
        replace:true,       
        restrict : 'AE',//A 仅匹配属性名字  E 仅匹配元素名字
        scope : {//配置    绑定不同的数据到指令内部的作用域
          UIData:'=guiData',          
        },      
        
        template: '<li dragable id={{UIData.label.labelContent+"_"+UIData.label.code}}>'
                   +'<img class={{UIData.label.picType}}></img>'
                   +'<span>'+'{{UIData.label.labelContent}}'+'</span>'+'&nbsp;&nbsp:&nbsp;&nbsp&nbsp'
                   +'<input id={{UIData.label.labelContent+"/"+UIData.label.code}}>'+'年&nbsp;'+'<input>'+'月&nbsp;'+'<input>'+'日'+
                   '</li>',
        controller:function($scope){
            
            $scope.dvdatetimeControl={};
        },
        link : function(scope, element, attrs) {
    }
    };
});