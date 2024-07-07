import { deleteFile } from '@/apis/fileApi';
import DeleteIcon from '@/components/Icon/DeleteIcon';
import { ServiceType } from '@/types/category.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HISTORY_QUIZ_QUERY_KEY, HISTORY_SUMMARY_QUERY_KEY } from './queryKey';
import useToast from './useToast';

export const useDeleteHistory = (type: ServiceType) => {
  const { fireToast } = useToast();
  const queryClient = useQueryClient();
  const invalidateKey =
    type === 'QUIZ' ? HISTORY_QUIZ_QUERY_KEY : HISTORY_SUMMARY_QUERY_KEY;

  return useMutation({
    mutationFn: async ({ fileId }: { fileId: number }) => {
      await deleteFile(fileId);
    },
    onSuccess: () => {
      fireToast({
        icon: <DeleteIcon width={20} height={20} />,
        message: '항목이 삭제되었습니다',
      });
      queryClient.invalidateQueries({ queryKey: [invalidateKey] });
    },
  });
};
