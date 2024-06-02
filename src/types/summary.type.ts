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
