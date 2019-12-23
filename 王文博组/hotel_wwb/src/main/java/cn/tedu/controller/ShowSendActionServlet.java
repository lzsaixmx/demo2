package cn.tedu.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.tedu.dao.BlogDao;
import cn.tedu.entity.Blog;
import cn.tedu.entity.UserInfo;


public class ShowSendActionServlet extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String roomname = request.getParameter("browser");
		String title = request.getParameter("title");
		HttpSession session = request.getSession();
		UserInfo user = (UserInfo) session.getAttribute("user");
		Date date = new Date();
		long created = date.getTime();
		Blog blog = new Blog(0,roomname,title,created,user.getUserName(),"1");
		BlogDao dao = new BlogDao();
		dao.add(blog);
		response.sendRedirect(request.getContextPath()+"/SendActionServlet");
		
		
	}

}
