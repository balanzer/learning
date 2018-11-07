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

		logger.debug("Debugging log  - Application started");
		logger.info("Info log  - Application started");
		logger.warn("Warning log  - Application started");
		logger.error("Error log  - Application started");
		logger.fatal("Fatal log  - Application started");
	}
}
