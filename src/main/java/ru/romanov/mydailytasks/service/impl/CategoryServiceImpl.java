package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.persistence.entity.Category;
import ru.romanov.mydailytasks.persistence.repository.CategoryRepository;
import ru.romanov.mydailytasks.service.CategoryService;
import ru.romanov.mydailytasks.web.model.CategoryWebModel;
import ru.romanov.mydailytasks.web.util.Converter;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryWebModel create(CategoryWebModel categoryWebModel) {
        Category category = new Category();
        category.setTitle(categoryWebModel.getTitle());
        categoryRepository.save(category);
        return Converter.toWebModel(category);
    }

    @Override
    @Transactional
    public CategoryWebModel update(CategoryWebModel categoryWebModel) {
        Category category = categoryRepository.findOne(categoryWebModel.getId());
        category.setTitle(categoryWebModel.getTitle());
        return Converter.toWebModel(category);
    }

    @Override
    @Transactional
    public CategoryWebModel delete(Long id) {
        Category category = categoryRepository.findOne(id);
        CategoryWebModel categoryWebModel = Converter.toWebModel(category);
        categoryRepository.delete(category);
        return categoryWebModel;
    }

    @Override
    @Transactional
    public CategoryWebModel get(Long id) {
        Category category = categoryRepository.findOne(id);
        return Converter.toWebModel(category);
    }

    @Override
    public List<CategoryWebModel> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(Converter::toWebModel).collect(Collectors.toList());
    }
}
