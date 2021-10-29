import styles from "../styles/Home.module.css";
import Carsouel from "../components/CarouselPage";
import Category from "../components/Category";
import Card from "../components/Card";
//import data from "../sets.js";
import { SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentSets,
  getSuggestedSets,
  getPopularSets,
  getTopCategoriesSets,
} from "../store/sets/setsSlice";

export default function Home() {
  const recentSets = useSelector((state) => state.sets.data.recent);
  const suggestedSets = useSelector((state) => state.sets.data.suggested);
  const popularSets = useSelector((state) => state.sets.data.popular);
  const topCategories = useSelector((state) => state.sets.data.top);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentSets());
    dispatch(getSuggestedSets());
    dispatch(getPopularSets());
    dispatch(getTopCategoriesSets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const popularSets = data.Popular;
  // const latestSets = data.Latest;
  // const suggestedSets = data.Suggested;
  // const topCategories = data.top_categories;

  const allSets = (set) => {
    return (
      <SwiperSlide key={set.id}>
        <Card
          key={set.userId}
          userName={set.userName}
          description={set.description}
          title={set.title}
          cardCount={set.cardCount}
          //   imageUrl={set.imageUrl}
          //   avatar={set.avatar}
          tags={set.tags}
          setId={set.setId}
          userId={set.userId}
          className={styles.cardPadding}
        />
      </SwiperSlide>
    );
  };

  const allTopCategories = (cat) => {
    return <Category name={cat.name} categories={cat.categories} />;
  };

  return (
    <div className={styles.container}>
      <main style={{ width: "-webkit-fill-available" }}>
        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Popular
        </p>
        <Carsouel>{popularSets.map(allSets)}</Carsouel>

        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Latest
        </p>
        <Carsouel>
          {/* {latestSets.map(allSets)} */}
          {recentSets.map(allSets)}
        </Carsouel>

        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Suggested
        </p>
        <Carsouel>{suggestedSets.map(allSets)}</Carsouel>

        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Top Catrgories
        </p>
        <div className="flex text-center mt-12 mb-4 pb-8 bg-image bg-no-repeat bg-cover">
          {topCategories.map(allTopCategories)}
        </div>
      </main>
    </div>
  );
}
