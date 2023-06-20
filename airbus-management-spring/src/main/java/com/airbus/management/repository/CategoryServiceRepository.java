package com.airbus.management.repository;

import com.airbus.management.model.Category;
import com.airbus.management.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryServiceRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	public List<Category> getAllCategories() {
		
		
		List<Category> categotyList=new ArrayList<>();
		
		 categotyList=jdbcTemplate.query("SELECT *from Category", new RowMapper<Category>(){  
			   
			@Override
			public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub

				Category categoty=new Category();
				categoty.setCategoryId(rs.getString("category_id"));
				categoty.setCategoryName(rs.getString("category_name"));
				categoty.setDescription(rs.getString("description"));
				return categoty;
			}  
		    }); 
		 
		return categotyList;
		}


	public int deleteCategory(String categoryId) {
		String query="delete from category where category_id='"+categoryId+"' ";
		return jdbcTemplate.update(query);
	}

	public void addCategory(Category categoryDetails) {

		String INSERT_STATEMENT = "INSERT INTO Category(category_id,category_name,description) VALUES (?,?,?)" ;

		jdbcTemplate.batchUpdate(INSERT_STATEMENT, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				// TODO Auto-generated method stub
				ps.setString(1,categoryDetails.getCategoryId());
				ps.setString(2, categoryDetails.getCategoryName());
				ps.setString(3, categoryDetails.getDescription());
				}

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return 1;
			}
		});
	}

	public int updateCategory(Category categoryDetails, String categoryId) {
		String query="UPDATE Category set category_name='"+categoryDetails.getCategoryName()+"',description='"+categoryDetails.getDescription()+"' where category_id='"+categoryId+"' ";
		return jdbcTemplate.update(query);

	}
}
