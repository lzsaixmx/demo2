package cn.tedu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import cn.tedu.entity.Blog;
import cn.tedu.utils.DBUtils;

/**   
 * @包名 cn.tedu.dao 
 * @作者名 XM Yang   
 * @时间 2019年11月27日 下午7:35:15 
 */
public class BlogDao {

	public void add(Blog blog) {
		int a = (int)(Math.random()*13)+1;
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "insert into blog values(null,?,?,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, blog.getRoomName());
			ps.setString(2, blog.getTitle());
			ps.setLong(3, blog.getCreated());
			ps.setString(4, blog.getUserName());
			ps.setString(5, a+".jpg");
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public List<Blog> list() {
		ArrayList<Blog> list = new ArrayList<>();
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "select * from blog order by date desc limit 0,8";
			Statement s = conn.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while(rs.next()) {
				Blog blog = new Blog(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getLong(4),rs.getString(5),rs.getString(6));
				list.add(blog);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
