package cn.tedu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import cn.tedu.utils.DBUtils;

/**   
 * @包名 cn.tedu.dao 
 * @作者名 XM Yang   
 * @时间 2019年11月25日 下午7:50:24 
 */
public class YanDao {

	public List<String> yan(String phone) {
		ArrayList<String> list = null;
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "select id from userinfo where phone=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, phone);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				list = new ArrayList<>(rs.getInt(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
}
