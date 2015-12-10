/**
 * Created by fdgf on 2015/9/29.
 */
 <style type="text/css">
	.template-pane-normal:hover {
		background-color: #f5f5f5;
	}
	.template-pane-valid {
		background-color: #dff0d8;
	}
	.template-pane-valid:hover {
		background-color: #d0e9c6;
	}
	.template-pane-invalid {
		background-color: #f2dede;
	}
	.template-pane-invalid:hover {
		background-color: #ebcccc;
	}
</style>
<div class="modal-body">
	<div ng-style="{height: containerHeight - 110}">
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12">
				<button ng-show="onStatus('ToAddFile')" class="btn btn-success btn-file" ng-click="addTemplate()">
					<span class="glyphicon glyphicon-plus"></span> {{'STORAGE_TEMPLATE_UPLOAD_ADD' | translate}}
				</button>
			</div>
		</div>
		<br />
		<div class="row" ng-style="{height: containerHeight - 160}" style="overflow: auto;">
			<div class="panel panel-default" ng-repeat="template in templates">
				<div class="panel-body" ng-class="{'template-pane-normal': template.valid == undefined, 'template-pane-valid': template.valid == true, 'template-pane-invalid': template.valid == false}" ng-mouseover="template.deleteEnabled = true" ng-mouseleave="template.deleteEnabled = false">
					<div class="row">
						<div class="col-sm-12 col-md-12 col-lg-12" style="font-size: 13pt;">
							<span class="badge"> {{$index+1}} </span>&nbsp; 
							<span ng-show="!template.oetValid" style="color: red;">{{'STORAGE_TEMPLATE_UPLOAD_OET_ERROR_HINT' | translate}}</span>
							<span ng-show="!template.armValid" style="color: red;">{{'STORAGE_TEMPLATE_UPLOAD_ARM_ERROR_HINT' | translate}}</span>
							<span ng-show="template.serverValidating"><img ng-src="{{WEBSITE_DOMAIN}}/img/loading.gif" style="max-height: 18px;"></img> {{'STORAGE_TEMPLATE_UPLOAD_VALIDATING_HINT' | translate}}</span>
							<span ng-show="template.serverValid">Template ID: {{template.name}}</span>
							<span ng-show="template.serverValid == false"> <span style="color: red;">{{'STORAGE_TEMPLATE_UPLOAD_VALIDATE_ERROR_HINT' | translate}}</span> <a style="cursor: pointer;" popover-placement="bottom" popover="{{template.message}}" popover-trigger="mouseenter">{{'STORAGE_TEMPLATE_UPLOAD_VALIDATE_DETAILS_HINT' | translate}} </a> </span>
							<button type="button" class="btn btn-warning pull-right" ng-visible="template.deleteEnabled" ng-click="deleteTemplate(template)">
								{{'STORAGE_TEMPLATE_UPLOAD_BTN_DELETE' | translate}}
							</button>
						</div>
					</div>
					<br />
					<div class="row">
						<div class="col-sm-6 col-md-6 col-lg-6">
							<div class="input-group">
								<span class="input-group-addon">OET:</span>
								<input input class="form-control" type="text"
								placeholder="{{'STORAGE_TEMPLATE_UPLOAD_OET_HINT' | translate}}"
								ng-model="template.oet.path"
								disabled="true" style="cursor: default;"
								>
								<span class="input-group-btn">
									<button class="btn btn-success btn-file" type="button"
									tooltip-placement="top"
									tooltip="{{'STORAGE_TEMPLATE_UPLOAD_BTN_BROWSE' | translate}}"
									tooltip-popup-delay="100"
									>
										<span class="glyphicon glyphicon-folder-open" ></span>
										<input type="file" accept=".oet" file-model file="template.oet" on-change="validateOet(template)">
									</button> </span>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-6">
							<div class="input-group">
								<span class="input-group-addon">ARM:</span>
								<input input class="form-control" type="text"
								placeholder="{{'STORAGE_TEMPLATE_UPLOAD_ARM_HINT' | translate}}"
								ng-model="template.arm.path"
								disabled="true" style="cursor: default;">
								<span class="input-group-btn">
									<button class="btn btn-success btn-file" type="button"
									tooltip-placement="top"
									tooltip="{{'STORAGE_TEMPLATE_UPLOAD_BTN_BROWSE' | translate}}"
									tooltip-popup-delay="100">
										<span class="glyphicon glyphicon-folder-open" ></span>
										<input type="file" accept=".xml" file-model file="template.arm" on-change="validateArm(template)">
									</button> </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal-footer">
	<button ng-show="onStatus('ToAddFile')" class="btn btn-primary btn-lg" ng-click="validateTemplates()" ng-disabled="templates.length == 0">
		{{'STORAGE_TEMPLATE_UPLOAD_BTN_VALIDATE' | translate}}
	</button>
	<button ng-show="onStatus('ValidationFailed')" class="btn btn-primary btn-lg" ng-click="validateTemplates()" ng-disabled="templates.length == 0">
		{{'STORAGE_TEMPLATE_UPLOAD_BTN_RETRY' | translate}}
	</button>
	<button ng-show="onStatus('ValidationPast')" class="btn btn-success btn-lg" ng-click="uploadTemplates()" ng-disabled="templates.length == 0">
		{{'STORAGE_TEMPLATE_UPLOAD_BTN_UPLOAD' | translate}}
	</button>
	<button class="btn btn-warning btn-lg" ng-click="reset()">
		{{'STORAGE_TEMPLATE_UPLOAD_BTN_RESET' | translate}}
	</button>
</div>













































