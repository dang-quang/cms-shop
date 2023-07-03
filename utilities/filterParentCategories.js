export const filterParentCategories = (categories, subcategoryId) => {
  const parentCategories = [];

  function findParentCategories(categoryList, parentId, level) {
    for (const category of categoryList) {
      if (category.id === parentId) {
        parentCategories.push({ category, level });
        if (category.parentId) {
          findParentCategories(categories, category.parentId, level - 1);
        }
        break;
      } else if (category.listChild) {
        findParentCategories(category.listChild, parentId, level);
      }
    }
  }

  findParentCategories(categories, subcategoryId, 0);

  // Sort parent categories by level in ascending order
  parentCategories.sort((a, b) => a.level - b.level);

  // Extract the parent categories without the level information
  const sortedParentCategories = parentCategories.map((item) => item.category);

  return sortedParentCategories;
};
