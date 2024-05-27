import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryApi from '../../../api/CategoryApi';
import { CategoryInfoType } from '../../../types';
import NoCategory from './NoCategory';
import NewCategoryModal from '../../../components/Modal/CategoryModal/NewCategoryModal';
import Sidebar from './Sidebar';
import { CategoryType } from '../../../types/category.type';
import { CATEGORY_TYPE } from '../../../constants';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper';
import DefaultView from './DefaultView';
import CategoryItemsView from './CategoryItemsView';
import { CategoryQuizItemsType } from '../../../types/quiz.type';
import { CategorySummaryItemsType } from '../../../types/summary.type';
import CTAButton from '../../../components/Button/CTAButton';

const BUTTON = { quiz: '카테고리에 퀴즈 추가', summary: '카테고리에 요약 추가' };

function MyCategory() {
  const [params] = useSearchParams();
  const categoryType = params.get('type');
  const categoryId = params.get('categoryId') || '';
  const [currentType, setCurrentType] = useState<keyof CategoryType | null>(null); // 탭바 (퀴즈/요약)
  const [quizCategoryList, setQuizCategoryList] = useState<CategoryInfoType[]>([]); // 퀴즈 카테고리 목록
  const [summaryCategoryList, setSummaryCategoryList] = useState<CategoryInfoType[]>([]); // 요약 카테고리 목록
  const [activeCategoryName, setActiveCategoryName] = useState<string>(''); // 조회 중인 카테고리 (퀴즈/요약)
  const [activeCategoryQuizItems, setActiveCategoryQuizItems] = useState<CategoryQuizItemsType[]>([]);
  const [activeCategorySummaryItems, setActiveCategorySummaryItems] = useState<CategorySummaryItemsType[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [completedRequests, setCompletedRequests] = useState(0);
  const navigate = useNavigate();

  const completeRequest = () => {
    setCompletedRequests((prev) => prev + 1);
  };

  const getQuizCategories = async () => {
    await CategoryApi.getCategoryList('quiz').then((data) => {
      setQuizCategoryList(data.data);
      completeRequest();
    });
  };

  const getSummaryCategories = async () => {
    await CategoryApi.getCategoryList('summary').then((data) => {
      setSummaryCategoryList(data.data);
      completeRequest();
    });
  };

  const getCategoryItems = async (id: number, type: string) => {
    await CategoryApi.getCategoryItems(id).then((data) => {
      if (type === 'quiz') {
        setActiveCategoryQuizItems(data.categorizedProblemResponses.data);
      } else {
        setActiveCategorySummaryItems(data.categorizedProblemResponses.data);
      }
    });
  };

  useEffect(() => {
    getQuizCategories();
    getSummaryCategories();

    if (categoryType && Object.keys(CATEGORY_TYPE).includes(categoryType)) {
      setCurrentType(categoryType as keyof CategoryType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('type')]);

  useEffect(() => {
    if (completedRequests === 2) {
      setIsLoading(false);
    }
  }, [completedRequests]);

  useEffect(() => {
    if (categoryType && Object.keys(CATEGORY_TYPE).includes(categoryType) && categoryId !== '') {
      getCategoryItems(Number(categoryId), categoryType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('type'), params.get('categoryId')]);

  useEffect(() => {
    if (!showCategoryModal) {
      getQuizCategories();
      getSummaryCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCategoryModal]);

  const handleAddItem = () => {
    if (currentType === 'quiz') navigate('/quiz/ai');
    else navigate('/summary/ai');
  };

  if (isLoading) return <p>Loading...</p>;

  if (quizCategoryList.length + summaryCategoryList.length === 0) return <NoCategory />;

  if (currentType === null) return <Navigate to="/management/mycategory?type=quiz" replace />;

  return (
    <>
      {showCategoryModal && (
        <NewCategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType={currentType}
          categoryList={currentType === 'quiz' ? quizCategoryList : summaryCategoryList}
          setCategoryList={currentType === 'quiz' ? setQuizCategoryList : setSummaryCategoryList}
        />
      )}
      <Container>
        <Sidebar
          currentType={currentType}
          categoryList={currentType === 'quiz' ? quizCategoryList : summaryCategoryList}
          activeCategoryId={categoryId}
          setActiveCategoryName={setActiveCategoryName}
          setCategoryList={currentType === 'quiz' ? setQuizCategoryList : setSummaryCategoryList}
          setShowCategoryModal={setShowCategoryModal}
        />
        <ContentWrapper>
          {CATEGORY_TYPE[currentType].key === '퀴즈' &&
            (categoryId !== '' ? (
              <CategoryItemsView
                activeTabBar={CATEGORY_TYPE[currentType].key}
                activeCategoryId={categoryId}
                activeCategoryName={activeCategoryName}
                activeCategoryQuizItems={activeCategoryQuizItems}
                activeCategorySummaryItems={activeCategorySummaryItems}
                setActiveCategoryQuizItems={setActiveCategoryQuizItems}
                setActiveCategorySummaryItems={setActiveCategorySummaryItems}
              />
            ) : (
              <DefaultView />
            ))}
          {CATEGORY_TYPE[currentType].key === '요약' &&
            (categoryId !== '' ? (
              <CategoryItemsView
                activeTabBar={CATEGORY_TYPE[currentType].key}
                activeCategoryId={categoryId}
                activeCategoryName={activeCategoryName}
                activeCategoryQuizItems={activeCategoryQuizItems}
                activeCategorySummaryItems={activeCategorySummaryItems}
                setActiveCategoryQuizItems={setActiveCategoryQuizItems}
                setActiveCategorySummaryItems={setActiveCategorySummaryItems}
              />
            ) : (
              <DefaultView />
            ))}
          <div className="button-container">
            {categoryId !== '' && (
              <CTAButton size="large" onClick={handleAddItem}>
                {BUTTON[currentType]}
              </CTAButton>
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
