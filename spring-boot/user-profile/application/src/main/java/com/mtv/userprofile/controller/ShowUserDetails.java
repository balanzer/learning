package com.mtv.userprofile.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mtv.userprofile.service.UserProfileService;

@Controller
@RequestMapping("/users")
public class ShowUserDetails {

	private static Logger logger = LogManager.getLogger(ShowUserDetails.class);

	@Autowired
	UserProfileService service;

	@GetMapping
	public String showUserProfile(Model model) {
		logger.info("Loading user profiles ");
		model.addAttribute("users", this.service.getUserProfile());

		return "showprofile";
	}
}
