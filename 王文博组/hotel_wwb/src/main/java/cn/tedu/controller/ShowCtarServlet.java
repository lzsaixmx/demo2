package cn.tedu.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.thymeleaf.context.Context;

import cn.tedu.dao.CtarDao;
import cn.tedu.entity.Ctar;
import cn.tedu.entity.UserInfo;
import cn.tedu.utils.ThUtils;

public class ShowCtarServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		long time = 1000l*60*60*24*90;
		Date date = new Date();
		time = date.getTime()-time;
		HttpSession session = request.getSession();
		UserInfo user = (UserInfo) session.getAttribute("user");
		Context context = new Context();
		context.setVariable("userName", user.getUserName());
		CtarDao dao = new CtarDao();
		dao.delete(time);
		List<Ctar> list = dao.list();
		context.setVariable("list", list);
		ThUtils.write("Ctar", context, response);
	}

}
