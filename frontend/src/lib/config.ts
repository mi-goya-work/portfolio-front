const CMS_API_FALLBACK = "https://cms-demo.cms.mi-goya.com/api/v1/public";

/** headless-cms Public API のベースURL — サーバーコンポーネント用 */
export const CMS_API_BASE_URL =
  process.env.CMS_API_BASE_URL || CMS_API_FALLBACK;

/** headless-cms Public API のベースURL — クライアントコンポーネント用（NEXT_PUBLIC_ 必須） */
export const CMS_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || CMS_API_FALLBACK;
