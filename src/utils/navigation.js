const navigateByRole = (role, navigateFn) => {
  switch (role) {
    case "QA":
      navigateFn("/qa/home");
      break;
    case "staff":
      navigateFn("/staff/home");
      break;
    case "admin":
      navigateFn("/admin/home");
      break;
    case "QA of business":
    case "QA of IT":
    case "QA of graphic design":
      navigateFn("/qac/home");
      break;
    default:
      navigateFn("/");
      break;
  }
};

export { navigateByRole };
