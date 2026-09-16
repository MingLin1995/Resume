// i18n Translation Dictionary & Controller for Ming's Portfolio
const translations = {
  en: {
    // Nav
    nav_home: "Home",
    nav_projects: "Projects",
    nav_skills: "Skills",

    // Index page
    intro_greeting: "👋 Hi I'm Ming",
    intro_p1: "I am a developer driven by curiosity, who started self-learning programming to meet investment needs, thus embarking on this path in tech.",
    intro_p2: "I am skilled at problem-solving with an interdisciplinary approach, leveraging the business logic cultivated through my accounting background and the communication and coordination skills developed in the finance industry. In order to expand my technical abilities, I independently developed two full-stack projects and successfully transitioned into a software engineer role. I have experience in backend development, deployment processes, automation, and performance optimization, and I am able to collaborate closely with end-users to understand their needs.",
    intro_p3: "In recent years, I have also participated in multiple cross-industry projects through freelance work, where I was responsible for the entire process, from requirements gathering and system planning to development and deployment. This experience has allowed me to accumulate hands-on knowledge of technical implementation and product delivery. It has also enabled me to strike a balance between technical feasibility and business requirements, ensuring projects move forward efficiently.",
    intro_p4: "I aspire to be an engineer who combines 'technology × business × communication,' continuously deepening my technical expertise while expanding my influence in product thinking and team collaboration.",

    // Projects page section titles
    section_oss: "Open Source Contributions",
    section_project: "Projects",
    section_freelance: "Freelance Experience",

    // NestJS Open Source Card (Concise)
    oss_nest_title: "NestJS Core (@nestjs/common)",
    oss_nest_badge_merged: "Merged",
    oss_nest_pr_link_title: "PR #17668: Support numeric string values in ParseEnumPipe",
    oss_nest_summary_1: "<strong>Problem Discovery & Root Cause:</strong> Identified an unexpected validation failure when using <code>@Query()</code> with numeric enums, traced framework internals, and investigated community Issue #17638.",
    oss_nest_summary_2: "<strong>Strict Architecture:</strong> Designed a type-safe coercion mechanism using exact string matching (<code>toEnumValue</code>), rejecting malformed edge cases (e.g. <code>'01'</code>, <code>'-0'</code>, <code>'1.0'</code>) to guarantee backward compatibility.",
    oss_nest_summary_3: "<strong>Official Review & Merge:</strong> Authored comprehensive Jest test suites covering strict type boundaries; officially reviewed, optimized with memoization, and merged by creator Kamil Mysliwiec.",
    btn_deep_dive: "Deep Dive Architecture",

    // Deep Dive Modal
    modal_title: "NestJS Core Contribution: Architecture Deep Dive",
    modal_subtitle: "Pull Request #17668 · Merged into nestjs/nest master",
    modal_badge_pr: "PR #17668",
    modal_badge_issue: "Issue #17638",
    modal_badge_merged: "Merged by Kamil Mysliwiec",

    modal_sec1_title: "1. Problem Discovery & Background",
    modal_sec1_p1: "Encountered an unexpected validation failure when using <code>@Query()</code> with TypeScript numeric enums. While an AI assistant initially suggested a manual workaround at the controller layer, I recognized that HTTP query parameters naturally arrive as strings and the underlying <code>ParseEnumPipe</code> should natively validate and coerce them rather than throwing a 400 error. Further investigation with AI assistance located existing community Issue #17638, leading to an upstream fix.",
    modal_sec1_p2: "The root cause: client requests send <code>?status=0</code>, which Express/Fastify parses as the string <code>'0'</code>. In previous versions, <code>ParseEnumPipe.isEnum()</code> strictly checked <code>[0, 1].includes('0')</code>, evaluating to <code>false</code> and unexpectedly throwing <code>400 Bad Request: \"Validation failed (enum string is expected)\"</code>.",

    modal_sec2_title: "2. Community Issue & PR #17668",
    modal_sec2_p1: "Another PR (#17639) had initially been submitted by a community member. However, that contributor's environment was unfortunately compromised by an automated worm, force-pushing malicious payloads disguised in a <code>.woff2</code> font file and automation scripts.",
    modal_sec2_p2: "NestJS maintainer <code>@micalevisk</code> promptly identified the security risk and closed the compromised PR, with the team subsequently introducing guardrails to protect against malicious PR payloads.",
    modal_sec2_p3: "Following the closure of #17639, my clean and independent implementation in <strong>PR #17668</strong> provided a secure and complete solution, allowing the maintainers to smoothly address the issue.",

    modal_sec3_title: "3. Technical Decisions & Type Safety",
    modal_sec3_p1: "<strong>Risks of Loose Coercion:</strong> A naive approach using <code>isNumeric</code> regex and <code>Number(value)</code> would inadvertently accept ambiguous inputs such as <code>'00'</code>, <code>'01'</code>, <code>'1.0'</code>, or <code>'-0'</code>.",
    modal_sec3_p2: "<strong>Design Requirement:</strong> Enum validation must maintain strict type boundaries, accepting only exact string representations of defined enum members (e.g., matching <code>'0'</code> to <code>0</code>, but rejecting <code>'00'</code> or <code>'1.0'</code>).",
    modal_sec3_p3: "<strong>Final Architecture:</strong> Implemented exact string matching via <code>toEnumValue</code> (<code>String(enumValue) === value</code>). This eliminated regex overhead and redundant passes in <code>transform()</code>, guaranteeing strict enum type safety.",

    modal_sec4_title: "4. Edge Cases & Jest Testing",
    modal_sec4_p1: "Authored comprehensive Jest unit tests covering:",
    modal_sec4_li1: "Edge case rejections: Explicitly asserted that ambiguous inputs like <code>'01'</code>, <code>'1.0'</code>, and <code>'-0'</code> throw <code>BadRequestException</code>.",
    modal_sec4_li2: "Enum variants: Validated compatibility across string enums, numeric enums, mixed enums, and float-valued enums.",
    modal_sec4_li3: "Extensibility: Streamlined protected methods and properly typed <code>getEnumValues(): (string | number)[]</code>.",

    modal_sec5_title: "5. Optimization & Official Merge",
    modal_sec5_p1: "NestJS creator <strong>Kamil Mysliwiec</strong> reviewed the implementation, added a follow-up optimization commit (<code>perf(common): memoize enum values lookup</code>) to cache enum values across requests, and officially merged PR #17668 into the master branch.",

    modal_btn_close: "Close",
    modal_btn_view_pr: "View on GitHub",

    // Other Projects
    proj_crypto_v2_title: "Crypto-Sniper V2",
    proj_crypto_v2_desc: "An upgraded automated crypto tracking dashboard. Features optimized live data fetching from Binance REST API, Redis caching, robust Docker containerization, NestJS backend, and multi-platform OAuth (Discord, Google, Telegram) integrations.",
    proj_crypto_v1_title: "Crypto-Sniper",
    proj_crypto_v1_desc: "Crypto Sniper is a tool designed to assist investors in identifying potential investment targets through moving average filters.",
    proj_taipei_title: "Taipei-day-trip",
    proj_taipei_desc: "Taipei Day Trip is an e-commerce website that allows users to search for attractions and book trips.",
    proj_linebot_title: "LINE Bot Appointment System",
    proj_linebot_desc: "Built a LINE Bot–integrated appointment management system for a medical clinic, including appointment booking, staff scheduling, blacklist management, and daily automated notifications, with a centralized admin backend.",
    proj_room_title: "Discussion Room Reservation System",
    proj_room_desc: "Designed and developed a discussion room reservation system supporting booking management, time-slot restrictions, admin dashboard, and automated email notifications.",
    proj_game_title: "Interactive Game Campaign Page",
    proj_game_desc: "Independently developed a decoupled front-end and back-end interactive game campaign page. Integrated dynamic front-end experiences with a robust backend architecture to deliver smooth gameplay, social sharing features, and cloud deployment, with full cross-platform support.",

    // Skills Page Categories
    skill_cat_backend: "Backend Skills",
    skill_cat_devops: "DevOps Skills",
    skill_cat_frontend: "Frontend Skills",
    skill_sub_lang_runtime: "Languages & Runtimes",
    skill_sub_frameworks: "Frameworks",
    skill_sub_databases: "Databases",
    skill_sub_orm_testing: "ORMs & Testing",
    skill_sub_cloud: "Cloud Providers & Services",
    skill_sub_container: "Containerization & Servers",
    skill_sub_cicd: "CI/CD & Version Control",
    skill_sub_security_dns: "Security & DNS",
    skill_sub_os: "Operating Systems",
    skill_sub_fe_lang: "Languages",
    skill_sub_fe_frameworks: "Frameworks & Libraries",
    skill_sub_css_ui: "CSS & UI Libraries",

    // Switcher label
    lang_label: "繁體中文"
  },
  zh: {
    // Nav
    nav_home: "首頁",
    nav_projects: "專案經歷",
    nav_skills: "專業技能",

    // Index page
    intro_greeting: "👋 你好，我是 Ming",
    intro_p1: "我是一位興趣使然的開發者，為了投資的需求，開始自學寫程式，因此踏上寫程式的這條路。",
    intro_p2: "我擅長以跨領域思維解決問題，擁有會計背景培養的商業邏輯與金融業鍛鍊的溝通協調能力。為了拓展技術能力，我獨立開發兩個全端專案並順利轉職成為軟體工程師，參與後端開發、部署流程、自動化作業與效能優化，也能與第一線使用者緊密合作理解需求。",
    intro_p3: "近年亦透過個人接案參與多個跨產業專案，負責需求訪談、系統規劃、開發到上線的完整流程，累積了技術落地與產品交付經驗。這讓我能在技術可行性與商業需求之間取得平衡，推動專案更有效率地前進。",
    intro_p4: "我期望成為結合「技術 × 商業 × 溝通」的工程師，持續提升技術深度，同時擴大在產品思考與團隊協作上的影響力。",

    // Projects page section titles
    section_oss: "開源專案貢獻 (Open Source)",
    section_project: "個人專案 (Projects)",
    section_freelance: "接案經歷 (Freelance)",

    // NestJS Open Source Card (Concise)
    oss_nest_title: "NestJS 官方核心庫 (@nestjs/common)",
    oss_nest_badge_merged: "已合併 (Merged)",
    oss_nest_pr_link_title: "PR #17668: 支援 ParseEnumPipe 數值字串型態轉換",
    oss_nest_summary_1: "<strong>實戰發現與定位 Issue #17638：</strong> 於專案實作 <code>@Query()</code> 搭配數值列舉時發現驗證異常，主動探究框架底層機制，並追蹤定位至官方 Issue #17638 提出修復。",
    oss_nest_summary_2: "<strong>嚴謹架構設計：</strong> 設計型別安全的轉型機制（<code>toEnumValue</code>），採用精確字串比對，嚴格拒絕模糊的邊界案例（如 <code>'01'</code>、<code>'-0'</code>、<code>'1.0'</code>），確保向下相容與型別嚴謹。",
    oss_nest_summary_3: "<strong>官方 Review 與合併：</strong> 完整補齊 Jest 單元測試與型別邊界防禦，由 NestJS 創始人 Kamil Mysliwiec 親自 Review、追加記憶化優化並順利合併進 master 分支。",
    btn_deep_dive: "詳細架構解析 (Deep Dive)",

    // Deep Dive Modal
    modal_title: "NestJS 核心貢獻：架構與設計解析",
    modal_subtitle: "Pull Request #17668 · 已合併至 nestjs/nest master 分支",
    modal_badge_pr: "PR #17668",
    modal_badge_issue: "Issue #17638",
    modal_badge_merged: "由創辦人 Kamil Mysliwiec 合併",

    modal_sec1_title: "1. 問題發現與背景",
    modal_sec1_p1: "在開發中使用 <code>@Query()</code> 搭配 TypeScript 數值列舉時遇到驗證異常。AI 最初建議在 Controller 層手動轉換繞過，但我指出 HTTP 查詢參數以純字串傳遞屬於常見場景，框架底層的 <code>ParseEnumPipe</code> 應當原生支援數值轉換而非直接拋出 400 錯誤。進一步深入追查後，AI 協助檢索到官方社群已有人回報相同問題（Issue #17638），隨即展開深入修復。",
    modal_sec1_p2: "問題根源在於：客戶端傳入 <code>?status=0</code> 時，底層收到的為純字串 <code>'0'</code>。舊版 <code>ParseEnumPipe.isEnum()</code> 直接以嚴格比對 <code>[0, 1].includes('0')</code> 檢查，導致比對結果為 <code>false</code>，並拋出 <code>400 Bad Request: \"Validation failed (enum string is expected)\"</code>。",

    modal_sec2_title: "2. 社群 Issue 與 PR #17668",
    modal_sec2_p1: "該 Issue 原本有另一位開發者提交了 PR #17639。然而該作者的本機環境不幸遭自動化惡意蠕蟲感染，其 PR 被強推了夾帶惡意程式的 <code>.woff2</code> 與自動觸發工作流。",
    modal_sec2_p2: "NestJS 維護者 <code>@micalevisk</code> 及時察覺異常並關閉了該 PR，官方隨後也建立了防護惡意 PR 的安全工作流。",
    modal_sec2_p3: "在 #17639 關閉後，我提交的 <strong>PR #17668</strong> 提供了乾淨、獨立且包含完整測試的實作，讓官方團隊與社群得以聚焦並順利完成修復。",

    modal_sec3_title: "3. 架構決策與型別嚴謹度",
    modal_sec3_p1: "<strong>寬鬆轉換的隱患：</strong> 早期思路曾考慮使用 <code>isNumeric</code> 正則搭配 <code>Number(value)</code> 轉型。但這會導致 <code>'00'</code>、<code>'01'</code>、<code>'1.0'</code> 或 <code>'-0'</code> 等模糊字串被錯誤轉換通過，破壞列舉的精確性。",
    modal_sec3_p2: "<strong>設計準則：</strong> 列舉驗證必須保持嚴格性，僅能接受與合法 enum 成員字面完全相等的字串（例如 <code>'0'</code> 對應 <code>0</code>，但不接受 <code>'00'</code> 或 <code>'1.0'</code>）。",
    modal_sec3_p3: "<strong>最終實作架構：</strong> 採用 <code>toEnumValue</code> 精確比對（<code>String(enumValue) === value</code>），不僅排除了邊界模糊數值，還避免正則判斷與額外遍歷，確保零額外開銷與型別安全。",

    modal_sec4_title: "4. 邊界測試與單元驗證",
    modal_sec4_p1: "撰寫完整的 Jest 單元測試，涵蓋各類邊界情境：",
    modal_sec4_li1: "邊界防禦斷言：確保 <code>'01'</code>、<code>'1.0'</code> 與 <code>'-0'</code> 等模糊輸入均正確拋出 <code>BadRequestException</code>。",
    modal_sec4_li2: "列舉類型覆蓋：驗證數值 Enum、字串 Enum、混合型 Enum 與包含浮點數的 Enum 均能正確處理。",
    modal_sec4_li3: "方法擴充性：梳理 protected 方法，為 <code>getEnumValues()</code> 補齊 <code>(string | number)[]</code> 型別定義。",

    modal_sec5_title: "5. 官方效能優化與合併",
    modal_sec5_p1: "PR 提交後，NestJS 創始人 <strong>Kamil Mysliwiec</strong> 親自審查代碼，並在 PR 上追加了記憶化快取優化（<code>perf(common): memoize enum values lookup</code>）以避免每次請求重複計算列舉值，隨後正式將 PR #17668 合併進 master 分支。",

    modal_btn_close: "關閉",
    modal_btn_view_pr: "前往 GitHub PR",

    // Other Projects
    proj_crypto_v2_title: "Crypto-Sniper V2",
    proj_crypto_v2_desc: "升級版自動化加密貨幣追蹤平台。串接 Binance REST API 進行實時行情監控，整合 Redis 快取機制、Docker 容器化部署、NestJS 後端架構，並支援 Discord、Google、Telegram 多平台 OAuth 認證。",
    proj_crypto_v1_title: "Crypto-Sniper",
    proj_crypto_v1_desc: "協助投資者透過自訂移動平均線（MA）指標篩選潛力標的的自動化分析工具。",
    proj_taipei_title: "Taipei-day-trip",
    proj_taipei_desc: "提供台北熱門景點導覽檢索、線上預約與行程訂購的全端電商網站。",
    proj_linebot_title: "診所 LINE 預約管理系統",
    proj_linebot_desc: "為醫療診所量身打造之 LINE Bot 預約系統，整合病患線上預約、醫師班表調配、黑名單防護、每日自動提醒推播與集中化管理後台。",
    proj_room_title: "國立臺灣大學 討論室預約系統",
    proj_room_desc: "為臺大規劃開發之空間預約系統，支援預約管理、時段規則限制、管理員控制台與自動化 Email 通知確認流程。",
    proj_game_title: "社畜請上車 互動行銷活動頁",
    proj_game_desc: "獨立開發之前後端分離互動遊戲活動頁。結合動態前端遊玩體驗與穩定高併發後端架構，支援即時成績結算、社群分享機制與雲端高可用部署。",

    // Skills Page Categories
    skill_cat_backend: "後端技術 (Backend Skills)",
    skill_cat_devops: "DevOps 與雲端架構 (DevOps Skills)",
    skill_cat_frontend: "前端技術 (Frontend Skills)",
    skill_sub_lang_runtime: "程式語言與執行環境",
    skill_sub_frameworks: "後端框架",
    skill_sub_databases: "資料庫系統",
    skill_sub_orm_testing: "ORM 與單元測試",
    skill_sub_cloud: "雲端供應商與服務",
    skill_sub_container: "容器化與伺服器",
    skill_sub_cicd: "CI/CD 與版本控制",
    skill_sub_security_dns: "資安防護與 DNS",
    skill_sub_os: "作業系統",
    skill_sub_fe_lang: "前端語言",
    skill_sub_fe_frameworks: "前端框架與函式庫",
    skill_sub_css_ui: "CSS 與 UI 元件庫",

    // Switcher label
    lang_label: "English"
  }
};

class I18nManager {
  constructor() {
    this.storageKey = "ming_resume_lang";
    // Default to stored lang, or browser preference, or 'en'
    this.currentLang = this.getInitialLanguage();
  }

  getInitialLanguage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved && (saved === "en" || saved === "zh")) {
      return saved;
    }
    // Default is English
    return "en";
  }

  setLanguage(lang) {
    if (lang !== "en" && lang !== "zh") return;
    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    document.documentElement.lang = lang === "zh" ? "zh-TW" : "en";
    this.render();
  }

  toggleLanguage() {
    const nextLang = this.currentLang === "en" ? "zh" : "en";
    this.setLanguage(nextLang);
  }

  translate(key) {
    const langObj = translations[this.currentLang] || translations.en;
    return langObj[key] || translations.en[key] || key;
  }

  render() {
    // Update plain text elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = this.translate(key);
      if (text) {
        el.textContent = text;
      }
    });

    // Update HTML elements (supporting links, code tags, bold text)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const html = this.translate(key);
      if (html) {
        el.innerHTML = html;
      }
    });

    // Update Language Toggle Button text / badge if present
    document.querySelectorAll(".lang-toggle-btn").forEach((btn) => {
      const labelSpan = btn.querySelector(".lang-toggle-label");
      if (labelSpan) {
        labelSpan.textContent = this.currentLang === "en" ? "繁體中文" : "English";
      }
    });
  }

  init() {
    document.documentElement.lang = this.currentLang === "zh" ? "zh-TW" : "en";
    this.render();

    // Bind lang toggle buttons
    document.querySelectorAll(".lang-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleLanguage();
      });
    });
  }
}

// Global instance
window.i18n = new I18nManager();

document.addEventListener("DOMContentLoaded", () => {
  window.i18n.init();
});
