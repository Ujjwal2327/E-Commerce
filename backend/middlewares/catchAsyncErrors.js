// to remove redundant try catch blocks from controller function to make code smaller and cleaner
export const catchAsyncErrors = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
