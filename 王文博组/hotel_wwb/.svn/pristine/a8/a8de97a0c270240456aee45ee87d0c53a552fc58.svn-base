package cn.tedu.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.thymeleaf.context.Context;

import cn.tedu.entity.UserInfo;
import cn.tedu.entity.UserInfo;
import cn.tedu.utils.ThUtils;


public class HomeServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Context context = new Context();
		HttpSession session = request.getSession();
		UserInfo user = (UserInfo) session.getAttribute("user");
		//System.out.println("1235:"+user);
		if(user==null) {
			response.sendRedirect(request.getContextPath()+"/ShowLoginServlet");
			return;//后面代码不执行
		}
		context.setVariable("userName", user.getUserName());
		ThUtils.write("index", context, response);
	}
}
