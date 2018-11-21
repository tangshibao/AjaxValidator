package com.validator.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ValidatorServlet extends BaseServlet {
	/**
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	public void validateEmail(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("校验Email");
		response.setContentType("text/json;charset=UTF-8");
		request.setCharacterEncoding("utf-8");
		String existEmail = "123@qq.com";
		int code = 0;
		String message = null;
		String email = request.getParameter("email");
		if(existEmail.equals(email)){
			code = 0;
			message = "邮箱已被注册";
			
		}else{
			code = 1;
			message = "邮箱可以使用";
		}
		String query = "{\"code\":\""+ code +"\",\"message\":\""+ message +"\"}";
		PrintWriter out = response.getWriter();
		out.print(query);
		out.flush();
		out.close();
	}
}