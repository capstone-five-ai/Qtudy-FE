export interface GenerateUserSummaryOption {
  summaryTitle: string;
  summaryContent: string;
}

export interface GenerateSummaryOption {
  amount?: string;
  fileName: string;
  isDuplicatedFileName?: boolean | null;
}

export interface GenerateAISummaryFile extends GenerateUserSummaryOption {
  aiGeneratedSummaryId: number;
}

export interface GenerateUserSummaryItem extends GenerateUserSummaryOption {
  summaryId: number;
}

export interface SummaryType extends GenerateAISummaryFile {
  fileId: number;
  createTime: string;
  updateTime: string;
}

export interface UserSummaryItem {
  response: GenerateUserSummaryItem;
  isWriter: boolean;
}

export interface CategoryOtherSummaryItem {
  categorizedSummaryId: number;
  categorizedSummaryName: string;
}

export interface CategorySummaryItem {
  categorizedSummaryId: number;
  summaryTitle: string;
  summaryContent: string;
  categoryName: string;
  categoryId: number;
  previousSummary: CategoryOtherSummaryItem | null;
  nextSummary: CategoryOtherSummaryItem | null;
}
