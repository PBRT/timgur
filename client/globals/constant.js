export const stackMobile = {
  throwOutConfidence: function (offset, element) {
    return Math.min(Math.abs(offset) / (element.offsetWidth * 0.3), 1);
  },
  minThrowOutDistance: 100,
  maxThrowOutDistance: 150,
};

export const stackDesktop = {
  throwOutConfidence: function (offset, element) {
    return Math.min(Math.abs(offset) / (element.offsetWidth * 0.7), 1);
  },
  minThrowOutDistance: 300,
  maxThrowOutDistance: 550,
};
