export const queryParamsToString = <T>(queryParams: T): string => {
  const keys: Array<keyof T> = Object.keys(queryParams) as Array<keyof T>;

  if (!keys.length) {
    return "";
  }

  const keysAndValues: string[] = keys.map(
    (key: keyof T) => `${key}=${queryParams[key]}`
  );

  return `?${keysAndValues.join("&")}`;
};
