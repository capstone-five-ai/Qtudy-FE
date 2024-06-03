import { checkDuplicateFileName } from '@/apis/fileApi';
import { ServiceType } from '@/types/category.type';
import { useEffect } from 'react';

interface DuplicatedFileName {
  fileName: string;
  checkType: Extract<ServiceType, 'SUMMARY'> | 'PROBLEM';
  duplicateHandler: (isDuplicated?: boolean) => void;
}

const useDuplicatedFileName = ({
  fileName,
  checkType,
  duplicateHandler,
}: DuplicatedFileName) => {
  useEffect(() => {
    if (!fileName) return;
    (async () => {
      try {
        const res = await checkDuplicateFileName(fileName, checkType);
        duplicateHandler(res.duplicate);
      } catch (error) {
        console.error('Error Check Duplicate File Name:', error);
      }
    })();
  }, [fileName]);
};

export default useDuplicatedFileName;
