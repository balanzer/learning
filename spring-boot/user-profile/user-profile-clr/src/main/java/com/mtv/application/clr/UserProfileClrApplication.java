package com.mtv.application.clr;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserProfileClrApplication {
	private static Logger logger = LogManager.getLogger(UserProfileClrApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(UserProfileClrApplication.class, args);

		logger.info("*********************************************************************");
		logger.info("Application started - UserProfileClrApplication");
		logger.info("*********************************************************************");
	}

}
