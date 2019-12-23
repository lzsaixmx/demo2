package cn.tedu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import cn.tedu.entity.Ctar;
import cn.tedu.utils.DBUtils;

/**   
 * @包名 cn.tedu.dao 
 * @作者名 XM Yang   
 * @时间 2019年11月28日 下午5:26:20 
 */
public class CtarDao {

	public List<Ctar> list() {
		ArrayList<Ctar> list = new ArrayList<>();
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "select * from ctar";
			Statement s = conn.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while(rs.next()) {
				Ctar ctar = new Ctar(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getLong(4));
				list.add(ctar);
			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public void add(String text, String userName) {
		Date date = new Date();
		long created = date.getTime();
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "insert into ctar values(null,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, userName);
			ps.setString(2, text);
			ps.setLong(3, created);
			ps.executeUpdate();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public void delete(long time) {
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "delete from ctar where ctardate<?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setLong(1, time);
			ps.executeUpdate();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
