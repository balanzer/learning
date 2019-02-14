package com.mtv.sb.mvcapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

	@GetMapping("/fragments")
	public String getFragments() {
		return "fragments.html";
	}

	@GetMapping("/markup")
	public String markupPage() {
		return "markup.html";
	}

}
