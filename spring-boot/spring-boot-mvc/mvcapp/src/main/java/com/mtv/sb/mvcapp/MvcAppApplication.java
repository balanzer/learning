package com.mtv.sb.mvcapp;

import java.util.Calendar;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MvcAppApplication {

	private static final Logger logger = LogManager.getLogger(MvcAppApplication.class);

	public static void main(String[] args) {

		final String appStartTime = Calendar.getInstance().getTime().toString();
		final String appName = "Demo MVC App";

		SpringApplication.run(MvcAppApplication.class, args);

		logger.info("App : {}, Started on : {} ", appName, appStartTime);

	}

}
