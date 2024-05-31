import { postSummaryByUser } from '@/apis/summaryApi';
import loadingState from '@/recoils/atoms/loadingState';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const usePostSummaryByUser = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByUserMutation = useMutation({
    mutationFn: async ({
      title,
      summary,
    }: {
      title: string;
      summary: string;
    }) => {
      try {
        setLoading(true);

        const response = await postSummaryByUser({
          summaryTitle: title,
          summaryContent: summary,
        });
        setTimeout(() => {
          navigate(`/summary/user?complete=true&id=${response.summaryId}`);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error generating summary:', error);
        setLoading(false);
      }
    },
  });

  return createByUserMutation;
};
