export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/profile",
    "/add-post",
    "/recharge-credits",
    "/user/local-ads",
    "/dashboard/:path*",
    "/report/:path*",
  ],
};
