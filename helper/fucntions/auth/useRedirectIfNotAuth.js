export const useRedirectIfNotAuth = (router , locale) => {
  router.push(`/${locale}/home`);
};
