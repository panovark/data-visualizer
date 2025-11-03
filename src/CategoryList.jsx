import { getCategoryCounts } from "./utils/dataProcessing";

const CategoryList = ({ questions }) => {
  const categories = getCategoryCounts(questions);

  return (
    <div>
      <h2>Categories ({categories.length})</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            {category.name}: <strong>{category.count}</strong> questions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
