package com.airbus.management.service;

import com.airbus.management.exception.CategoryAlreadyExistsException;
import com.airbus.management.model.Category;
import com.airbus.management.model.Product;
import com.airbus.management.repository.CategoryServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryServiceRepository categoryServiceRepository;
	
	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		
		List<Category> result=new ArrayList<>();
		
		try {
			result= categoryServiceRepository.getAllCategories();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return result;
		
	}

	@Override
	public boolean deleteCategory(String categoryId) {
		// TODO Auto-generated method stub
		int result;

		try {
			result=categoryServiceRepository.deleteCategory(categoryId);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			result=0;
		}

		if(result==0)
		{
			return false;
		}
		return true;
	}

	@Override
	public boolean addCategory(Category categoryDetails) throws CategoryAlreadyExistsException {
		// TODO Auto-generated method stub
		boolean result;

		try {
			categoryServiceRepository.addCategory(categoryDetails);
			result=true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			result=false;
			throw new CategoryAlreadyExistsException("Category Already Exists!");

		}

		return result;
	}

	@Override
	public boolean updateCategory(Category categoryDetails, String categoryId) {
		// TODO Auto-generated method stub

		int result;

		try {
			result=categoryServiceRepository.updateCategory(categoryDetails,categoryId);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			result=0;
		}

		if(result==0)
		{
			return false;
		}
		return true;
	}
}
