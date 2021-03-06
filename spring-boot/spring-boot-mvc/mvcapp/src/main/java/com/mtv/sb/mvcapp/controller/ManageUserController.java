package com.mtv.sb.mvcapp.controller;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import com.mtv.sb.domain.User;
import com.mtv.sb.service.ManageUsers;

@Controller
public class ManageUserController extends BaseController {

	private static final Logger logger = LogManager.getLogger(ManageUserController.class);

	@Autowired
	ManageUsers service;

	@GetMapping(path = "/listusers")
	public ModelAndView listUsers() throws Exception {
		logger.debug("listAllusers - start");
		// add implementation later
		final List<User> users = this.service.listUsers();

		final ModelAndView mav = new ModelAndView("listUsers");

		if (CollectionUtils.isNotEmpty(users)) {
			logger.debug("listAllusers total users : {}", users.size());
			mav.addObject("users", users);
		} else {
			logger.error("listAllusers failed to get users from service");
		}

		return mav;

	}

	@GetMapping(path = "/listusers/{uid}")
	public ModelAndView viewUser(@PathVariable Long uid) {
		logger.debug("listusers - start");
		final ModelAndView mav = new ModelAndView("viewUser");
		mav.addObject("uid", uid);
		return mav;
	}

}
