# Pieter Levels: Key Decisions and Their Outcomes

Research on the major decisions, their context, outcomes, and lessons learned
from Pieter Levels' (@levelsio) journey as an indie hacker and solo founder.

---

## 1. The "12 Startups in 12 Months" Challenge (2014-2015)

### Context
November 2014. Levels was a 20-something Dutch developer living as a digital
nomad in Southeast Asia. No funding, no team, no breakout product. He observed
that most startups fail, so the conventional "find one idea and commit" strategy
was high-variance for a solo maker.

### The Decision
Build and publicly launch one new startup every month for 12 months. Thesis:
increase the number of attempts to increase the probability of product-market
fit. Treat each project as an experiment, not a life commitment.

### The Projects
| #  | Project          | What It Did                              | Outcome              |
|----|------------------|------------------------------------------|----------------------|
| 1  | PlayMyInbox      | Turned email inbox into a music player   | Failed               |
| 2  | Go Fucking Do It | Goal accountability (pay if you fail)    | Minor revenue        |
| 3  | GifBook          | Print GIFs as physical flip books        | Failed               |
| 4  | Tubelytics       | YouTube publisher analytics dashboard    | Failed               |
| 5  | Nomad List       | City comparison for digital nomads       | Breakout hit         |
| 6  | Nomad Jobs       | Remote/nomad job board                   | Evolved into Remote OK |
| 7  | Hoodmaps         | Crowd-sourced neighborhood maps          | Niche success        |
| 8-12| Various         | Assorted experiments                     | Most abandoned       |

### Outcome
Nomad List became the breakout success and the foundation of his business
empire. He later reflected: "Only 4 out of 70+ projects I ever did made money
and grew." The winners: Nomad List, Remote OK, PhotoAI, InteriorAI. The
challenge also built his public reputation -- documenting the journey attracted
a following that became his distribution advantage.

### Lessons
- Most experiments will fail. That is expected, not a problem.
- Shipping speed matters more than planning depth.
- Each project builds skills, audience, and technical infrastructure for the
  next -- compounding returns.
- Public documentation creates a flywheel of attention and credibility.

---

## 2. Building Nomad List: From Spreadsheet to Platform

### Context
Levels was living the digital nomad lifestyle, bouncing between Chiang Mai,
Bangkok, and Bali. He needed to compare cities on cost of living, internet
speed, safety, and weather. No centralized resource existed.

### The Decision
Start with the simplest possible artifact: a publicly shared Google Spreadsheet
crowdsourcing city data. Validate demand before writing code.

### How It Grew
1. **Spreadsheet phase (early 2014):** Google Sheet went viral in nomad
   communities. Demand was immediate and organic.
2. **Website phase:** Converted to a full site with city profiles and data
   visualizations.
3. **Community phase:** Added forums, chat, member profiles, meetups. Became
   a social network, not just a data tool.
4. **V5 launched July 2019,** exactly five years after V1.

### Monetization
- Subscription: ~$99/year or $20/month for data, forums, chat, community.
- Remote job board for employers (later spun into Remote OK).
- Part of the duo that took 4 years to reach $1M annual revenue (May 2019).

### Outcome
- Reached #1 on Product Hunt and Hacker News ("by accident" -- organic
  traction, not a coordinated campaign).
- Lisbon became most visited city by 2021.
- Anti-scraping: created a fake Japanese city "Dorobo" to catch data thieves.
- By September 2024, described as "one of the first network states."

### Lessons
- Start with a spreadsheet. If it gets traction, you have validation.
- Community is a stronger moat than data. Data can be scraped; a community
  of real people cannot.
- The problem you personally experience is the best starting point.

---

## 3. Building Remote OK: The Remote Job Board

### Context
Remote work was accelerating pre-COVID but lacked a dedicated, well-designed
job board. Levels had Nomad List's audience of remote workers.

### The Decision
Build a remote job board as a single PHP file. No frameworks. Monetize by
charging employers to post listings.

### Revenue Timeline
| Date      | Revenue          |
|-----------|------------------|
| Dec 2017  | $2,342/day       |
| Sep 2020  | $65,651/month    |
| Apr 2021  | $101,101/month   |

### Pricing
- Employers pay per listing: $199-$499+ depending on placement.
- Featured/promoted listings at premium prices.
- No free tier for employers -- deliberate choice to maintain quality and
  revenue.

### Outcome
- One of the largest remote job boards on the internet.
- The "single PHP file generating $100K+/month" became an iconic indie hacker
  story.
- Proved a marketplace can be extremely simple technically and highly
  profitable.

### Lessons
- A job board is a proven business model. You don't need to invent a new one.
- SEO is a compounding distribution channel. Structured content pages generate
  traffic for years.
- The "single file" approach reflects a genuine philosophy: prioritize shipping
  over architecture.

---

## 4. Building PhotoAI: Riding the AI Wave

### Context
Late 2022. AI image generation (Stable Diffusion, DALL-E) was exploding.
Levels saw an opportunity to apply it to a specific, high-value use case:
professional headshots and profile photos.

### The Decision
Build an AI photo generator for practical use cases (LinkedIn headshots, dating
photos, professional portraits). Move fast to capture the early market.

### How It Unfolded
- **AvatarAI.me** launched late 2022: sold "$100,000 in AI-generated avatars"
  in the first 10 days.
- **PhotoAI.com** evolved as the main product. By July 2023: "almost 14,000
  lines of raw PHP making $61,808 per month."
- **Interior AI** was a related experiment, "built from scratch in five days."

### Pricing
- One-time payment (not subscription): $10-$50+ per package.
- Different tiers for different photo packs/styles.
- Dynamic pricing adjustments based on demand.

### Outcome
- Exceeded $1M ARR. One of his highest-revenue products.
- Demonstrated that being early to apply new technology to practical use cases
  is more valuable than building the underlying technology.

### Lessons
- When a technology wave hits, apply it to specific, practical use cases.
- Speed of execution matters enormously in fast-moving spaces.
- One-time payments work well for episodic utility needs.

---

## 5. Staying Bootstrapped (No VC Funding)

### Context
Levels generated real revenue from day one. At various points he could have
raised VC. The prevailing wisdom was that raising capital was a sign of success.

### The Choice
Explicitly reject venture capital. Stay 100% self-funded. Retain full ownership.

### Reasoning
He calculated that a "$100M exit nets 4 co-founders $47 per hour after dilution
and taxes" -- framing VC-funded exits as surprisingly low hourly compensation.
Key arguments:
- **Full control:** No board, no investors, no growth-at-all-costs pressure.
- **Profitability from day one:** Revenue validates PMF in a way funding does
  not.
- **Lifestyle alignment:** Choose how to live, not just how to grow.
- **Simplicity:** No fundraising, no investor updates, no cap table complexity.

### Outcome
- 2015: $202,785/year with "one Linode server, one MacBook, no office, no
  house, hardly any expenses, and $0 funding."
- Feb 2018: $52,843/month.
- May 2019: $1M annual revenue (4 years in).
- Sep 2024: $420,000/month record (boosted by Lex Fridman podcast).
- Profit margins at "99%" due to minimal infrastructure and no payroll.

### Lessons
- Bootstrapping is viable for significant businesses, not just lifestyle ones.
- Profitability discipline forces better product decisions.
- Full ownership means full optionality: sell, hold, pivot, or shut down
  without permission.
- The "VC or nothing" framing is false.

---

## 6. Solo Founder (No Co-founders, No Employees)

### Context
The startup ecosystem strongly favors co-founding teams. Y Combinator preferred
teams over solo founders. Conventional wisdom: solo founders burn out, lack
complementary skills, make worse decisions.

### The Choice
Operate solo. No co-founders, no employees for years. Handle product,
engineering, design, marketing, support, and operations personally.

### Approach
- **Automation over hiring:** "100% automation and 99% profit margins."
- **Async communication:** Described himself as "unreachable." Wrote "this is
  why I don't do calls."
- **Scope control:** Solo constraint forced simpler products. This became a
  feature, not a bug.

### Outcome
- Multiple products generating $2M+/year as a single person.
- Product Hunt Maker of the Year twice (2017, 2018).
- Demonstrated "solo founder can't scale" is wrong when the product is
  designed for solo operation.
- No payroll = extremely high margins.

### Lessons
- Solo founding works when you choose products that don't require teams.
- The solo constraint forces simplicity, which often produces better products.
- Automation is a substitute for hiring that scales better.
- The co-founder requirement is a heuristic, not a law.

---

## 7. Pricing and Monetization Philosophy

### Key Decisions
1. **Charge from day one.** Never build a free product hoping to monetize
   later.
2. **No free tier for employers** on Remote OK. Maintained quality and revenue.
3. **One-time payments** for PhotoAI. Aligned with episodic user intent.
4. **Subscription for community** on Nomad List. Recurring value justifies
   recurring payment.
5. **Premium pricing.** Don't compete on price.

### Key Quote
"The difference between free users and paying users is about 1000x from my
experience." Free users are not potential paying users; they are a different
category entirely.

### Pricing Reference
- Remote OK employer listings: $199-$499+ per post.
- Nomad List membership: ~$99/year or $20/month.
- PhotoAI: $10-$50+ one-time per package.

### Lessons
- Pricing is a product decision, not a marketing decision. The price shapes
  the user base.
- Free tiers are overrated. They attract the wrong users and create support
  burdens without revenue.
- Match pricing model to user intent: one-time for episodic, subscription
  for ongoing.

---

## 8. The "Build in Public" Strategy

### The Decision
Share everything publicly: revenue numbers, technical decisions, failures,
milestones. Use Twitter/X as the primary channel.

### Execution
- **Open revenue dashboards:** Nomad List's MRR publicly visible.
- **Revenue milestone tweets:** $200K/year (2015), $52K/month (2018),
  $1M/year (2019), $420K/month (2024).
- **Technical transparency:** Tech stack, architecture, code philosophy.
- **Failure sharing:** Documented projects that didn't work.
- **By December 2024:** 1 billion views on X in 12 months.

### Outcome
- 500K+ followers on X who serve as distribution for every product launch.
- Personal brand inseparable from his products.
- Inspired an entire generation of indie hackers to build in public.

### Lessons
- Transparency builds trust. People follow journeys, not just outcomes.
- Revenue sharing is the most powerful content for a founder audience.
  Specific numbers beat vague claims.
- The audience you build by sharing publicly becomes your distribution
  channel. This is the real ROI of "build in public."
- Vulnerability (sharing failures) builds more credibility than highlight
  reels.

---

## 9. Digital Nomad Lifestyle as Product Strategy

### The Decision
Use geographic arbitrage (low-cost locations, earning in USD/EUR) as a startup
strategy. Build products that solve problems he personally experienced.

### How It Shaped Products
- **Nomad List** exists because he needed it himself.
- **Remote OK** exists because he saw remote workers struggling to find jobs.
- Personal credibility as a long-term nomad gave products authenticity a
  non-nomad founder could not replicate.

### Lifestyle as Strategy
- Could bootstrap in Bangkok for "$240 a month."
- Cheap locations = longer runway = more experiments.
- Embraced minimalist living (100 Thing Challenge).
- Low burn rate meant he could run the "12 startups" experiment without
  external funding.

### Lessons
- Living the problem is the best way to understand it.
- Geographic arbitrage is a legitimate startup strategy, not just a lifestyle
  hack.
- Low personal burn rate extends runway, which increases experiments.

---

## 10. Mistakes and Acknowledged Failures

### Building Too Many Products Without Focus
70+ projects built. Only 4 made meaningful money. The shotgun approach was
partly deliberate, but many projects got insufficient attention.
**Lesson:** The shotgun approach works for discovery, but once you find signal,
double down. The "explore" to "exploit" transition is critical.

### Overbuilding Before Validating
Early career: too long building before checking if anyone wanted the product.
Became a strict "launch fast" and MVP advocate.
**Lesson:** "Building a product in the dark without letting people use it early
on" is how you make something nobody wants. Validate with a spreadsheet first.

### Not Charging Enough Early On
Learned to charge real money from day one, not offer free plans and hope for
conversion later.
**Lesson:** Free users and paying users are fundamentally different segments.

### Burnout from Constant Travel + Work
The combination of building products, traveling, and maintaining a public
persona was unsustainable at times.
**Lesson:** The nomad lifestyle has real non-financial costs. Sustainability
requires deliberate rest and boundaries.

### Overengineering
"Overengineering everything is the disease of modern day developers." Early
projects suffered unnecessary complexity before adopting the minimalist
PHP/vanilla JS approach.
**Lesson:** Complexity is a cost, not a feature.

### Free User Acquisition Fallacy
"The difference between free users and paying users is about 1000x."
**Lesson:** Optimize for paying users from the start. Free tiers attract a
fundamentally different user base.

---

## Cross-Cutting Themes

**Simplicity as Strategy:** Single PHP files, vanilla JS, solo founder,
bootstrapped, one server. Not laziness -- a strategic choice enabling speed,
low costs, and optionality.

**Shipping Speed as Moat:** From spreadsheet to product in days. While
competitors deliberated, he launched. While they built features, he had users.

**Distribution Before Product:** Built an audience (build in public, revenue
sharing, aspirational lifestyle) before building most products. This audience
became the distribution channel.

**Revenue as Validation:** Measured success by MRR, not users, press, or
followers. This discipline filtered out bad ideas early.

**Constraints as Features:** Solo, no funding, simple stack, no office, no
employees. These constraints forced decisions that became advantages: simpler
products, higher margins, faster shipping, more optionality.

---

## Revenue Growth Timeline

| Date              | Milestone                                    |
|-------------------|----------------------------------------------|
| Nov 2014          | Started "12 startups in 12 months" challenge |
| 2015              | $202,785 annual revenue                      |
| Dec 2017          | Remote OK: $2,342/day                        |
| Feb 2018          | $52,843/month total revenue                  |
| May 2019          | $1M annual revenue (4 years in)              |
| Sep 2020          | Remote OK: $65,651/month                     |
| Apr 2021          | Remote OK: $101,101/month                    |
| Nov 2022          | AvatarAI: $100K in first 10 days             |
| Jul 2023          | PhotoAI: $61,808/month                       |
| Sep 2024          | $420,000/month revenue record                |
| Dec 2024          | 1 billion views on X in 12 months            |

---

## Sources

- Levels.io blog -- https://levels.io (primary source for revenue milestones,
  technical decisions, and philosophy)
- Pieter Levels on X/Twitter -- https://twitter.com/levelsio (build in public
  updates, revenue sharing, philosophy)
- "MAKE: The Indie Maker Handbook" by Pieter Levels (2018) -- book on
  bootstrapping methodology
- Product Hunt -- https://www.producthunt.com (Maker of the Year 2017, 2018)
- Remote OK -- https://remoteok.com (live product)
- Nomad List -- https://nomadlist.com (live product with open revenue dashboard)
- PhotoAI -- https://photoai.com (live product)
- Indie Hackers community -- https://www.indiehackers.com
- Lex Fridman Podcast -- August 2024 interview with Pieter Levels
  (https://lexfridman.com)
