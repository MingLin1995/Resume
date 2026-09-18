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

    // --- Combined Microservices Observability Series (PR #17781 & #17797) ---
    oss_nest_microservices_title: "NestJS Core (@nestjs/microservices)",
    oss_nest_microservices_badge_merged: "Merged",
    oss_nest_microservices_pr_link_title: "PR #17781 & #17797: Resolving Observability Span Leaks in Microservices",
    oss_nest_microservices_summary_1: "<strong>Failures produced no telemetry (PR #17781):</strong> When a message handler threw, NestJS skipped the hook that closes the tracing span &mdash; so the failures engineers most need to see left no trace at all, and each one stayed in memory for good. Fixed on the base <code>Server</code> class with a guard that closes the span exactly once, whichever path settles first.",
    oss_nest_microservices_summary_2: "<strong>Adopted as the framework standard:</strong> NestJS's author reused that guard in the follow-up PR #17794 across five transports (MQTT, NATS, Redis, TCP, RMQ), citing #17781 as the precedent. It is today the only place in <code>@nestjs/microservices</code> where the end hook is called.",
    oss_nest_microservices_summary_3: "<strong>Kafka: leaks that grew under load (PR #17797):</strong> Three defects on Kafka's request-response path &mdash; the worst leaked one span per retry, so the longer a downstream service stayed down, the faster memory grew. Three of the six tests added fail against the pre-fix code.",
    btn_deep_dive_microservices: "How I found it and what I changed",

    // Deep Dive Modal - Unified Microservices Series
    modal_microservices_title: "Observability Lifecycle in NestJS Microservices",
    modal_microservices_subtitle: "Resolving Telemetry Span Leaks in Failure Paths & Distributed Retries (PR #17781 & #17797)",
    modal_microservices_fact: "2 merged PRs · #17781, #17797 · nestjs/nest · September 2026 · Part of a 6-PR remediation chain",
    modal_microservices_badge_pr1: "PR #17781",
    modal_microservices_badge_pr2: "PR #17797",
    modal_microservices_badge_merged: "Merged by Kamil Mysliwiec",

    modal_microservices_sec1_title: "1. A Defect That Would Never Be Reported",
    modal_microservices_sec1_p1: "<code>setOnProcessingStartHook</code> and <code>setOnProcessingEndHook</code> are extension points exposed by NestJS for observability integrations, with zero consumers inside the repository or its dependencies—standard NestJS applications never invoke them. There are no stack traces, no failing requests, and no users opening issues.",
    modal_microservices_sec1_p2: "Defects of this kind can only be uncovered proactively. The catalyst was PR #17766: <code>ServerKafka#handleEvent</code> only closed its span upon successful completion, and that fix introduced RxJS <code>finalize()</code> to encompass both complete and error terminations. The fix was correct on its own terms, but prompted a crucial question: did the same class of defect still exist in the base class from which Kafka inherits?",

    modal_microservices_sec2_title: "2. Observability Blind Spots on Failing Paths",
    modal_microservices_sec2_p1: "In distributed microservice architectures, observability tools (such as OpenTelemetry, Datadog, and Sentry) rely on spans to profile latency and capture error diagnostics. The start hook establishes the async trace context so every log line and query inside the handler attributes to one span; the end hook closes and exports it upon completion.",
    modal_microservices_sec2_p2: "In the base <code>Server#handleEvent</code> pipeline, execution awaited the handler before evaluating completion branches (RxJS Observables vs. plain values). Both branches were implemented correctly, but when a handler rejected, the <code>await</code> expression threw immediately before either branch was evaluated. Teardown logic was bypassed entirely, leaving <code>onProcessingEndHook</code> uncalled.",
    modal_microservices_sec2_p3: "The consequence: during system outages—the exact moments engineers rely on traces most—failing events failed to produce telemetry. In high-throughput services processing malformed payloads, unclosed spans persisted in memory indefinitely, creating memory bloat while leaving monitoring systems blind to failures.",

    modal_microservices_sec3_title: "3. Idempotent Teardown Architecture on the Base Class",
    modal_microservices_sec3_p1: "A naive fix might wrap the handler invocation in <code>try/catch</code>, execute the end hook upon catching the error, and rethrow. However, in transports that await stream resolution to acknowledge message settlement (such as Kafka offset commits), an erroring stream triggers both RxJS <code>finalize</code> and the outer catch block. Without protection, a single event triggers the end hook twice, corrupting trace state.",
    modal_microservices_sec3_p2: "To fundamentally resolve this across transports, the solution was elevated to the base class as <code>Server#createProcessingEndHookRunner</code>, encapsulating both idempotency protection and the event's context in a closure:",
    modal_microservices_sec3_p3: "This established a strict invariant: <em>\"the span closes safely exactly once, via whichever asynchronous path settles first\"</em>. Following PR #17781, NestJS creator Kamil Mysliwiec adopted this exact pattern in #17794 across MQTT, NATS, Redis, TCP, and RMQ, establishing a unified teardown standard across transports.",

    modal_microservices_sec4_title: "4. Kafka Retry Boundaries & Stream Convergence",
    modal_microservices_sec4_p1: "The generalization covered five transports but left Kafka untouched. Reading the implementation with the same critical eye revealed three remaining unhandled edge cases:",
    modal_microservices_sec4_li1: "<strong>Multi-value stream emissions:</strong> <code>onProcessingEndHook</code> originally lived inside <code>sendMessage</code>, executing per emitted packet; when a stream emitted multiple replies, the same span was closed multiple times.",
    modal_microservices_sec4_li2: "<strong>Compounding leaks from retriable errors:</strong> When a handler threw <code>KafkaRetriableException</code>, <code>combineStreamsAndThrowIfRetriable</code> rejected, halting execution before message dispatch and leaving the span unsettled. Because <code>kafkajs</code> automatically redelivers retriable messages, every retry leaked another unsettled span, creating compounding memory bloat in production.",
    modal_microservices_sec4_li3: "<strong>Unpaired calls on unhandled paths:</strong> The <code>NO_MESSAGE_HANDLER</code> path published a response without ever invoking a start hook, causing an unpaired end hook execution (the same unpaired invocation #17794 removed from MQTT, NATS, and Redis).",
    modal_microservices_sec4_p2: "In <strong>PR #17797</strong>, the hook was decoupled into the response stream's <code>finalize</code> operator, governed by the idempotent runner, while an outer <code>try/catch</code> settled the span before rethrowing <code>KafkaRetriableException</code>. This preserved Kafka's native retry behavior while guaranteeing that spans close <strong>Exactly-Once</strong>. During code review, maintainers contributed an adjacent edge case: observables completing without emitting values failed to resolve internal promises, similarly causing unsettled trace states.",

    modal_microservices_sec5_title: "5. The Single Call Site",
    modal_microservices_sec5_p1: "Within hours, this line of remediation advanced two further PRs. #17779 tackled the gRPC request-stream path, discovering along the way that <code>grpc-js</code> never actually emits an <code>error</code> event—cancellations are signaled via <code>cancelled</code> and <code>close</code>, meaning existing cancellation teardown had never executed in production. #17799 then consolidated the ad-hoc exception scaffolding across all transports into <code>Server#runWithProcessingHooks</code>, routing every transport through it uniformly.",
    modal_microservices_sec5_p2: "Following that refactor, throughout the entire <code>@nestjs/microservices</code> package, <code>onProcessingEndHook</code> retained only a single call site—housed directly inside the idempotent guard introduced in #17781. The surrounding code was completely rewritten; the guard remained.",
    modal_microservices_sec5_p3: "Three days, six PRs, three contributors. The true value of this work was not the dozen lines of code altered in any single PR, but that the architectural shape chosen early on became the single point of convergence during the package-wide overhaul—and that each thoroughly examined fix revealed the next.",

    // --- PR #17668: Common Validation ---
    oss_nest_title: "NestJS Core (@nestjs/common)",
    oss_nest_badge_merged: "Merged",
    oss_nest_pr_link_title: "PR #17668: Support numeric string values in ParseEnumPipe",
    oss_nest_summary_1: "<strong>A pipe that rejected every valid value:</strong> <code>ParseEnumPipe</code> returned <code>400</code> for every member of a numeric enum: HTTP params arrive as strings, so the check compared <code>'0'</code> against <code>0</code> and never matched. Traced through the framework internals to community Issue #17638.",
    oss_nest_summary_2: "<strong>Fixed strictly, on purpose:</strong> The obvious fix &mdash; <code>Number(value)</code> &mdash; would also have accepted <code>''</code>, <code>'01'</code> and <code>'1.0'</code>; an empty query string would have silently become a valid enum member. Matching on the exact value instead accepts only <code>'0'</code> for <code>0</code>. The pipe now also returns the enum member itself, not the original string.",
    oss_nest_summary_3: "<strong>Official Review & Merge:</strong> Authored comprehensive Vitest test suites covering strict type boundaries; officially reviewed, optimized with memoization, and merged by creator Kamil Mysliwiec.",
    btn_deep_dive: "How I found it and what I changed",

    // Deep Dive Modal - PR #17668
    modal_title: "Numeric String Coercion in ParseEnumPipe",
    modal_subtitle: "Pull Request #17668 · Strict Type-Safe Coercion for HTTP Route Parameters",
    modal_badge_pr: "PR #17668",
    modal_badge_issue: "Issue #17638",
    modal_badge_merged: "Merged by Kamil Mysliwiec",

    modal_sec1_title: "1. Type Coercion Blind Spots in Route Parameters",
    modal_sec1_p1: "In modern web APIs built with NestJS, route parameters received via <code>@Query()</code> or <code>@Param()</code> arrive over HTTP as raw strings (e.g. <code>?status=0</code> arrives as <code>'0'</code>). However, TypeScript developers commonly define status codes and flags as numeric enums.",
    modal_sec1_p2: "In previous versions, <code>ParseEnumPipe.isEnum()</code> verified values using a strict array check (<code>[0, 1].includes('0')</code>). Because JavaScript strict equality (<code>===</code>) distinguishes strings from numbers, this comparison evaluated to <code>false</code>, unexpectedly throwing <code>400 Bad Request: \"Validation failed (enum string is expected)\"</code>.",
    modal_sec1_p3: "While developers previously resorted to repetitive manual parsing inside individual controllers, HTTP query parameters naturally arrive as strings. Implementing native, type-safe coercion inside the framework's core <code>ParseEnumPipe</code> provided a far more robust, ecosystem-wide solution.",

    modal_sec2_title: "2. Strict Type Safety & Coercion Architecture",
    modal_sec2_p1: "The design required careful consideration: a loose approach using regular expressions combined with <code>Number(value)</code> would unintentionally coerce ambiguous inputs—such as <code>'00'</code>, <code>'01'</code>, <code>'1.0'</code>, or <code>'-0'</code>—violating strict TypeScript enum semantics.",
    modal_sec2_p2: "To ensure rigorous type safety and backward compatibility, <code>toEnumValue</code> evaluates two distinct conditions: preserving strict identity comparison for standard inputs, and enabling string literal matching exclusively when an enum member is a number and input is a string:",
    modal_sec2_p3: "This guaranteed zero regular expression overhead and rejected malformed inputs upfront, preserving strict enum typing while cleanly coercing valid numeric string representations into their canonical enum values.",
    modal_sec2_p4: "Validation was only half of the defect. <code>transform</code> still returned the raw input, so a parameter annotated <code>Status</code> would hold the string <code>'0'</code> at runtime and <code>switch (status) { case Status.Active: }</code> would silently never match &mdash; a failure with no error to trace. It now returns the matched enum member, keeping the runtime value aligned with the declared type, while string enums such as <code>Digit.Zero = '0'</code> keep their string values through the identity branch.",

    modal_sec3_title: "3. Testing Matrix & Official Memoization",
    modal_sec3_p1: "A comprehensive Vitest test suite was authored to validate the implementation across enum variations and edge cases:",
    modal_sec3_li1: "<strong>Strict edge case rejections:</strong> Explicitly asserted that ambiguous numeric inputs like <code>'01'</code>, <code>'1.0'</code>, and <code>'-0'</code> throw <code>BadRequestException</code>.",
    modal_sec3_li2: "<strong>Comprehensive enum coverage:</strong> Validated string enums, numeric enums, mixed enums, negative values, and float-valued enums.",
    modal_sec3_li3: "<strong>Type preservation:</strong> Asserted that a string enum whose values are digit characters (<code>Digit.Zero = '0'</code>) keeps its string type and is never coerced to a number.",
    modal_sec3_p2: "NestJS creator <strong>Kamil Mysliwiec</strong> reviewed the PR and contributed a follow-up commit (<code>perf(common): memoize enum values lookup</code>) to cache enum lookups across HTTP requests, subsequently merging PR #17668 into the master branch.",

    modal_btn_close: "Close",

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

    // --- Combined Microservices Observability Series (PR #17781 & #17797) ---
    oss_nest_microservices_title: "NestJS 官方核心庫 (@nestjs/microservices)",
    oss_nest_microservices_badge_merged: "已合併 (Merged)",
    oss_nest_microservices_pr_link_title: "PR #17781 & #17797: 修復微服務事件管線與 Kafka 中的 Span 洩漏問題",
    oss_nest_microservices_summary_1: "<strong>失敗的請求留不下任何追蹤紀錄（PR #17781）：</strong> 事件處理器拋出例外時，NestJS 會跳過關閉追蹤 Span 的 hook——工程師最需要觀察的失敗案例反而完全沒有追蹤資料，而且每一筆都永久滯留在記憶體中。於基底 <code>Server</code> 類別加入防護，確保 Span 只會被關閉一次，無論哪條非同步路徑先結束。",
    oss_nest_microservices_summary_2: "<strong>獲官方採納為框架標準：</strong> NestJS 作者於後續 PR #17794 沿用此防護機制，套用至 MQTT、NATS、Redis、TCP、RMQ 五種傳輸層，並以 #17781 為實作先例。現今整個 <code>@nestjs/microservices</code> 套件中，end hook 僅存此一處呼叫點。",
    oss_nest_microservices_summary_3: "<strong>Kafka：越出事漏得越快（PR #17797）：</strong> 修復 Kafka 請求回應路徑上的三項缺陷，其中最嚴重的一項會在每次重試時多漏一個 Span——下游服務掛得越久，記憶體成長得越快。新增的六項測試中，有三項在修復前的程式碼上為失敗狀態。",
    btn_deep_dive_microservices: "如何發現，以及我改了什麼",

    // Deep Dive Modal - Unified Microservices Series
    modal_microservices_title: "NestJS 微服務 Observability 生命週期治理",
    modal_microservices_subtitle: "修復異常路徑與分散式重試中的追蹤 Span 洩漏問題（PR #17781 & #17797）",
    modal_microservices_fact: "2 merged PRs · #17781, #17797 · nestjs/nest · 2026 年 9 月 · 六個 PR 修正線的一環",
    modal_microservices_badge_pr1: "PR #17781",
    modal_microservices_badge_pr2: "PR #17797",
    modal_microservices_badge_merged: "由創辦人 Kamil Mysliwiec 合併",

    modal_microservices_sec1_title: "1. 一個不會被回報的缺陷",
    modal_microservices_sec1_p1: "<code>setOnProcessingStartHook</code> 與 <code>setOnProcessingEndHook</code> 是 NestJS 開放給監控整合的擴充點，在整個 repository 與其相依套件中沒有任何消費者——一般的 NestJS 應用完全不會觸發它。沒有 stack trace，沒有失敗請求，不會有使用者開 issue。",
    modal_microservices_sec1_p2: "這類缺陷只能主動去找。起點是 PR #17766：<code>ServerKafka#handleEvent</code> 僅在串流正常完成時閉合 Span，該修正改以 RxJS <code>finalize()</code> 涵蓋完成與失敗兩種終止。修正本身正確，但留下一個值得追問的問題——同一類錯誤，在 Kafka 所繼承的基底類別裡是否依然存在？",

    modal_microservices_sec2_title: "2. 異常路徑上的可觀測性盲點",
    modal_microservices_sec2_p1: "在分散式微服務架構中，監控工具（如 OpenTelemetry、Datadog、Sentry）仰賴 Span 來分析請求延遲與捕捉異常診斷。start hook 負責初始化非同步追蹤上下文，使處理器內部的每一筆日誌與查詢都歸屬於同一條 Span；end hook 則在處理結束時閉合並輸出該 Span。",
    modal_microservices_sec2_p2: "在基底 <code>Server#handleEvent</code> 的管線中，流程會先 <code>await</code> 處理器的執行結果，再依回傳值型態（RxJS Observable 或純值）分流至對應的結束邏輯。兩條分支的實作都正確，但當處理器本身 reject 時，<code>await</code> 會在任一分支被求值之前即中斷拋出，導致結束邏輯全數被跳過，<code>onProcessingEndHook</code> 未被觸發。",
    modal_microservices_sec2_p3: "其結果是：在系統發生故障時，最需要排查定位的失敗事件，反而未能產出完整的 Trace 紀錄。在持續接收異常資料的高吞吐服務中，未閉合的 Span 更會滯留於記憶體中，既造成資源負擔，也使監控系統失去即時追蹤能力。",

    modal_microservices_sec3_title: "3. 基底類別的冪等防護設計",
    modal_microservices_sec3_p1: "直覺的修復方式是在處理器外圍加上 <code>try/catch</code>，捕捉異常後執行 end hook 再重新拋出。然而在特定傳輸協定中（例如 Kafka 需等待串流以確認 Offset Commit），失敗的串流會同時觸發 RxJS 的 <code>finalize</code> 與外層的 catch 區塊；若缺乏防護，同一個事件將重複觸發 end hook，造成追蹤狀態錯亂。",
    modal_microservices_sec3_p2: "為了從根本解決此問題，解法提升至基底類別，設計 <code>Server#createProcessingEndHookRunner</code>，透過閉包同時封裝冪等防護與該次事件的上下文：",
    modal_microservices_sec3_p3: "這項設計確立了明確的不變性：「無論哪條非同步路徑先抵達，Span 均確保單次安全閉合」。PR #17781 合併後，專案作者隨即於 #17794 沿用此模式，推廣至 MQTT、NATS、Redis、TCP 與 RMQ 等傳輸層，建立統一的異常終結標準。",

    modal_microservices_sec4_title: "4. Kafka 重試邊界與串流收斂",
    modal_microservices_sec4_p1: "上述泛化涵蓋五個傳輸層，但未觸及 Kafka。以同一種方式閱讀該修正，可辨識出三個仍未被處理的邊界情境：",
    modal_microservices_sec4_li1: "<strong>多值串流重複觸發：</strong> <code>onProcessingEndHook</code> 原先置於 <code>sendMessage</code> 內部，每發送一則訊息便執行一次；串流發出多筆回覆時，同一個 Span 便會被重複關閉多次。",
    modal_microservices_sec4_li2: "<strong>可重試異常導致的累積殘留：</strong> 處理器拋出 <code>KafkaRetriableException</code> 時，<code>combineStreamsAndThrowIfRetriable</code> 選擇 reject，流程在進入發送階段前即中斷，Span 未能結算。而 <code>kafkajs</code> 隨後會重新投遞該訊息——每一次重試都再殘留一個未結算的 Span，於線上環境形成持續累積的記憶體負擔。",
    modal_microservices_sec4_li3: "<strong>無處理器路徑的未配對呼叫：</strong> <code>NO_MESSAGE_HANDLER</code> 分支在未執行 start hook 的情況下直接發送回應，使該次 end hook 形成無配對的呼叫（如同 #17794 自 MQTT、NATS 與 Redis 移除的未配對呼叫）。",
    modal_microservices_sec4_p2: "於 <strong>PR #17797</strong> 中，將 Hook 抽離至回應串流的 <code>finalize</code> 管道，統一交由前述的冪等 runner 控管，並在外層提前捕捉 <code>KafkaRetriableException</code> 完成 Span 結算後再重新拋出。在維持 Kafka 原生重試特性的前提下，達成 Span「<strong>精確只關閉一次（Exactly-Once）</strong>」的嚴謹保證。Review 階段另由維護者補上一項相鄰情境：空串流在未發出任何資料即完成時未正確 resolve promise，同樣會使追蹤狀態懸置。",

    modal_microservices_sec5_title: "5. 一個呼叫點",
    modal_microservices_sec5_p1: "其後數小時內，這條修正線又推進兩個 PR。#17779 處理 gRPC 的 request-stream 路徑，過程中發現 <code>grpc-js</code> 實際上從不發出 <code>error</code> 事件——取消是以 <code>cancelled</code> 與 <code>close</code> 通報，因此原有的取消處理在正式環境從未執行。#17799 則將各傳輸層手寫的整套例外外殼全數收斂至 <code>Server#runWithProcessingHooks</code>，並令所有傳輸層一律經由它處理。",
    modal_microservices_sec5_p2: "在那場重構之後，整個 microservices 套件中，<code>onProcessingEndHook</code> 只剩下唯一一個呼叫點——位於 #17781 所引入的冪等防護內部。周圍的實作被全部替換，這道保護被保留了下來。",
    modal_microservices_sec5_p3: "三天、六個 PR、三位貢獻者。這次工作的價值不在任一 PR 中改變行為的十餘行程式碼，而在於早期所選的抽象形狀成為整個套件重構時的單一收斂點；也在於每一次仔細讀完一個修正，都會浮現出下一個。",

    // --- PR #17668: Common Validation ---
    oss_nest_title: "NestJS 官方核心庫 (@nestjs/common)",
    oss_nest_badge_merged: "已合併 (Merged)",
    oss_nest_pr_link_title: "PR #17668: 支援 ParseEnumPipe 數值字串型態轉換",
    oss_nest_summary_1: "<strong>一個把所有合法值都擋掉的 Pipe：</strong> <code>ParseEnumPipe</code> 會對數值列舉的每一個成員回傳 <code>400</code>：HTTP 參數抵達時皆為字串，因此比對的是 <code>'0'</code> 與 <code>0</code>，永遠不會相等。追溯框架底層機制後定位至官方 Issue #17638。",
    oss_nest_summary_2: "<strong>刻意選擇嚴格的修法：</strong> 最直覺的修法 <code>Number(value)</code> 會連 <code>''</code>、<code>'01'</code>、<code>'1.0'</code> 一併放行——空白的查詢參數會悄悄變成一個合法的列舉值。改以精確值比對，<code>0</code> 就只接受 <code>'0'</code>。同時讓 Pipe 回傳列舉成員本身，而非原始字串。",
    oss_nest_summary_3: "<strong>官方 Review 與合併：</strong> 完整補齊 Vitest 單元測試與型別邊界防禦，由 NestJS 創始人 Kamil Mysliwiec 親自 Review、追加記憶化優化並順利合併進 master 分支。",
    btn_deep_dive: "如何發現，以及我改了什麼",

    // Deep Dive Modal - PR #17668
    modal_title: "ParseEnumPipe 數值字串型態轉換機制",
    modal_subtitle: "Pull Request #17668 · HTTP 路由參數之嚴格型別安全轉換",
    modal_badge_pr: "PR #17668",
    modal_badge_issue: "Issue #17638",
    modal_badge_merged: "由創辦人 Kamil Mysliwiec 合併",

    modal_sec1_title: "1. 路由參數型別校驗的設計盲點",
    modal_sec1_p1: "在基於 NestJS 構建的 REST API 中，透過 <code>@Query()</code> 或 <code>@Param()</code> 傳入的 HTTP 請求參數本質上均為純字串（例如 <code>?status=0</code> 進入後端為 <code>'0'</code>）。而在 TypeScript 開發中，狀態代碼或開關常被定義為數值型列舉（例如 <code>enum Status { Active = 0, Inactive = 1 }</code>）。",
    modal_sec1_p2: "在舊版實作中，<code>ParseEnumPipe.isEnum()</code> 採用陣列嚴格比對（<code>[0, 1].includes('0')</code>）。由於 JavaScript 嚴格等於（<code>===</code>）區分字串與數值，比對結果為 <code>false</code>，導致框架非預期地直接拋出 <code>400 Bad Request: \"Validation failed (enum string is expected)\"</code>。",
    modal_sec1_p3: "雖然業務層可以在各個 Controller 手動轉換繞過，但 HTTP 參數以字串傳遞屬於 Web 標準常態；由框架底層的 <code>ParseEnumPipe</code> 原生支援數值轉換，才能徹底為整體生態系提供一致且高相容性的開發體驗。",

    modal_sec2_title: "2. 型別嚴謹度與精確轉型架構",
    modal_sec2_p1: "這項修正的架構關鍵在於型別嚴謹度：若採用寬鬆的正則表達式搭配 <code>Number(value)</code> 轉型，會導致 <code>'00'</code>、<code>'01'</code>、<code>'1.0'</code> 或 <code>'-0'</code> 等模糊字串被錯誤視為合法成員，破壞 TypeScript 列舉的精確語意。",
    modal_sec2_p2: "為了確保型別邊界與向下相容性，於 <code>toEnumValue</code> 設計兩層比對：保留原有的嚴格恆等比對，僅在「列舉值為 number 且輸入為 string」時啟用字面值轉型：",
    modal_sec2_p3: "這種設計既避免了正則比對的額外開銷，又能嚴格拒絕不合規的邊界值，在確保零副作用的前提下，將合法的數值字串無縫轉型為對應的列舉型別。",
    modal_sec2_p4: "驗證僅是缺陷的一半。<code>transform</code> 當時仍原樣回傳輸入值，因此標註為 <code>Status</code> 的參數在執行期實際持有的是字串 <code>'0'</code>，<code>switch (status) { case Status.Active: }</code> 會靜默地永不成立——一種沒有任何錯誤訊息可追的失效。修正後改為回傳比對到的列舉成員，使執行期值與宣告型別一致；而 <code>Digit.Zero = '0'</code> 這類字串列舉則透過恆等比對分支保留其字串型別。",

    modal_sec3_title: "3. 邊界測試矩陣與官方快取最佳化",
    modal_sec3_p1: "實作附帶了完整的 Vitest 單元測試矩陣，全面覆蓋各類列舉場景與防禦邊界：",
    modal_sec3_li1: "<strong>邊界防禦斷言：</strong> 嚴格斷言 <code>'01'</code>、<code>'1.0'</code> 與 <code>'-0'</code> 等模糊輸入均正確被拒絕並拋出 <code>BadRequestException</code>。",
    modal_sec3_li2: "<strong>完整列舉類型覆蓋：</strong> 涵蓋數值列舉、字串列舉、混合型列舉、負數值與包含浮點數的列舉。",
    modal_sec3_li3: "<strong>型別保全：</strong> 斷言值為數字字元的字串列舉（<code>Digit.Zero = '0'</code>）維持字串型別，不會被轉型為數值。",
    modal_sec3_p2: "PR 提交後，NestJS 創辦人 <strong>Kamil Mysliwiec</strong> 親自審查程式碼，追加了記憶化快取最佳化（<code>perf(common): memoize enum values lookup</code>）以避免每次請求重複計算列舉值，隨後順利將 PR #17668 合併至 master 分支。",

    modal_btn_close: "關閉",

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
