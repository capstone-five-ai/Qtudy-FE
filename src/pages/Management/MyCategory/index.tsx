import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryInfoType, CategoryQuizItemsType, CategorySummaryItemsType, CategoryType } from '../../../types';
import NoCategory from './NoCategory';
import Sidebar from './Sidebar';
import NoItem from './NoItem';
import CategoryItemsView from './CategoryItemsView';
import { CATEGORY_TYPE_MAPPING } from '../../../constants';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper';
import DefaultButton from '../../../components/Button/DefaultButton';
import CategoryApi from '../../../api/CategoryApi';

const BUTTON = { 퀴즈: '카테고리에 퀴즈 추가', 요약: '카테고리에 요약 추가' };

function MyCategory() {
  const [activeTabBar, setActiveTabBar] = useState<CategoryType>('퀴즈'); // 탭바 (퀴즈/요약)
  const [showNoCategoryView, setShowNoCategoryView] = useState(false); // NoCategory 출력 여부
  const [quizCategoryList, setQuizCategoryList] = useState<CategoryInfoType[]>([]); // 퀴즈 카테고리 목록
  const [summaryCategoryList, setSummaryCategoryList] = useState<CategoryInfoType[]>([]); // 요약 카테고리 목록
  const [activeCategory, setActiveCategory] = useState<CategoryInfoType | null>(null); // 조회 중인 카테고리 (퀴즈/요약)
  const [activeCategoryQuizItems, setActiveCategoryQuizItems] = useState<CategoryQuizItemsType[]>([]);
  const [activeCategorySummaryItems, setActiveCategorySummaryItems] = useState<CategorySummaryItemsType[]>([]);
  const [hasExecutedOnce, setHasExecutedOnce] = useState(false);
  const location = useLocation();

  const getCategorys = async () => {
    const response = await CategoryApi.getCategoryList(CATEGORY_TYPE_MAPPING[activeTabBar]);
    if (activeTabBar === '퀴즈') {
      setQuizCategoryList(response.data);
    } else {
      setSummaryCategoryList(response.data);
    }
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.activeTab) setActiveTabBar(state.activeTab);

    // TODO: state로 넘어온 activeCategory 세팅
  }, [location]);

  useEffect(() => {
    if (!hasExecutedOnce && quizCategoryList.length === 0 && summaryCategoryList.length === 0) {
      setShowNoCategoryView(true);
      setHasExecutedOnce(true);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizCategoryList, summaryCategoryList]);

  useEffect(() => {
    getCategorys();
    setActiveCategory(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabBar]);

  const handleAddItem = () => {
    // TODO: 퀴즈 추가 API, 요약 추가 API
  };

  if (showNoCategoryView) return <NoCategory setShowNoCategoryView={setShowNoCategoryView} />;

  return (
    <Container>
      <Sidebar
        activeTabBar={activeTabBar}
        categoryList={activeTabBar === '퀴즈' ? quizCategoryList : summaryCategoryList}
        activeCategory={activeCategory}
        setActiveTabBar={setActiveTabBar}
        setCategoryList={activeTabBar === '퀴즈' ? setQuizCategoryList : setSummaryCategoryList}
        setActiveCategory={setActiveCategory}
      />
      <ContentWrapper>
        {activeTabBar === '퀴즈' &&
          (quizCategoryList.length === 0 ? (
            <NoItem categoryType={activeTabBar} />
          ) : (
            <CategoryItemsView
              activeTabBar={activeTabBar}
              activeCategoryQuizItems={activeCategoryQuizItems}
              activeCategorySummaryItems={activeCategorySummaryItems}
              setActiveCategoryQuizItems={setActiveCategoryQuizItems}
              setActiveCategorySummaryItems={setActiveCategorySummaryItems}
            />
          ))}
        {activeTabBar === '요약' &&
          (summaryCategoryList.length === 0 ? (
            <NoItem categoryType={activeTabBar} />
          ) : (
            <CategoryItemsView
              activeTabBar={activeTabBar}
              activeCategoryQuizItems={activeCategoryQuizItems}
              activeCategorySummaryItems={activeCategorySummaryItems}
              setActiveCategoryQuizItems={setActiveCategoryQuizItems}
              setActiveCategorySummaryItems={setActiveCategorySummaryItems}
            />
          ))}
        <div className="button-container">
          <DefaultButton size="large" onClick={handleAddItem}>
            {BUTTON[activeTabBar]}
          </DefaultButton>
        </div>
      </ContentWrapper>
    </Container>
  );
}

export default MyCategory;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  max-height: calc(100vh - 65px - 190px);
  min-height: 572px;
  padding: 0px 20px;

  & > div:nth-child(2) {
    width: 800px;
    position: relative;
  }

  .button-container {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
