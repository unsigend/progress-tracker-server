// import dependencies
import { SetMetadata } from "@nestjs/common";

// export public decorator
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
