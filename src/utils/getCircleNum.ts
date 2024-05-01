const getCircleNum = (num: number | string | null) => {
  return String.fromCharCode(0x2460 + Number(num) - 1);
};

export default getCircleNum;
