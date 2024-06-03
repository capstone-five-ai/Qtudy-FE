export interface CategoryType {
  categoryId: number;
  categoryName: string;
  categoryType: string;
}

export type ServiceType = 'QUIZ' | 'SUMMARY';

export interface QuizCategoryItemType {
  categorizedProblemId: number;
  problemGeneratedBy: string;
  problemType: string;
  problemName: string;
  createTime: string;
  updateTime: string;
}

export interface SummaryCategoryItemType {
  categorizedSummaryId: number;
  summaryGeneratedBy: string;
  summaryTitle: string;
  summaryContent: string;
  createTime: string;
  updateTime: string;
}
