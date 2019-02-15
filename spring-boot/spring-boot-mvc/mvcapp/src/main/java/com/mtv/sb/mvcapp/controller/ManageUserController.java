package com.mtv.sb.mvcapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ManageUserController {

	private static final Logger logger = LogManager.getLogger(ManageUserController.class);

	// @Autowired
	// ManageUsers service;

	@GetMapping(path = "/listusers")
	public String listAllusers() {
		logger.debug("listAllusers - start");
		// add implementation later
		// final List<User> users = this.service.listUsers();
		return "listUsers";
	}

}
