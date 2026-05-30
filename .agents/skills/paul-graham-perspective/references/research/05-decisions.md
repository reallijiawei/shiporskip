# Paul Graham's Key Decisions and Their Outcomes

## 1. Founding Viaweb (1995)

**Context:** In 1995, the web was nascent. Paul Graham had a PhD in CS from Harvard (1990) and had studied painting at RISD and Florence. He and Robert Morris (also a CS PhD) decided to build one of the first web-based applications — a platform for creating online stores.

**Decision:** Rather than pursue academia or join a large company, Graham chose entrepreneurship. The critical technical decision was writing Viaweb almost entirely in Common Lisp, an unconventional choice when competitors used C++, Perl, and Java.

**Rationale:** Graham's reasoning was that Lisp was the most powerful language available, and since the software ran on their own servers, they could use any language they wanted. The Lisp advantage was real: competitors would announce new features, and "we could sometimes duplicate a new feature within a day or two." The WYSIWYG store builder was years ahead of competitors offering basic CGI scripts.

**Outcome:** Yahoo acquired Viaweb in 1998 for approximately $49.6 million (455,000 Yahoo shares). It became Yahoo! Store. The sale gave Graham financial independence and credibility to pursue future ventures. Ali Partovi strongly recommended the deal to Jerry Yang.

**Lessons Learned:**
- Choosing a powerful but obscure language was a competitive moat — competitors couldn't easily match their development speed
- Graham kept the Lisp choice secret, noting "a startup should give its competitors as little information as possible"
- He checked competitors' job listings for language clues — the more "IT flavor" a listing had, the less threatening the company
- Building on their own servers freed them from platform constraints
- The experience taught him that "when you're small, you can use any language you want" — a principle he later evangelized

**The Blub Paradox:** From this experience, Graham formulated the "Blub Paradox" — programmers can recognize languages less powerful than their preferred one as deficient, but view more powerful languages as merely "weird." This asymmetry means most programmers are satisfied with whatever they use because it "dictates the way they think about programs."

**Impact on Later Thinking:** The Viaweb experience directly shaped Graham's approach to Y Combinator. He learned that:
- The best technology choices are invisible to competitors until it's too late
- Small teams with better tools can outperform large teams with mediocre ones
- Building on your own infrastructure gives you freedom that platform-dependent companies lack
- The "run upstairs" principle — deliberately choosing harder paths — creates lasting competitive advantages

---

## 2. Writing "Hackers & Painters" and Other Books

**Context:** After selling Viaweb to Yahoo, Graham began writing essays on paulgraham.com starting in 2001. He had a PhD in CS but also studied painting, giving him a unique cross-disciplinary perspective.

**Decision:** Rather than return to programming or academia, Graham chose to write. He published essays that bridged programming, art, business, and philosophy. His book "Hackers & Painters" (2004) collected and expanded on his essays.

**Rationale:** Graham discovered that writing was not merely explaining pre-formed ideas — it was how ideas came into being. "Most of what ends up in my essays I only thought of when I sat down to write them. That's why I write them." He saw the web as ushering in "the golden age of the essay," where anyone could publish and be judged by content rather than credentials.

**Outcome:** Graham became one of the most influential essayists in the tech world. His essays shaped startup culture, programming philosophy, and entrepreneurship discourse. The essays built his reputation as a "hacker philosopher" (Steven Levy's description) and laid the groundwork for his later influence through Y Combinator.

**Process:** Graham's writing method follows a river-like algorithm: "At each step, flow down. For the essayist this translates to: flow interesting." He shares drafts with friends, wanting to know what bores them and what seems unconvincing. He backtracks when hitting dead ends, sometimes going back seven paragraphs and redirecting.

**Key Insight:** "Don't write the essay readers expect; one learns nothing from what one expects." The essay's value lies in surprise — discovering things that "contradict things you thought you know."

**Other Books:**
- **"On Lisp" (1993):** Graham's technical book on Lisp macros, published before Viaweb. This established his reputation as a Lisp expert.
- **"ANSI Common Lisp" (1995):** A textbook on Common Lisp that became a standard reference.
- **"Hackers & Painters" (2004):** His most famous book, collecting essays on programming, startups, and technology. The title reflects his belief that hackers and painters share a creative spirit — both are makers who build things.

**Why Writing Mattered for YC:** Graham's essays were not just personal expression — they were a strategic asset for Y Combinator. The essays attracted founders who shared his values, filtered out those who didn't, and established YC's intellectual brand before the organization had any formal marketing.

---

## 3. Founding Y Combinator (2005)

**Context:** In the early 2000s, the VC model was broken for very early-stage startups. Angel investors were fragmented. The process of funding a startup was inefficient, opaque, and tilted toward insiders. Graham had experienced this firsthand with Viaweb and had been writing about startups for years.

**Decision:** In March 2005, Graham co-founded Y Combinator with Jessica Livingston, Robert Morris, and Trevor Blackwell. The idea emerged from a Harvard Computer Society talk where they tested the concept of funding startups in small batches.

**Original Model:** YC offered modest funding (~$15,000–$20,000 initially) in exchange for small equity (~6%) to startups accepted into short 3-month programs. The first batches ran concurrently in Cambridge, Massachusetts, and Mountain View, California.

**Key Innovation — The Batch Model:** Rather than funding companies one at a time like traditional VCs, YC funded them in batches. This created a cohort effect where founders helped each other, shared knowledge, and built a lasting network. The batch model was a fundamental departure from how venture capital had worked for decades.

**Early Batches (Summer 2005 - S05):** The first batch included Loopt (Sam Altman's company), Reddit, and Kiko. Reddit became one of the most successful early YC companies.

**Outcome:** YC grew into the most influential startup accelerator in history. As of 2026, YC has invested in over 5,668 companies with a combined valuation of $600 billion. Notable portfolio companies include Reddit, Dropbox, Airbnb, Stripe, Twitch, Coinbase, Instacart, DoorDash, GitLab, and many others.

**Operational Decision:** In January 2009, YC closed the Cambridge location due to "operational complexities arising from managing two programs," consolidating in Silicon Valley. This was a practical decision that simplified operations but reflected the reality that Silicon Valley's ecosystem was critical for startups.

**Jessica Livingston's Role:** Though "often overlooked in early accounts," Jessica Livingston played "a pivotal role in shaping Y Combinator's culture and success." She married Graham in 2008 and brought organizational skills and people judgment that complemented Graham's technical and intellectual strengths.

**Funding History:**
- 2009: Sequoia Capital led a $2 million investment, funding roughly 60 companies annually
- 2010: Sequoia supported an $8.25 million round
- 2011: Yuri Milner and SV Angel offered "every Y Combinator company a $150,000 convertible note investment"
- These investments allowed YC to scale its batch size and increase funding per company

---

## 4. YC's Key Decisions: Batch Model, Standard Deal, Demo Day, SAFE Notes

**The Standard Deal:**
YC's standard deal evolved significantly over time:
- **Early days (2005):** ~$15,000–$20,000 for ~6% equity
- **2011:** Yuri Milner and SV Angel offered every YC company a $150,000 convertible note investment
- **2014 (Sam Altman era):** Introduced "$150,000 for a 7% stake"
- **2022 revision:** $500,000 total — "$125,000 on a post-money SAFE in return for 7% equity" plus "$375,000 on an uncapped SAFE with a 'most favored nation' ('MFN') provision"

**Decision to Use Identical Terms:** From the beginning, Graham insisted on using identical terms for every deal. "Y Combinator uses identical terms for every deal" because for tiny seed-stage investments it isn't worth negotiating individually. This eliminated the power imbalance between founders and investors and made the process efficient.

**Decision Not to Require Vesting:** "Y Combinator doesn't require vesting," citing two reasons: the small investment amounts and his belief that "the hope of getting rich is enough motivation to keep founders at work."

**Demo Day:** The program culminates in Demo Day, where "startups present their business and technology prototypes to potential investors." This was a key innovation — it created a structured marketplace for early-stage funding and gave founders a deadline and audience.

**SAFE Notes:** YC developed the SAFE (Simple Agreement for Future Equity) as a simpler alternative to convertible notes. This became an industry standard and fundamentally changed how early-stage funding worked.

**The "Excubator" Label:** Graham distinguished YC from traditional incubators: "Y Combinator exerts less control than incubators" and believed startups should operate from "their own premises, however crappy, than the offices of their investors." He suggested the label "excubator" — enabling people to "escape cubicles."

---

## 5. Investment Decisions and Portfolio

**Early YC Companies:**
- **Reddit (2005, S05 batch):** One of the first YC companies, became one of the most visited websites in the world
- **Loopt (2005, S05 batch):** Sam Altman's company, later led to Altman becoming YC president
- **Dropbox (2007):** Cloud storage company that became a multi-billion dollar business
- **Heroku (2007):** Cloud platform acquired by Salesforce
- **Justin.tv/Twitch (2007):** Live streaming platform acquired by Amazon for $970 million
- **Airbnb (2009):** Accommodation marketplace, one of the most successful startups of its generation
- **Stripe (2009):** Payment processing platform founded by Patrick and John Collison
- **Coinbase (2012):** Cryptocurrency exchange
- **Instacart (2012):** Grocery delivery service
- **DoorDash (2013):** Food delivery platform

**Investment Philosophy:** Graham's investment approach was to fund founders over ideas. "A crowded market is actually a good sign, because it means both that there's demand and that none of the existing solutions are good enough." He looked for founders working on things that "know-it-alls on forums dismissing as toys."

**The "Live in the Future" Principle:** Graham credited Paul Buchheit's observation that people at the leading edge of rapidly changing fields "live in the future." His formula: "Live in the future, then build what's missing."

**Valuation:** As of 2026, YC's portfolio holds a combined valuation of $600 billion across more than 5,668 companies.

**The "Toys" Thesis:** Graham was particularly drawn to ideas that others dismissed as toys. "At YC we're excited when we meet startups working on things that we could imagine know-it-alls on forums dismissing as toys." Early microcomputers, Google's search engine, and Facebook all fit this pattern — they seemed trivial until they weren't.

**Anti-Portfolio Patterns:** Graham learned to avoid certain types of founders:
- Those who talked about "capturing" markets rather than serving users
- Those who focused on fundraising tactics rather than product quality
- Those who couldn't articulate why their solution was different from existing ones
- Those who had been "pre-emptively lowering their expectations" about what was possible

---

## 6. Stepping Back from YC Day-to-Day Operations (2014)

**Context:** By 2014, YC had grown from a scrappy experiment into a major institution. Graham had been the face of YC for nearly a decade, writing influential essays and conducting interviews. The organization needed more structured leadership than a founder-figure could provide.

**Decision:** In February 2014, Graham stepped down from his day-to-day role at Y Combinator, appointing Sam Altman (YC alumnus from the first batch via Loopt) as president.

**Rationale:**
- Graham wanted to return to writing and other intellectual pursuits
- He felt YC had reached a scale where strong organizational leadership was needed
- He trusted Altman to grow YC into a more structured institution
- The organization had matured beyond what a single founder-figure could manage

**Outcome:**
- Sam Altman served as YC president from 2014 to 2019
- Altman expanded YC's scope, introducing the standard deal of "$150,000 for a 7% stake"
- Altman left to focus on OpenAI; Geoff Ralston succeeded him in 2019
- Garry Tan became president and CEO in 2023
- Graham continued in an advisory/emeritus role and focused on writing

**Significance:** This was a model for founder transitions — stepping back gracefully from an institution he built. Graham demonstrated that founders can let go of control when the organization outgrows their leadership style.

---

## 7. Key Essays That Changed Startup Culture

**"Do Things That Don't Scale" (2013):**
- **Core Thesis:** "Startups take off because the founders make them take off." Most startups don't simply launch and succeed — they require deliberate, laborious effort in the early stages.
- **Key Strategies:** Recruit users manually (the "Collison installation" — Stripe founders would grab your laptop and set up the product immediately), delight early users (Wufoo sent hand-written thank-you notes), deliver an "insanely great" experience with an early incomplete product, use the "contained fire" strategy (Facebook started exclusively at Harvard), "pull a Meraki" (assemble products yourself initially), act as a consultant for early users, be the software manually (Stripe's "instant" merchant accounts were actually manually created).
- **Impact:** This essay reframed how founders think about early-stage work. The unscalable work done early isn't merely a temporary necessity — it shapes company culture permanently.

**"Default Alive or Default Dead" (2015):**
- **Core Thesis:** Every startup should ask: if you kept growing at the current rate and kept expenses at the current rate, would you run out of money? If no, you're "default alive." If yes, you're "default dead."
- **Impact:** This created a simple, brutal framework for startup health that forced founders to confront whether their business model actually worked.

**"How to Do What You Love" (2006):**
- **Core Thesis:** Finding work you genuinely love is both essential and extraordinarily difficult. Society, education, prestige, and money conspire to steer people away from discovering what they truly enjoy doing.
- **Key Insight:** Prestige is "fossilized inspiration" — if a task is prestigious, that itself may be reason for suspicion: "If it didn't suck, they wouldn't have had to make it prestigious."
- **The "Always Produce" Heuristic:** His practical advice for finding what you love: "always produce." This forces honest self-assessment and naturally pushes you toward genuine interests.

**"How to Make Wealth" (2004):**
- **Core Thesis:** Startups represent the best path to getting rich because they compress decades of work into a few intense years. A startup is "a way to compress your whole working life into a few years."
- **Key Framework:** Two critical ingredients for getting rich through your own efforts: measurement (your performance can be assessed) and leverage (your decisions have outsized impact). Smallness provides measurement; technology provides leverage.
- **The "Run Upstairs" Principle:** When facing a choice between easier and harder paths, deliberately choose harder ones. This creates barriers to entry for competitors.

**"The Lesson to Unlearn" (2019):**
- **Core Thesis:** The most harmful lesson from school is learning to optimize for grades rather than actual learning. "The measurement of what I was learning completely dominated actual learning in college."
- **Impact:** This essay connected education reform to startup culture, explaining why young founders kept asking about tricks to raise money rather than simply building a good product. "Their education had taught them that the way to win was to hack the test."

**"Startup Ideas" (2012):**
- **Core Thesis:** Don't actively brainstorm startup ideas. Instead, cultivate the right mindset and let ideas find you organically. "The verb you want to be using with respect to startup ideas is not 'think up' but 'notice.'"
- **Key Frameworks:** The "well" vs. "crater" framework (build for a small group who desperately need your product), the three mental filters that block good ideas (the obvious filter, the schlep filter, the unsexy filter).

---

## 8. Views on Education

**Decision Not to Pursue Academia:**
After earning his PhD in Computer Science from Harvard in 1990, Graham decided not to follow the traditional academic path. Instead, he pursued programming and entrepreneurship. He found the prospect of building things more appealing than the tenure-track academic grind.

**Cross-Disciplinary Education:**
Graham's unique background — BA in philosophy from Cornell, PhD in CS from Harvard, painting studies at RISD and Florence — shaped his belief that cross-disciplinary exposure is especially fertile. "A CS student taking genetics or working in biotech sees problems others miss."

**Critique of the Education System:**
Graham argues that tests are deeply flawed as assessment tools: "Nearly all tests given to students are terribly hackable." Students learn to game the system rather than genuinely absorb knowledge — studying lecture notes rather than reading "the best books you can find" about a subject.

He sees grades as overloaded — they serve not just as feedback but as judgments used by "graduate programs, employers, scholarships, even their own parents," creating perverse incentives.

**On College Admissions:**
He is critical of admissions as a test, saying officers "accept who they like" based on a vague sense of admirableness. The result is "the freakishly specific nature of the stuff ambitious kids do in high school."

**Positive Models:**
He references Lambda School as a better model, noting it "doesn't have grades" and uses tests only to determine progression, making it effectively pass/fail.

**On Students and Career Choices:**
Rather than studying "entrepreneurship," students should invest time getting to the leading edge of a fast-changing field. "If you're at the leading edge of some rapidly changing field, you don't have to look for waves; you are the wave."

---

## 9. Decision to Focus on Writing vs. Investing

**Context:** After stepping back from YC in 2014, Graham faced a choice about how to spend his time and energy. He had built the most influential startup accelerator in history and had significant wealth from the Viaweb sale and YC's success.

**Decision:** Graham chose to focus on writing and personal projects rather than continuing as an active investor or starting new companies.

**Rationale:**
- Writing was how he discovered and refined ideas — "Most of what ends up in my essays I only thought of when I sat down to write them"
- He saw the web as ushering in "the golden age of the essay"
- He valued the intellectual freedom of writing over the operational demands of investing
- He had always been a writer at heart — essays on paulgraham.com started in 2001, years before YC

**Outcome:**
- Graham continued publishing influential essays on startups, technology, and society
- In 2019, he published the specification for Bel, a new Lisp dialect "written in itself"
- He and Jessica Livingston have lived in England since 2016
- His essays continue to shape startup culture and programming philosophy

**The Writing Process:** Graham's approach to writing mirrors his approach to startups — iterative, honest, and focused on discovery. He shares drafts with friends, wants to know what bores them, and isn't afraid to backtrack when hitting dead ends. "If you're thinking without writing, you only think you're thinking" (quoting Leslie Lamport).

---

## 10. Mistakes He's Acknowledged

**Selling Viaweb to Yahoo:**
Graham has reflected on the challenges of integrating a startup into a large company. The sale gave him financial independence, but the experience of watching Viaweb become Yahoo! Store taught him about the cultural mismatch between startups and corporations.

**Being Too Focused on Technology, Not Users:**
Early in his career with Viaweb, he learned that building what users want matters more than elegant technical solutions. This shaped YC's emphasis on "talking to users" and building products people actually want.

**Funding Some Bad Startups in Early YC:**
He's openly discussed being too lenient with founders early on, learning to trust pattern recognition about founding teams. The early batches included some companies that didn't work out, but these failures informed YC's later selection criteria.

**Letting Fear of Looking Stupid Prevent Decisions:**
He's written about how worrying about reputation can prevent bold, correct decisions. This connects to his essay on prestige being "fossilized inspiration."

**The "Sine Wave" of Viaweb:**
Graham described Viaweb's trajectory as "like a sine wave" — the company came close to failure multiple times before succeeding. This taught him that startups are inherently unstable and that "the median outcome is probably zero."

**Not Shipping Version 1.0 Fast Enough:**
His advice to "ship version 1.0 quickly rather than prematurely optimizing" came from his own experience. He learned that getting users is more important than perfecting the product, since acquirers judge value primarily by user count.

**The Difficulty of Selling a Company:**
Graham noted that Viaweb "became comically eager to sell" — they attempted unsuccessfully for a long time before Yahoo acquired them. This taught him that acquisition is often driven by fear of a competitor buying you, not by your technology's elegance.

**Not Recognizing the Importance of Domain Names:**
In his essay on e-commerce mistakes, he cited "barnesandnoble.com" as awkward and contrasted it with Amazon.com's brevity, arguing that part of Amazon's dominance was simply having a better domain name. This lesson about brand and naming influenced his later advice to startups.

**Pre-emptively Lowering Expectations:**
Graham argued that most people "pre-emptively lower their expectations," saying "I can't" as a statement of intention rather than fact. He believes that with twenty years of maximum effort, most people would "get surprisingly far" at almost anything, but protecting themselves from the pain of potential failure, they never try.

**Over-Reliance on Partnerships:**
In "Do Things That Don't Scale," Graham warned against betting on partnerships with big companies as a growth strategy. Founders consistently report these required far more work than expected with minimal payoff. This was a lesson he learned from watching YC companies make the same mistake repeatedly.

**The "Big Launch" Fallacy:**
Graham learned that "all you need from a launch is some initial core of users." Months later, success depends on user happiness, not launch magnitude. Many early YC companies wasted months preparing for a "big launch" that didn't matter.

**Not Understanding the Importance of User Experience Early Enough:**
At Viaweb, the team was initially more focused on technical elegance than user experience. They eventually learned that "you can and should give users an insanely great experience with an early, incomplete, buggy product" — but this took time to internalize.

---

## Meta-Lessons Across All Decisions

1. **Power compounds:** Choosing Lisp, writing essays, building YC's network — each decision created leverage for the next.

2. **The best decisions feel contrarian at the time:** Funding startups in batches, using an obscure programming language, writing essays instead of investing — all seemed unusual when Graham made them.

3. **Process over outcome:** Graham consistently chose processes that generated learning (writing, building, funding) over processes that optimized for safety or prestige.

4. **Small bets, many experiments:** YC's model of making many small bets reflects Graham's own career — trying many things, learning from failures, and doubling down on what works.

5. **Authenticity as strategy:** Whether in writing, investing, or building companies, Graham's decisions were driven by genuine curiosity rather than market trends.

6. **The value of being small:** Graham consistently advantages of being small — using any language you want, offering personal service, moving fast without bureaucracy.

7. **Writing as thinking:** Graham's decision to write wasn't just about publishing — it was about discovering ideas. This became a meta-lesson for founders: the act of articulating your thinking changes your thinking.

8. **The importance of measurement and leverage:** Graham's framework from "How to Make Wealth" — that you need both measurement (your contribution is visible) and leverage (your decisions have outsized impact) — applies to every decision he made. Viaweb gave him leverage through technology; writing gave him leverage through influence; YC gave him leverage through network effects.

9. **Fear is a signal, not a stop sign:** Graham learned that the things he was most afraid of — building a startup, writing publicly, funding strangers — were often the most rewarding. His essay on the "schlep filter" argues that the most dangerous mental block is avoiding tedious or messy problems.

10. **The value of contrarian thinking:** Graham's most successful decisions were contrarian at the time — using Lisp, funding startups in batches, writing essays instead of investing, stepping back from YC. The pattern suggests that the best opportunities lie in areas where conventional wisdom is wrong.

---

## Sources

- Paul Graham's essays: https://paulgraham.com/articles.html
- "Beating the Averages" (2001): https://paulgraham.com/avg.html
- "How to Make Wealth" (2004): https://paulgraham.com/wealth.html
- "How to Do What You Love" (2006): https://paulgraham.com/love.html
- "Do Things That Don't Scale" (2013): https://paulgraham.com/ds.html
- "Startup Ideas" (2012): https://paulgraham.com/startupideas.html
- "The Lesson to Unlearn" (2019): https://paulgraham.com/lesson.html
- "How to Fund a Startup" (2005): https://paulgraham.com/startupfunding.html
- "The Age of the Essay" (2004): https://paulgraham.com/essay.html
- "Writes and Write-Nots" (2024): https://paulgraham.com/writesandwritenots.html
- Paul Graham's bio: https://paulgraham.com/bio.html
- Wikipedia - Paul Graham: https://en.wikipedia.org/wiki/Paul_Graham_(programmer)
- Wikipedia - Y Combinator: https://en.wikipedia.org/wiki/Y_Combinator
- "Ten E-Commerce Mistakes" (1997): https://paulgraham.com/mistakes.html
- "How to Work Hard" (2021): https://paulgraham.com/hwh.html
- "A Word to the Resourceful" (2012): https://paulgraham.com/word.html
