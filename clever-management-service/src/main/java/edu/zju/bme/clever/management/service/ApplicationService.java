package edu.zju.bme.clever.management.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.zju.bme.clever.management.service.entity.Application;
import edu.zju.bme.clever.management.service.exception.ApplicationPersistException;

public interface ApplicationService {

	public List<Application> getAllApplications();

	public Application getApplicationById(Integer id);

	public void saveApplication(String name, String description, String url,
			MultipartFile img) throws ApplicationPersistException;

	public void updateApplication(Integer id, String name, String description,
			String url, MultipartFile img) throws ApplicationPersistException;

	public void updateApplication(Application application)
			throws ApplicationPersistException;

	public void deleteApplicationById(Integer id);

}