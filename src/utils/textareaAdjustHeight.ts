const textareaAdjustHeight = (
  textareaRef: React.RefObject<HTMLTextAreaElement>
) => {
  if (!textareaRef.current) return;

  // 스크롤 위치 저장
  const scrollTop = textareaRef.current.scrollTop;

  // 높이 재설정
  textareaRef.current.style.height = 'auto';
  const newHeight = textareaRef.current.scrollHeight;
  textareaRef.current.style.height = `${newHeight}px`;

  // 스크롤 위치 복원
  textareaRef.current.scrollTop = scrollTop;
};

export default textareaAdjustHeight;
