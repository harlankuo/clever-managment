package edu.zju.bme.clever.management.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.zju.bme.clever.management.service.entity.ArchetypeActionLog;

public interface ArchetypeActionLogRepository extends
		JpaRepository<ArchetypeActionLog, Integer> {

}
