import SuspenseLoading from '@/components/Loader/SuspenseLoading';
import { useGetCategoryList } from '@/hooks/useGetCategory';
import useRedirect from '@/hooks/useRedirect';
import { ServiceType } from '@/types/category.type';
import { lazy, Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Lazy load the components
const CategorySection = lazy(
  () => import('@/containers/CategoryPage/CategorySection')
);
const NoCategorySection = lazy(
  () => import('@/containers/CategoryPage/NoCategorySection')
);

function CategoryPage() {
  const redirect = useRedirect();
  const [params] = useSearchParams();
  const type = params.get('type')?.toUpperCase() as ServiceType | undefined;

  const { data: fetchedQuizCategoryList, refetch: refetchQuizCategoryList } =
    useGetCategoryList('QUIZ');
  const {
    data: fetchedSummaryCategoryList,
    refetch: refetchSummaryCategoryList,
  } = useGetCategoryList('SUMMARY');

  useEffect(() => {
    const quizLength = fetchedQuizCategoryList?.data?.length || 0;
    const summaryLength = fetchedSummaryCategoryList?.data?.length || 0;

    if (!type && quizLength + summaryLength !== 0)
      redirect('/management/category?type=quiz');

    if (type && type !== 'QUIZ' && type !== 'SUMMARY')
      redirect('/management/category');
  }, [type, fetchedQuizCategoryList, fetchedSummaryCategoryList]);

  const renderContent = () => {
    if (!fetchedQuizCategoryList || !fetchedSummaryCategoryList)
      return <div>Loading data...</div>;

    if (
      !type &&
      fetchedQuizCategoryList?.data?.length +
        fetchedSummaryCategoryList?.data?.length ===
        0
    )
      return <NoCategorySection />;

    if (type === 'QUIZ' || type === 'SUMMARY')
      return (
        <CategorySection
          refetchQuizCategoryList={refetchQuizCategoryList}
          refetchSummaryCategoryList={refetchSummaryCategoryList}
          quizCategories={fetchedQuizCategoryList?.data || []}
          summaryCategories={fetchedSummaryCategoryList?.data || []}
        />
      );

    return null;
  };

  return <Suspense fallback={<SuspenseLoading />}>{renderContent()}</Suspense>;
}

export default CategoryPage;
