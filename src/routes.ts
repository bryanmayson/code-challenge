import { lazy } from "react";
import { PathRouteProps } from "react-router-dom";

export enum AppRouteEnum {
  LANDING = "/",
}

interface AppRouteStruct extends Omit<PathRouteProps, "element"> {
  path: AppRouteEnum;
  element: React.FC;
}

export const AppRoutes: AppRouteStruct[] = [
  {
    path: AppRouteEnum.LANDING,
    element: lazy(() => import("@/landing")),
  },
];
