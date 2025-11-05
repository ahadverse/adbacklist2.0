export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/add-post",
    "/recharge-credits",
    "/user/local-ads",
    "/dashboard/:path*",
    "/report/:path*",
  ],
};
