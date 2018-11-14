package com.mtv.userprofile;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserProfileApplication {

	private static Logger logger = LogManager.getLogger(UserProfileApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(UserProfileApplication.class, args);
		logger.info("*********************************************************************");
		logger.info("Application started - UserProfileApplication");
		logger.info("*********************************************************************");
	}
}
