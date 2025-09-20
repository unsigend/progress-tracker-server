import { Transform } from "class-transformer";

export const TrimString = () =>
  Transform(({ value }) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return String(value);
  });
