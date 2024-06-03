import CategorySection from '@/containers/CategoryPage/CategorySection';
import NoCategorySection from '@/containers/CategoryPage/NoCategorySection';
import { useGetCategoryList } from '@/hooks/useGetCategory';
import useRedirect from '@/hooks/useRedirect';
import { ServiceType } from '@/types/category.type';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    if (
      !type &&
      fetchedQuizCategoryList.data.length +
        fetchedSummaryCategoryList.data.length !==
        0
    )
      redirect('/management/category?type=quiz');

    if (type && type !== 'QUIZ' && type !== 'SUMMARY')
      redirect('/management/category');
  }, [type, fetchedQuizCategoryList.data, fetchedSummaryCategoryList.data]);

  if (
    !type &&
    fetchedQuizCategoryList.data.length +
      fetchedSummaryCategoryList.data.length ===
      0
  )
    return <NoCategorySection />;

  if (type === 'QUIZ' || type === 'SUMMARY')
    return (
      <CategorySection
        refetchQuizCategoryList={refetchQuizCategoryList}
        refetchSummaryCategoryList={refetchSummaryCategoryList}
        quizCategories={fetchedQuizCategoryList.data}
        summaryCategories={fetchedSummaryCategoryList.data}
      />
    );
}

export default CategoryPage;
