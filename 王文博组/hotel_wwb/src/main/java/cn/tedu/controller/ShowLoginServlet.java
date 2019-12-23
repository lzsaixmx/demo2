package cn.tedu.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.thymeleaf.context.Context;

import cn.tedu.entity.UserInfo;
import cn.tedu.utils.ThUtils;


public class ShowLoginServlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Context context = new Context();
		
		HttpSession session = request.getSession();
		UserInfo user = (UserInfo)session.getAttribute("user");
		if(user!=null) {
			response.sendRedirect(request.getContextPath()+"/HomeServlet");
			return;
		}
		
		Cookie[] cookies = request.getCookies();
		System.out.println(cookies+":**********8");
		for (Cookie cookie : cookies) {
			//判断保存的是否是用户名
			System.out.println(cookie.getValue()+":789**************");
			if(cookie.getName().equals("userName")) {
				//把用户名添加到容器中
				context.setVariable("userName", cookie.getValue());
			}
			//判断保存的是否是密码
			if(cookie.getName().equals("password")) {
				//把密码添加到容器中
				context.setVariable("password", cookie.getValue());
			}
		}
		
		ThUtils.write("login", context, response);
	}

}
