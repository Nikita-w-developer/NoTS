import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Sceleton";

import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const { sort, categoryId } = useSelector((state) => state.filterSlice);
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // const fetchPizzas = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(
  //       `https://64f6dedc9d7754084952b2b8.mockapi.io/pizzas/?sortBy=${
  //         sort.sortProperty === "rating"
  //           ? sort.sortProperty + "&order=desc"
  //           : sort.sortProperty
  //       }&category=${categoryId === 0 ? "" : categoryId}`
  //     );
  //     dispatch(setItems(res.data));
  //   } catch (error) {
  //     alert("Ошибка при получении пицц");
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   window.scrollTo(0, 0);
  // };

  React.useEffect(() => {
    dispatch(fetchPizzas({ sort, categoryId }));
  }, [categoryId, sort.sortProperty]);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeleton : pizzas}
      </div>
    </div>
  );
};

export default Home;
