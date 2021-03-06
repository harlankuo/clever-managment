package edu.zju.bme.clever.management.web.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiMasterInfo {
	private Integer Id;
	private String name;
	private String chineseName;

	private List<ApiVersionMasterInfo> versionMasters = new ArrayList<>();

	// private ApiVersionMasterInfo latestApiVersionMasterInfo;
	private Integer latestVersion;

	// getter and setter
	// public ApiVersionMasterInfo getLatestApiVersionMasterInfo() {
	// return latestApiVersionMasterInfo;
	// }
	//
	// public void setLatestApiVersionMasterInfo(
	// ApiVersionMasterInfo latestApiVersionMasterInfo) {
	// this.latestApiVersionMasterInfo = latestApiVersionMasterInfo;
	// }

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public List<ApiVersionMasterInfo> getVersionMasters() {
		return versionMasters;
	}

	public void setVersionMasters(List<ApiVersionMasterInfo> versionMasters) {
		this.versionMasters = versionMasters;
	}

	public Integer getLatestVersion() {
		return latestVersion;
	}

	public void setLatestVersion(Integer latestVersion) {
		this.latestVersion = latestVersion;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getChineseName() {
		return chineseName;
	}

	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}

}
