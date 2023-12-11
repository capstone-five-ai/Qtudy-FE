export interface SummaryType {
  memberSavedSummaryId?: number;
  summaryTitle: string;
  summaryContent: string;
}

export interface SummaryOptionType {
  amount: string;
  fileName: string;
}

export interface SummaryCreationByFileType {
  option: SummaryOptionType;
  file: FormData;
}

export interface SummaryCreationByTextType {
  option: SummaryOptionType;
  text: string;
}
