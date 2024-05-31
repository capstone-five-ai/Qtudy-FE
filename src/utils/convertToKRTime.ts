export const convertToKRTime = (time: string) => {
  const date = new Date(time);

  const koreanTime = date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return koreanTime.replace(
    /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/,
    '$1.$2.$3 $4:$5'
  );
};
