package com.mtv.userprofile.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mtv.user.Profile;

@Controller
@RequestMapping("/users")
public class ShowUserDetails {

	private static Logger logger = LogManager.getLogger(ShowUserDetails.class);

	public static Random numGen = new Random();

	private static List<Profile> userProfiles = new ArrayList<>();

	static {
		final String[] firstName = { "Mark", "Alan", "Henry", "George", "James", "Michael", "Robert" };

		final String[] lastName = { "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller" };

		for (Long i = 10001l; i <= 10020; i++) {
			final int rand = numGen.nextInt(firstName.length);
			userProfiles.add(new Profile(i, firstName[rand], lastName[rand],
					firstName[rand] + "." + lastName[rand] + "@gmail.com"));
		}
	}

	@GetMapping
	public String showUserProfile(Model model) {
		logger.info("Loading user profiles ");
		model.addAttribute("users", userProfiles);

		return "showprofile";
	}
}
