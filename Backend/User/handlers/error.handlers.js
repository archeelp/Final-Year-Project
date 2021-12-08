// Route Handler for application errors
const internalError = (error, request, response, next) => {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong.",
    },
  });
};

// Route handler for 404 errors
const routeNotFound = (request, response, next) => {
  return response.status(404).json({
    error: {
      message: "Route not found.",
    },
  });
};

export default {
  internalError,
  routeNotFound,
};
