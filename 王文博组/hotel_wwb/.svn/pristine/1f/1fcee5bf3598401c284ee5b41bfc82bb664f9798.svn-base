package cn.tedu.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.tedu.dao.UserDao;
import cn.tedu.entity.UserInfo;


public class RegServlet extends HttpServlet {
	
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String userName = request.getParameter("userName");
		String card = request.getParameter("card");
		String name = request.getParameter("name");
		String password = request.getParameter("pwd1");
		String date = request.getParameter("date");
		String site = request.getParameter("site");
		String phone = request.getParameter("phone");
		String push = request.getParameter("push");
		//System.out.println(userName+","+card+","+name+","+password+","+date+","+site+","+push);
		UserInfo user = new UserInfo(userName, password, name, card, date, site, phone);
		UserDao dao = new UserDao();
		int a = 0;
		if(push.equals("on")) {
			a = 1;
		}
		dao.userAdd(user,a);
		System.out.println(request.getContextPath());
		response.sendRedirect(request.getContextPath()+"/ShowLoginServlet");
	}

}
