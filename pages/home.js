import styles from "../styles/Home.module.css";
import Carsouel from "../components/CarouselPage";
import Category from "../components/Category";
import Card from "../components/Card";
import data from "../sets.js";
import { SwiperSlide } from "swiper/react";

export default function Home() {
  const popularSets = data.Popular;
  const latestSets = data.Latest;
  const suggestedSets = data.Suggested;
  const topCategories = data.top_categories;

  const allSets = (set) => {
    return (
      <SwiperSlide key={set.id}>
        <Card
          key={set.id}
          userName={set.userName}
          description={set.description}
          title={set.title}
          cardCount={set.cardCount}
          imageUrl={set.imageUrl}
          avatar={set.avatar}
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
      <main>
        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Popular
        </p>
        <Carsouel>{popularSets.map(allSets)}</Carsouel>

        <p className="font-medium text-2xl mt-12">
          <i className="fas fa-chevron-right fa-sm mr-4"></i>
          Latest
        </p>
        <Carsouel>{latestSets.map(allSets)}</Carsouel>

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
