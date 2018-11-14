package com.mtv.application.clr.runner;

import java.util.Arrays;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.mtv.user.Profile;

@Component
public class UserProfileCLR implements CommandLineRunner {

	private static Logger logger = LogManager.getLogger(UserProfileCLR.class);

	private final RestTemplate restTemplate;

	public UserProfileCLR() {
		super();
		this.restTemplate = new RestTemplate();
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info("Running UserProfileCLR");
		final String apiURL = "http://localhost/api/users";
		final Profile[] userProfiles = this.restTemplate.getForObject(apiURL, Profile[].class);

		if ((null != userProfiles) && (userProfiles.length > 0)) {

			logger.info("API Response Size : " + userProfiles.length);
			final List<Profile> userList = Arrays.asList(userProfiles);

			userList.forEach(System.out::println);

		} else {
			logger.info("No Response from API");
		}

	}

}
