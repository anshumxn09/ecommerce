import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

const Filter = () => {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.CategoryAPI.categories;
  const [products, setProducts] = state.productAPI.products;
  const [category, setCategory] = state.productAPI.category;
  const [sort, setSort] = state.productAPI.sort;
  const [search, setSearch] = state.productAPI.search;
  // const [page, setPage] = useState(1);
  // const [result, setResult] = useState(0); 

  const handleCategory = e => {
    setCategory(e.target.value);
    setSearch('');
  }
//   console.log(category);
  return (
    <div className="filter_menu">
      <div className="row">
        <span className="getbold">FILTER: </span>
        <select name="category" id="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => {
            return (
              <option value={"category="+category.name} key={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <input type="text" name="search" id="search" value={search} placeholder={"SEARCH FOR THE PRODUCTS"} onChange={e => setSearch(e.target.value.toLowerCase())}/>
      <div className="row">
        <span className="getbold">SORT BY: </span>
        <select name="sort" id="sort" value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Newest</option> 
        <option value="sort=oldest">Oldest</option> 
        <option value="sort=-sold">Best Sales</option>
        <option value="sort=-price">Price: High To Low</option>
        <option value="sort=price">Price: Low To High</option>
        {/* <option value="">Newest</option> */}
        </select>
      </div>
    </div>
  );
};

export default Filter;
