export interface GenerateSummaryOption {
  amount?: string;
  fileName: string;
}

export interface GenerateUserSummaryOption {
  summaryTitle: string;
  summaryContent: string;
}

export interface GenerateUserSummaryItem extends GenerateUserSummaryOption {
  summaryId: number;
}

export interface UserSummaryItem {
  response: GenerateUserSummaryItem;
  isWriter: boolean;
}
