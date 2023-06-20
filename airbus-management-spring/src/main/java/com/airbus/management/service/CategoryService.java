package com.airbus.management.service;

import com.airbus.management.exception.CategoryAlreadyExistsException;
import com.airbus.management.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    boolean deleteCategory(String categoryId);

    boolean addCategory(Category categoryDetails) throws CategoryAlreadyExistsException;

    boolean updateCategory(Category categoryDetails, String categoryId);
}
