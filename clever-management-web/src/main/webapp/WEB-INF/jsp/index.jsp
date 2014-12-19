<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
uri="http://www.springframework.org/security/tags"%>
<html ng-app="cleverManagementApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<title translate>TITLE_WEBSITE</title>
		<link rel="icon" href="img/logo.png" />
		<!-- css init -->
		<%@ include file="jspf/css-init.jspf"%>
	</head>
	<body ng-controller="appCtrl" style="font-family: Microsoft YaHei;" ng-style="{height: windowHeight, width: windowWidth}" ng-cloak>
		<!-- header -->
		<%@ include file="jspf/header.jspf"%>
		
		<!-- busy hint -->
		<busy-model size="60" window-width="windowWidth" window-height="windowHeight"></busy-model>
		
		<!-- content -->
		<div ui-view class="container responsive-container" ng-style="{height: windowHeight - 100, width: windowWidth}"></div>

		<!-- footer -->
		<%@ include file="jspf/footer.jspf"%>
		<!-- js init -->
		<%@ include file="jspf/js-init.jspf"%>
	</body>
</html>