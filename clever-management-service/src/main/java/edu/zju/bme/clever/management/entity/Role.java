package edu.zju.bme.clever.management.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table
public class Role extends AbstractIndentifiedEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1484866953524565883L;
	@Column
	private String roleName;
	@Column
	private String description;
	@ManyToMany(targetEntity = Authority.class, fetch = FetchType.LAZY)
	@JoinTable
	private Set<Authority> authorities;
	@ManyToMany(targetEntity = User.class, fetch = FetchType.LAZY, mappedBy = "roles")
	private Set<User> users;

	public Role() {

	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
