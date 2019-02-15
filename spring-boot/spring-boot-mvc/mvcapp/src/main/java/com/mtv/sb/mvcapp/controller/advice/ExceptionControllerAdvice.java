package com.mtv.sb.mvcapp.controller.advice;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class ExceptionControllerAdvice {
	private static final Logger logger = LogManager.getLogger(ExceptionControllerAdvice.class);

	@ExceptionHandler(Exception.class)
	public ModelAndView handleException(Exception ex) {

		logger.error("handleException class : {} exception : {}  ", ex.getClass().getName(), ex.getMessage());
		final ModelAndView model = new ModelAndView();
		model.addObject("errType", ex.getClass().getName());
		model.addObject("errMsg", ex.getMessage());
		model.setViewName("error/generic_error");
		return model;

	}
}
