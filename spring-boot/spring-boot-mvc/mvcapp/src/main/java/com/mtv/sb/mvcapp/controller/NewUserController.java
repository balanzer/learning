package com.mtv.sb.mvcapp.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.mtv.sb.domain.User;
//import com.mtv.sb.service.appservice.ManageUsers;

@Controller
public class NewUserController {
	private static final Logger logger = LogManager.getLogger(NewUserController.class);

	// @Autowired
	// ManageUsers service;

	@GetMapping(path = "/newuser")
	public String beginUserCreation() {
		logger.debug("beginUserCreation - start");
		// add implementation later
		return "newUser";
	}

	@GetMapping(path = "/")
	public String home() {
		logger.debug("home - start");
		// add implementation later
		return "home";
	}

	@PostMapping(path = "/newuser")
	public String submitUserProfile() {
		logger.debug("submitUserProfile - start");
		final User user = null;
		// add implementation later
		// this.service.createUser(user);
		return "newUserConfirmation";
	}

}
