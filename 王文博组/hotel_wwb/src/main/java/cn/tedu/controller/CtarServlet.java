package cn.tedu.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.tedu.dao.CtarDao;
import cn.tedu.entity.UserInfo;

public class CtarServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		UserInfo user = (UserInfo) session.getAttribute("user");
		request.setCharacterEncoding("UTF-8");
		String text = request.getParameter("text");
		System.out.println(text);
		CtarDao dao = new CtarDao();
		dao.add(text,user.getUserName());
		response.setContentType("text/html;chatset=utf-8");
		response.sendRedirect(request.getContextPath()+"/ShowCtarServlet");
	}

}
