package cn.tedu.utils;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

public class ThUtils {
	
	private static TemplateEngine te;
	static {
		te = new TemplateEngine();
		//创建解析器对象
		ClassLoaderTemplateResolver r =
				new ClassLoaderTemplateResolver();
		//设置字符集
		r.setCharacterEncoding("UTF-8");
		//设置后缀
		r.setSuffix(".html");
		//关联
		te.setTemplateResolver(r);
	}
	public static void write(String path,
		Context context,
		HttpServletResponse response) throws IOException {
		//通过模板引擎将页面和容器中的数据
		//合并到一起 得到一个新的html
		String html = 
				te.process(path, context);
		//把新的html返回给浏览器
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.print(html);
		pw.close();  
		
	}
}



