import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NoCategory from './NoCategory';
import Sidebar from './Sidebar';
import CategoryItemsView from './CategoryItemsView';
import { CATEGORY_TYPE_MAPPING } from '../../../constants';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper';
import DefaultButton from '../../../components/Button/DefaultButton';
import CategoryApi from '../../../api/CategoryApi';
import NewCategoryModal from '../../../components/Modal/CategoryModal/NewCategoryModal';
import { CategoryInfoType, CategoryType } from '../../../types';
import { CategoryQuizItemsType } from '../../../types/quiz.type';
import { CategorySummaryItemsType } from '../../../types/summary.type';
import DefaultView from './DefaultView';

const BUTTON = { 퀴즈: '카테고리에 퀴즈 추가', 요약: '카테고리에 요약 추가' };

function MyCategory() {
  const [activeTabBar, setActiveTabBar] = useState<CategoryType>('퀴즈'); // 탭바 (퀴즈/요약)
  const [showNoCategoryView, setShowNoCategoryView] = useState(true); // NoCategory 출력 여부
  const [quizCategoryList, setQuizCategoryList] = useState<CategoryInfoType[]>([]); // 퀴즈 카테고리 목록
  const [summaryCategoryList, setSummaryCategoryList] = useState<CategoryInfoType[]>([]); // 요약 카테고리 목록
  const [activeCategory, setActiveCategory] = useState<CategoryInfoType | null>(null); // 조회 중인 카테고리 (퀴즈/요약)
  const [activeCategoryQuizItems, setActiveCategoryQuizItems] = useState<CategoryQuizItemsType[]>([]);
  const [activeCategorySummaryItems, setActiveCategorySummaryItems] = useState<CategorySummaryItemsType[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getAllCategorys = async () => {
    const quizResponse = await CategoryApi.getCategoryList(CATEGORY_TYPE_MAPPING['퀴즈']);
    const summaryResponse = await CategoryApi.getCategoryList(CATEGORY_TYPE_MAPPING['요약']);

    if (quizResponse.data.length > 0 || summaryResponse.data.length > 0) {
      setShowNoCategoryView(false);
    }
  };

  const getCategorys = async () => {
    await CategoryApi.getCategoryList(CATEGORY_TYPE_MAPPING[activeTabBar]).then((data) => {
      if (activeTabBar === '퀴즈') {
        setQuizCategoryList(data.data);
      } else {
        setSummaryCategoryList(data.data);
      }
    });
  };

  const getCategoryItems = async (id: number, type: string) => {
    await CategoryApi.getCategoryItems(id).then((data) => {
      if (type === 'PROBLEM') {
        setActiveCategoryQuizItems(data.categorizedProblemResponses.data);
      } else {
        setActiveCategorySummaryItems(data.categorizedProblemResponses.data);
      }
    });
  };

  useEffect(() => {
    getAllCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { state } = location;
    if (state && state.activeTab) setActiveTabBar(state.activeTab);
  }, [location]);

  useEffect(() => {
    getCategorys();
    setActiveCategory(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabBar]);

  useEffect(() => {
    if (activeCategory) getCategoryItems(activeCategory.categoryId, activeCategory.categoryType);
  }, [activeCategory]);

  useEffect(() => {
    if (!showCategoryModal) getCategorys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCategoryModal]);

  const handleAddItem = () => {
    if (activeTabBar === '퀴즈') navigate('/quiz/ai');
    else navigate('/summary/ai');
  };

  if (showNoCategoryView) return <NoCategory setShowNoCategoryView={setShowNoCategoryView} />;

  return (
    <>
      {showCategoryModal && (
        <NewCategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType={CATEGORY_TYPE_MAPPING[activeTabBar]}
          categoryList={activeTabBar === '퀴즈' ? quizCategoryList : summaryCategoryList}
          setCategoryList={activeTabBar === '퀴즈' ? setQuizCategoryList : setSummaryCategoryList}
        />
      )}
      <Container>
        <Sidebar
          activeTabBar={activeTabBar}
          categoryList={activeTabBar === '퀴즈' ? quizCategoryList : summaryCategoryList}
          activeCategory={activeCategory}
          setCategoryList={activeTabBar === '퀴즈' ? setQuizCategoryList : setSummaryCategoryList}
          setActiveTabBar={setActiveTabBar}
          setActiveCategory={setActiveCategory}
          setShowCategoryModal={setShowCategoryModal}
        />
        <ContentWrapper>
          {activeTabBar === '퀴즈' &&
            (activeCategory ? (
              <CategoryItemsView
                activeTabBar={activeTabBar}
                activeCategory={activeCategory}
                activeCategoryQuizItems={activeCategoryQuizItems}
                activeCategorySummaryItems={activeCategorySummaryItems}
                setActiveCategoryQuizItems={setActiveCategoryQuizItems}
                setActiveCategorySummaryItems={setActiveCategorySummaryItems}
              />
            ) : (
              <DefaultView />
            ))}
          {activeTabBar === '요약' &&
            (activeCategory ? (
              <CategoryItemsView
                activeTabBar={activeTabBar}
                activeCategory={activeCategory}
                activeCategoryQuizItems={activeCategoryQuizItems}
                activeCategorySummaryItems={activeCategorySummaryItems}
                setActiveCategoryQuizItems={setActiveCategoryQuizItems}
                setActiveCategorySummaryItems={setActiveCategorySummaryItems}
              />
            ) : (
              <DefaultView />
            ))}
          <div className="button-container">
            {activeCategory && (
              <DefaultButton size="large" onClick={handleAddItem}>
                {BUTTON[activeTabBar]}
              </DefaultButton>
            )}
          </div>
        </ContentWrapper>
      </Container>
    </>
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
