const getCircleNum = (num: number | string) => {
  return String.fromCharCode(0x2460 + Number(num));
};

export default getCircleNum;
