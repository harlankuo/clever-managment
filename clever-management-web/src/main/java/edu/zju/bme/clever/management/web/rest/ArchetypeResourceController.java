package edu.zju.bme.clever.management.web.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.annotations.SourceType;
import org.openehr.am.archetype.Archetype;
import org.openehr.am.serialize.XMLSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import se.acode.openehr.parser.ADLParser;
import se.acode.openehr.parser.ParseException;
import edu.zju.bme.clever.management.service.ArchetypeProvideService;
import edu.zju.bme.clever.management.service.ArchetypeValidateService;
import edu.zju.bme.clever.management.service.ArchetypeVersionControlService;
import edu.zju.bme.clever.management.service.UserService;
import edu.zju.bme.clever.management.service.entity.ArchetypeMaster;
import edu.zju.bme.clever.management.service.entity.ArchetypeRevisionFile;
import edu.zju.bme.clever.management.service.entity.FileProcessResult;
import edu.zju.bme.clever.management.service.entity.LifecycleState;
import edu.zju.bme.clever.management.service.entity.User;
import edu.zju.bme.clever.management.web.entity.ActionLogInfo;
import edu.zju.bme.clever.management.web.entity.ArchetypeInfo;
import edu.zju.bme.clever.management.web.entity.ArchetypeMasterInfo;
import edu.zju.bme.clever.management.web.entity.FileUploadResult;

@RestController
@ManagedResource
@RequestMapping("/archetypes")
public class ArchetypeResourceController extends AbstractResourceController {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ArchetypeValidateService archetypeValidateService;
	@Autowired
	private ArchetypeVersionControlService archetypeVersionControlService;
	@Autowired
	private UserService userService;
	@Autowired
	private ArchetypeProvideService archetypeProvideService;

	private XMLSerializer xmlSerializer = new XMLSerializer();

	private boolean manipulateUploadResult;
	private boolean uploadResult;
	private boolean validationEnabled = true;

	@ManagedAttribute
	public boolean isManipulateUploadResult() {
		return manipulateUploadResult;
	}

	@ManagedAttribute
	public void setManipulateUploadResult(boolean manipulateUploadResult) {
		this.manipulateUploadResult = manipulateUploadResult;
	}

	@ManagedAttribute
	public boolean isUploadResult() {
		return uploadResult;
	}

	@ManagedAttribute
	public void setUploadResult(boolean uploadResult) {
		this.uploadResult = uploadResult;
	}

	@ManagedAttribute
	public boolean isValidationEnabled() {
		return validationEnabled;
	}

	@ManagedAttribute
	public void setValidationEnabled(boolean validationEnabled) {
		this.validationEnabled = validationEnabled;
	}

	// @RequestMapping(value = "/list", method = RequestMethod.GET)
	// public List<ArchetypeMasterInfo> getArchtypeList() {
	// List<ArchetypeMaster> masters = this.archetypeProvideService
	// .getAllArchetypeMasters();
	// Map<Integer, ArchetypeMasterInfo> infos = masters
	// .stream()
	// .collect(
	// Collectors.toMap(
	// master -> master.getId(),
	// master -> {
	// ArchetypeMasterInfo info = new ArchetypeMasterInfo();
	// info.setId(master.getId());
	// info.setConceptName(master.getConceptName());
	// info.setName(master.getName());
	// info.setLatestArchetypeVersion(master
	// .getLatestFileVersion());
	// info.setLifecycleState(master
	// .getLatestFileLifecycleState()
	// .getValue());
	// return info;
	// }));
	// masters.forEach(master -> {
	// if (master.getSpecialiseArchetypeMaster() != null) {
	// ArchetypeMasterInfo info = infos.get(master.getId());
	// info.setRoot(false);
	// infos.get(master.getSpecialiseArchetypeMasterId())
	// .getSpecialisedArchetypeMasters().add(info);
	//
	// }
	// });
	// return infos.values().stream().filter(info -> info.isRoot())
	// .collect(Collectors.toList());
	// }

	// @RequestMapping(value = "/list/myDraft", method = RequestMethod.GET)
	// public List<ArchetypeInfo> getMyDraftArchtypeList(Authentication
	// authentication){
	// String userName = ((UserDetails)
	// authentication.getPrincipal()).getUsername();
	// User user = this.userService.getUserByName(userName);
	// List<ArchetypeRevisionFile> files =
	// this.archetypeProviderService.getMyDraftArchetypeFiles(user);
	// Map<Integer, ArchetypeInfo> infos = files
	// .stream()
	// .collect(
	// Collectors.toMap(
	// file -> file.getId(),
	// file -> {
	// ArchetypeInfo info=new ArchetypeInfo();
	// info.setId(file.getId());
	// info.setName(file.getName());
	// info.setMasterId(file.getMasterId());
	// info.setInternalVersion(file.getInternalVersion());
	// info.setLifecycleState(file.getLifecycleState().toString());
	// return info;
	// }));
	//
	// return infos.values().stream().collect(Collectors.toList());
	// }
	//
	// @RequestMapping(value = "/list/latestPublished", method =
	// RequestMethod.GET)
	// public List<ArchetypeInfo> getMyPublishedArchtypeList(Authentication
	// authentication){
	// List<ArchetypeRevisionFile> files =
	// this.archetypeProviderService.getLatestedPublishedArchetypeFiles();
	// Map<Integer, ArchetypeInfo> infos = files
	// .stream()
	// .collect(
	// Collectors.toMap(
	// file -> file.getId(),
	// file -> {
	// ArchetypeInfo info=new ArchetypeInfo();
	// info.setId(file.getId());
	// info.setName(file.getName());
	// info.setMasterId(file.getMasterId());
	// info.setInternalVersion(file.getInternalVersion());
	// info.setLifecycleState(file.getLifecycleState().toString());
	// return info;
	// }));
	//
	// return infos.values().stream().collect(Collectors.toList());
	// }
	//
	// @RequestMapping(value = "/list/verify", method = RequestMethod.GET)
	// public List<ArchetypeInfo> getVerArchetypeList(){
	// List<ArchetypeRevisionFile>
	// files=this.archetypeProviderService.getAllTeamreviewArchetypeFiles();
	// Map<Integer, ArchetypeInfo> infos = files
	// .stream()
	// .collect(
	// Collectors.toMap(
	// file -> file.getId(),
	// file -> {
	// ArchetypeInfo info=new ArchetypeInfo();
	// info.setId(file.getId());
	// info.setName(file.getName());
	// info.setMasterId(file.getMasterId());
	// info.setInternalVersion(file.getInternalVersion());
	// return info;
	// }));
	// return infos.values().stream().collect(Collectors.toList());
	// }

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public ArchetypeInfo getArchetypeById(@PathVariable int id)
			throws Exception {
		ArchetypeRevisionFile file = this.archetypeProvideService
				.getArchetypeRevisionFileById(id);
		this.isResourcesNull(file);
		return this.constructArchetypeInfo(file);
	}

	@RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
	public ArchetypeInfo getArchetypeByName(@PathVariable String name)
			throws Exception {
		ArchetypeRevisionFile file = this.archetypeProvideService
				.getArchetypeRevisionFileByName(name);
		this.isResourcesNull(file);
		return this.constructArchetypeInfo(file);
	}

	private ArchetypeInfo constructArchetypeInfo(ArchetypeRevisionFile file)
			throws ParseException, Exception, IOException {
		ArchetypeInfo info = new ArchetypeInfo();
		info.setId(file.getId());
		info.setName(file.getName());
		info.setInternalVersion(file.getSerialVersion());
		info.setAdl(file.getAdl());
		ADLParser parser = new ADLParser(file.getAdl());
		Archetype archetype = parser.parse();
		info.setRmEntity(archetype.getArchetypeId().rmEntity());
		info.setRmName(archetype.getArchetypeId().rmName());
		info.setRmOriginator(archetype.getArchetypeId().rmOriginator());
		info.setConceptName(archetype.getConceptName(archetype
				.getOriginalLanguage().getCodeString()));
		info.setXml(this.xmlSerializer.output(archetype));
		info.setLifecycleState(file.getLifecycleState().getValue());
		info.setMasterName(archetype.getArchetypeId().base());
		info.setMasterId(file.getVersionMasterId());
		// Set specialise archetype info
		if (file.getSpecialiseArchetypeRevisionFileId() != null) {
			ArchetypeInfo specialiseInfo = new ArchetypeInfo();
			specialiseInfo.setId(file.getSpecialiseArchetypeRevisionFileId());
			specialiseInfo.setName(file
					.getSpecialiseArchetypeRevisionFileName());
			info.setSpecialiseArchetype(specialiseInfo);
		}
		// Set editor info
		info.setEditorId(file.getEditor().getId());
		info.setEditorName(file.getEditor().getName());
		return info;
	}

	@RequestMapping(value = "/id/{id}/adl", method = RequestMethod.GET)
	public String getArchetypeAdlById(@PathVariable int id) {
		String adl = this.archetypeProvideService.getArchetypeAdlById(id);
		this.isResourcesNull(adl);
		return adl;
	}

	@RequestMapping(value = "/name/{name}/adl", method = RequestMethod.GET)
	public String getArchetypeAdlByName(@PathVariable String name) {
		String adl = this.archetypeProvideService.getArchetypeAdlByName(name);
		this.isResourcesNull(adl);
		return adl;
	}

	@RequestMapping(value = "/id/{id}/xml", method = RequestMethod.GET)
	public String getArchetypeXmlById(@PathVariable int id) {
		String xml = this.archetypeProvideService.getArchetypeXmlById(id);
		this.isResourcesNull(xml);
		return xml;
	}

	@RequestMapping(value = "/name/{name}/xml", method = RequestMethod.GET)
	public String getArchetypeXmlByName(@PathVariable String name) {
		String xml = this.archetypeProvideService.getArchetypeXmlByName(name);
		this.isResourcesNull(xml);
		return xml;
	}

	// @RequestMapping(value = "/master/id/{id}", method = RequestMethod.GET)
	// public ArchetypeMasterInfo getMasterById(@PathVariable int id) {
	// ArchetypeMaster master = this.archetypeProvideService
	// .getArchetypeMasterById(id);
	// this.isResourcesNull(master);
	// return this.constructArchetypeMasterInfo(master);
	// }
	//
	// @RequestMapping(value = "/master/name/{name}", method =
	// RequestMethod.GET)
	// public ArchetypeMasterInfo getMasterByName(@PathVariable String name) {
	// ArchetypeMaster master = this.archetypeProvideService
	// .getArchetypeMasterByName(name);
	// this.isResourcesNull(master);
	// return this.constructArchetypeMasterInfo(master);
	// }

	@RequestMapping(value = "/action/validate", method = RequestMethod.POST)
	public FileProcessResult validateFiles(
			@RequestParam(value = "file", required = true) MultipartFile file) {
		String fileName = file.getOriginalFilename();
		long fileSize = file.getSize();
		this.logger.trace("Validating file: {}, size: {}.", fileName, fileSize);
		FileProcessResult result = new FileProcessResult();
		result.setName(fileName);
		result.setStatus(FileProcessResult.FileStatus.VALID);
		Archetype archetype;
		try {
			ADLParser parser = new ADLParser(file.getInputStream(), "UTF-8");
			archetype = parser.parse();
		} catch (Throwable ex) {
			this.logger.debug("Parse file {} failed.",
					file.getOriginalFilename(), ex);
			result.setStatus(FileProcessResult.FileStatus.INVALID);
			result.setMessage("Archetype parse failed, error: "
					+ ex.getMessage());
			return result;
		}
		// Validate archetypes
		if (this.validationEnabled) {
			return this.archetypeValidateService.validateConsistency(archetype);
		}
		return result;
	}

	@RequestMapping(value = "/action/upload", method = RequestMethod.POST)
	public FileUploadResult uploadFiles(
			@RequestParam(value = "files", required = true) MultipartFile[] files,
			Authentication authentication) {
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);

		// Debug mode
		if (this.manipulateUploadResult) {
			result.setMessage("Upload result manipulated.");
			if (!this.uploadResult) {
				result.setSucceeded(false);
			}
			return result;
		}

		User user = this.userService.getUserByName(userName);
		Map<String, Archetype> archetypes = new HashMap<String, Archetype>();

		for (MultipartFile file : files) {
			String fileName = file.getOriginalFilename();
			long fileSize = file.getSize();
			this.logger.trace("Persisting file: {}, size: {}.", fileName,
					fileSize);
			try {
				ADLParser parser = new ADLParser(file.getInputStream(), "UTF-8");
				Archetype archetype = parser.parse();
				archetypes
						.put(archetype.getArchetypeId().getValue(), archetype);
				this.archetypeVersionControlService.acceptNewArchetype(
						archetype, user);
			} catch (Exception ex) {
				this.logger.debug("Persist file {} failed.",
						file.getOriginalFilename(), ex);
				result.setSucceeded(false);
				result.setMessage("Persist file " + file.getOriginalFilename()
						+ " failed.");
				return result;
			}
		}
		return result;
	}

	@RequestMapping(value = "/action/edit", method = RequestMethod.POST)
	public FileUploadResult editFile(
			@RequestParam(value = "name", required = true) String name,
			Authentication authentication) {
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		User user = this.userService.getUserByName(userName);
		ArchetypeRevisionFile file = this.archetypeProvideService
				.getArchetypeRevisionFileByName(name);
		String fileAdl = this.archetypeProvideService
				.getArchetypeAdlByName(name);
		try {
			this.archetypeVersionControlService.editArchetype(name, fileAdl,
					user);
		} catch (Exception ex) {
			result.setMessage("Persist file " + name + " failed.");
			result.setSucceeded(false);
			return result;
		}
		return result;
	}

	@RequestMapping(value = "/action/submit", method = RequestMethod.POST)
	public FileUploadResult submitFile(
			@RequestParam(value = "name", required = true) String name,
			Authentication authentication) {
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		User user = this.userService.getUserByName(userName);
		try {
			this.archetypeVersionControlService.submitArchetype(name, user);
		} catch (Exception ex) {
			result.setMessage("Persist file " + name + " failed.");
			result.setSucceeded(false);
			return result;
		}
		return result;
	}

	@RequestMapping(value = "/action/approve", method = RequestMethod.POST)
	public FileUploadResult approveFile(
			@RequestParam(value = "name", required = true) String name,
			Authentication authentication) {
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		User user = this.userService.getUserByName(userName);
		try {
			this.archetypeVersionControlService.approveArchetype(name, user);
		} catch (Exception ex) {
			result.setMessage("Persist file " + name + " failed.");
			result.setSucceeded(false);
			return result;
		}

		return result;
	}

	@RequestMapping(value = "/action/reject", method = RequestMethod.POST)
	public FileUploadResult rejectFile(
			@RequestParam(value = "name", required = true) String name,
			Authentication authentication) {
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		User user = this.userService.getUserByName(userName);
		try {
			this.archetypeVersionControlService.rejectArchetype(name, user);
		} catch (Exception ex) {
			result.setMessage("Persist file " + name + " failed.");
			result.setSucceeded(false);
			return result;
		}

		return result;
	}

	@RequestMapping(value = "/action/rejectAndremove", method = RequestMethod.POST)
	public FileUploadResult rejectAndremoveFile(
			@RequestParam(value = "name", required = true) String name,
			Authentication authentication) {
		FileUploadResult result = new FileUploadResult();
		result.setSucceeded(true);
		String userName = ((UserDetails) authentication.getPrincipal())
				.getUsername();
		User user = this.userService.getUserByName(userName);
		try {
			this.archetypeVersionControlService.rejectAndRemoveArchetype(name,
					user);
		} catch (Exception ex) {
			result.setMessage("Persist file " + name + " failed.");
			result.setSucceeded(false);
			return result;
		}

		return result;
	}

	// private ArchetypeMasterInfo constructArchetypeMasterInfo(
	// ArchetypeMaster master) {
	// ArchetypeMasterInfo masterInfo = new ArchetypeMasterInfo();
	// // Add basic info
	// masterInfo.setId(master.getId());
	// masterInfo.setName(master.getName());
	// masterInfo.setRmEntity(master.getRmEntity());
	// masterInfo.setRmName(master.getRmName());
	// masterInfo.setRmOriginator(master.getRmOrginator());
	// masterInfo.setConceptName(master.getConceptName());
	// masterInfo.setConceptDescription(master.getConceptDescription());
	// masterInfo.setKeywords(master.getKeywords());
	// masterInfo.setCopyright(master.getCopyright());
	// masterInfo.setPurpose(master.getPurpose());
	// masterInfo.setUse(master.getUse());
	// masterInfo.setMisuse(master.getMisuse());
	// masterInfo.setLifecycleState(master
	// .getLatestRevisionFileLifecycleState().getValue());
	// masterInfo.setLatestArchetypeVersion(master.getLatestFileVersion());
	// ArchetypeMaster specialiseMaster = master
	// .getSpecialiseArchetypeMaster();
	// // Add specialise master
	// if (specialiseMaster != null) {
	// ArchetypeMasterInfo info = new ArchetypeMasterInfo();
	// info.setId(specialiseMaster.getId());
	// info.setName(specialiseMaster.getName());
	// info.setLatestArchetypeVersion(specialiseMaster
	// .getLatestFileVersion());
	// info.setLatestArchetypeId(specialiseMaster.getLatestFileId());
	// masterInfo.setSpecialiseArchetypeMaster(info);
	// }
	// // Add archetypes
	// master.getFiles().forEach(archetype -> {
	// ArchetypeInfo info = new ArchetypeInfo();
	// info.setId(archetype.getId());
	// info.setInternalVersion(archetype.getInternalVersion());
	// info.setName(archetype.getName());
	// info.setVersion(archetype.getVersion());
	// masterInfo.getArchetypes().add(info);
	// });
	// // Add action logs
	// master.getActionLogs().stream().forEach(log -> {
	// ActionLogInfo info = new ActionLogInfo();
	// info.setId(log.getId());
	// info.setAction(log.getActionType().getValue());
	// info.setVersion(log.getVersion());
	// info.setRecordTime(log.getRecordTime());
	// info.setOperatorName(log.getOperatorName());
	// info.setLifecycleState(log.getLifecycleState().getValue());
	// masterInfo.getActionLogs().add(info);
	// });
	// return masterInfo;
	// }

}
