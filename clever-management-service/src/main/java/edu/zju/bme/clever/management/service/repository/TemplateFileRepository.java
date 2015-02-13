package edu.zju.bme.clever.management.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.zju.bme.clever.management.service.entity.TemplateFile;

public interface TemplateFileRepository extends
		JpaRepository<TemplateFile, Integer> {

	public TemplateFile findByName(String name);

}
