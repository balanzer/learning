package com.mtv.sb.mvcapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.ModelAttribute;

public class BaseController {

	private static final Logger logger = LogManager.getLogger(BaseController.class);

	@ModelAttribute
	public void doPreActions() {
		logger.debug("doPreActions");
	}

	@ModelAttribute("countries")
	public List<String> populateCountries() {
		logger.debug("populateCountries");
		final List<String> countries = new ArrayList<>();
		countries.add("India");
		countries.add("USA");
		countries.add("Japan");
		return countries;
	}

}
