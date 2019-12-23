package cn.tedu.utils;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;

public class DBUtils {
	private static BasicDataSource ds;
	static {
		Properties p = new Properties();
		//获取文件输入流
		InputStream ips = 
				DBUtils.class.getClassLoader()
				.getResourceAsStream("jdbc.properties");
		try {
			p.load(ips);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String driver = p.getProperty("driver");
		String url = p.getProperty("url");
		String username = p.getProperty("username");
		String password = p.getProperty("password");

		//创建连接池对象
		ds = new BasicDataSource();
		//设置数据库连接信息
		ds.setDriverClassName(driver);
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		//设置初始连接数量
		ds.setInitialSize(3);
		//设置最大连接数量
		ds.setMaxActive(5);
	}
	
	public static Connection getConn()
			throws Exception {
		//获取连接
		Connection conn = ds.getConnection();
		//System.out.println(conn);  
		return conn;
	}
}
