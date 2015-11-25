package edu.zju.bme.clever.management.service.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table
@DynamicUpdate(true)
public class ApiVersionMaster extends AbstractIndentifiedEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2336528915710441406L;

	@ManyToOne(fetch = FetchType.LAZY)
	private ApiMaster apiMaster;
	@Column(nullable = false)
	private Integer version;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "apiVersionMaster", cascade = CascadeType.ALL)
	private List<ApiRootUrlMaster> apiRootUrlMasterList;

	// getter and setter
	public ApiMaster getApiMaster() {
		return apiMaster;
	}

	public void setApiMaster(ApiMaster apiMaster) {
		this.apiMaster = apiMaster;
	}

	public List<ApiRootUrlMaster> getApiRootUrlMasterList() {
		return apiRootUrlMasterList;
	}

	public void setApiRootUrlMasterList(
			List<ApiRootUrlMaster> apiRootUrlMasterList) {
		this.apiRootUrlMasterList = apiRootUrlMasterList;
	}


	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

}