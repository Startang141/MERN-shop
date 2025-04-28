export const notFound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    resStatusCode = 400;
  }

  res.status(resStatusCode).json({
    message: message,
    stack: err.stack,
  });
};
