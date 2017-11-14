package ru.romanov.mydailytasks.service;

import ru.romanov.mydailytasks.web.model.CategoryWebModel;

import java.util.List;

public interface CategoryService {

    CategoryWebModel create(CategoryWebModel categoryWebModel);

    CategoryWebModel update(CategoryWebModel categoryWebModel);

    CategoryWebModel delete(Long id);

    CategoryWebModel get(Long id);

    List<CategoryWebModel> getAll();
}
