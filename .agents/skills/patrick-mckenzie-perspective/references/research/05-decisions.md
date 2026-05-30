# Patrick McKenzie's Key Decisions and Their Outcomes

## Overview

Patrick McKenzie (patio11) has made a series of unconventional career and business decisions
that, taken together, reveal a coherent mental model about software, pricing, markets,
and the compounding power of writing. Each decision can be understood as an experiment
with explicit constraints, a thesis, and measurable outcomes. This document examines
six major decisions, the context that produced them, and the lessons they yielded.

---

## 1. Moving to Japan

### Context and Constraints

Patrick McKenzie is American by birth. After completing his education, he made the
unusual decision to move to Japan -- specifically to Shiga Prefecture, not Tokyo --
and work as a software engineer in the Japanese IT industry. This was not a Silicon
Valley trajectory. It was not even a typical expat trajectory (most foreigners in
Japanese tech cluster in Tokyo). The decision placed him far from the conventional
hubs of American software entrepreneurship.

At the time, the obvious career path for a competent American developer was:
get a job at a big tech company or a startup in the Bay Area, Seattle, or New York.
McKenzie chose differently. He became what he would later describe as a
"recovering Japanese salaryman."

### The Decision Itself

Move to Japan, work inside the Japanese corporate IT ecosystem, and observe how
an entire economy runs its software infrastructure from the inside.

### Outcome and Observations

Living in Japan gave McKenzie several perspectives that became foundational to
his later business thinking:

**Japanese B2B software is absurdly expensive.** McKenzie observed that Japanese
companies routinely pay orders of magnitude more for enterprise software than
Western companies would tolerate. A simple workflow tool that would cost $50/month
in the US might command tens of thousands of dollars in Japan. The reason was not
superior technology -- it was relationship-based selling, risk aversion, and the
cultural inability of Japanese buyers to say "no" to established vendors.

**The gap between "what software costs to build" and "what businesses will pay
for it" is enormous.** This observation became the bedrock of McKenzie's later
pricing philosophy. Seeing Japanese companies pay $30k+ for terrible software
that solved a real business problem taught him that value-based pricing has
almost no ceiling when the problem is painful enough.

**Geographic arbitrage enables experimentation.** Living in Japan with a lower
cost of living (outside Tokyo) gave McKenzie financial runway to experiment with
small software businesses that would have been unviable in San Francisco. His
salaryman job covered living expenses; his side businesses were pure upside.

**Cultural distance produces clarity.** Being an outsider in Japan -- someone
who could observe the system without being fully socialized into it -- gave
McKenzie a habit of questioning assumptions that insiders take for granted.
This habit later manifested in his willingness to challenge software industry
conventions around pricing, hiring, and career management.

**Japan taught him that "the software industry" is not monolithic.** The Japanese
IT ecosystem runs on different rules: different pricing norms, different sales
cycles, different relationships between vendors and customers. This made him
skeptical of universal prescriptions and attentive to local market conditions.

### How It Reflects His Mental Models

- **Cultural arbitrage as a thinking tool.** Exposure to a radically different
  business culture creates mental models that are invisible to people embedded
  in a single system.
- **Constraints enable creativity.** Being outside the Silicon Valley ecosystem
  forced McKenzie to find his own path rather than following conventional playbooks.
- **Observation before action.** He spent years inside the Japanese system before
  building businesses, accumulating pattern-matching data that would later inform
  pricing and sales decisions.

---

## 2. Building Bingo Card Creator

### Context and Constraints

While working as a Japanese salaryman, McKenzie wanted to build a software
business on the side. The constraints were severe: he worked until 7:30 PM
or later, had a 90-minute commute each way, and had roughly 5 hours per week
to devote to a side project. He had $60 in starting capital.

The obvious move -- build something for developers or tech companies -- was
saturated. McKenzie chose a radically different market: American teachers
who needed printable bingo cards for vocabulary lessons.

### The Decision Itself

Build Bingo Card Creator, a simple web application ("Hello World attached
to a random number generator") that generates printable bingo cards for
classroom use. Sell it directly to teachers at a low price point. Run the
entire business on 5 hours per week while maintaining full-time employment.

### Key Business Choices

**Niche down ruthlessly.** Rather than building a general-purpose bingo card
tool, McKenzie focused on reading vocabulary bingo cards for teachers. He
validated the market by observing that physical reading bingo cards were
already sold in educational stores -- demand existed, and he could out-niche
incumbents.

**B2C pricing at scale.** The product was cheap enough that individual
teachers could buy it without purchase orders or administrative approval.
This eliminated the sales cycle entirely.

**Automate everything.** McKenzie built systems -- automated email responses,
self-service purchasing, documentation -- that allowed him to serve customers
in minutes per day rather than hours.

**A/B test continuously.** He built an open-source Rails A/B testing library
(ABingo) and ran weekly experiments on landing pages, pricing, and conversion
funnels. The time investment was minimal; calendar time did the work.

**Outsource recurring tasks.** McKenzie paid freelancers for repetitive work,
planned well in advance, and paid promptly -- building a reliable contractor
network.

### Outcome

Bingo Card Creator became a profitable micro-business. It never made McKenzie
rich, but it proved that a solo developer working 5 hours a week could build
a sustainable software business. More importantly, it was his laboratory for
testing pricing, marketing, and customer acquisition theories that he would
later write about extensively.

The business taught him that the unit economics of software -- near-zero
marginal cost, global distribution, automated delivery -- make even tiny
niches viable if you can find and reach the customers.

### How It Reflects His Mental Models

- **Time assets over time spent.** Build systems that work while you sleep.
- **Validate demand by looking for existing spending.** Physical bingo cards
  were already being sold. Software could do it better and cheaper.
- **Constraints are inputs, not excuses.** 5 hours per week and $60 in capital
  were the constraints. The business was designed around them.
- **Small experiments compound.** Weekly A/B tests, each taking minutes, produced
  years of accumulated optimization.

---

## 3. Appointment Reminder and Pricing Experiments

### Context and Constraints

After proving the micro-business model with Bingo Card Creator, McKenzie built
a second SaaS product: Appointment Reminder. This was a more ambitious product
targeting a B2B market -- small businesses (dentists, hair salons, medical
offices) that lose revenue when customers miss appointments.

The key constraint was pricing. McKenzie had internalized the lesson from
observing Japanese software pricing -- businesses will pay dramatically more
than developers expect -- but had not yet tested this thesis with his own
products.

### The Decision Itself

Build Appointment Reminder as a SaaS product. Then run systematic pricing
experiments to find the optimal price point, starting from the assumption
that the initial price was almost certainly too low.

### The Pricing Experiments

McKenzie's pricing experiments with Appointment Reminder became some of the
most cited case studies in SaaS pricing:

**Starting price: too low.** Like most indie developers, McKenzie initially
priced the product low -- in the range of $30-50/month. This attracted
price-sensitive customers who were difficult to support and had high churn.

**The "charge more" experiment.** McKenzie raised prices significantly,
eventually reaching $500/month and higher for business-tier plans. The
results contradicted conventional indie developer intuition:

- Conversions did not drop proportionally. Some segments converted better
  at higher prices because the price signaled quality and seriousness.
- Customer quality improved dramatically. Businesses paying $500/month were
  sophisticated, understood the value, required less support, and churned less.
- Revenue per customer increased far more than customer count decreased.

**The ROI framing.** McKenzie reframed the product's value proposition around
the cost of missed appointments. A dental office losing even 2-3 appointments
per week at $200+ each was hemorrhaging thousands of dollars monthly. A $500/month
tool that prevented even a fraction of those losses had an obvious and enormous ROI.

**Price discrimination through tiers.** McKenzie introduced tiered pricing --
not based on usage volume, but on organizational sophistication. Professional,
Small Business, and Enterprise tiers offered different levels of service
(onboarding consultations, priority support, custom legal documentation) at
quantum leaps in price. The tiers worked as a price discrimination mechanism:
organizations that extracted more value from the product self-selected into
higher tiers.

**Annual vs. monthly.** McKenzie discovered that offering annual plans with a
modest discount (10% off or one month free) "routinely gets 20%+ uptake" from
existing monthly customers, dramatically improving cash flow and reducing churn.

### Outcome

Appointment Reminder became a profitable B2B SaaS business. More importantly,
the pricing experiments produced a body of knowledge that McKenzie codified
into some of his most influential writing. His core pricing lessons:

1. Almost every small software business dramatically undercharges.
2. Price objections are a signal that you haven't communicated value, not that
   the price is too high.
3. Higher prices attract better customers who are easier to serve.
4. The marginal dollars above your current price are nearly invisible to
   business customers but transformative when aggregated across your base.
5. B2B customers evaluate price against the problem's cost, not against your
   development costs.

McKenzie eventually sold Appointment Reminder.

### How It Reflects His Mental Models

- **Price is an engineering problem, not a gut feeling.** Treat it like any
  other variable: form a hypothesis, test it, measure results, iterate.
- **Your intuitions about price are wrong.** Developers systematically
  undercharge because they anchor on their own cost structure rather than
  the customer's value structure.
- **The market tells you the truth if you let it.** A/B testing price points
  reveals information that introspection never will.
- **Better customers are worth more than more customers.** A smaller base of
  high-paying, low-churn customers is worth more than a large base of
  price-sensitive, high-support ones.

---

## 4. Starfighter

### Context and Constraints

By the mid-2010s, McKenzie was one of the most recognized voices in the
indie software community. He had built two profitable SaaS products, written
extensively about software business, and developed a large following on
Hacker News and his blog. He was also deeply frustrated with the state of
technical hiring.

The conventional hiring pipeline -- resumes, phone screens, whiteboard
interviews, culture fit assessments -- was, in McKenzie's view, both
inefficient and discriminatory. It selected for credentials and interview
performance rather than actual programming ability.

McKenzie co-founded Starfighter with Erin Ptacek and others, with involvement
from Patrick Collison (Stripe's co-founder). The thesis: turn programming
recruiting into a multiplayer game where actual problem-solving ability is
the signal, not resume pedigree.

### The Decision Itself

Build Starfighter, a game-based recruiting platform where developers solve
increasingly difficult programming challenges. Top performers get recruited
by companies based on demonstrated ability rather than traditional credentials.

### Why He Built It

McKenzie believed several things simultaneously:

1. Technical hiring is broken and produces enormous waste.
2. Meritocratic, game-based assessment could be better for both companies
   and candidates.
3. A two-sided marketplace connecting talented developers with employers
   could be a large business.
4. His reputation and network could bootstrap both sides of the marketplace.

### The Outcome

Starfighter shut down. The reasons are instructive:

**Two-sided marketplace chicken-and-egg problem.** The platform needed enough
quality developers playing to attract companies, and enough companies hiring
to attract developers. Bootstrapping both sides simultaneously proved
extremely difficult.

**B2B sales cycles in recruiting are long and adversarial.** Selling a novel
recruiting channel to companies required overcoming institutional inertia,
procurement processes, and the political dynamics of internal hiring teams.
Recruiters -- the buyers -- had incentives to protect their existing processes.

**The game needed to be fun on its own merits.** Building something that was
simultaneously an excellent game and a useful recruiting tool was an enormous
engineering and product challenge. The dual mandate created design tensions
that were never fully resolved.

**Market timing.** The idea of gamified recruiting was ahead of the market's
willingness to adopt novel hiring methods. Companies were not yet ready to
abandon traditional pipelines for a game-based alternative, regardless of
its theoretical superiority.

### Lessons Learned

McKenzie drew several lessons from Starfighter's failure:

1. **Not every good idea succeeds.** Even with experienced founders, a
   compelling vision, and connections to Stripe's leadership, execution in
   the wrong market conditions can fail.

2. **Two-sided marketplaces are among the hardest business models.** The
   chicken-and-egg problem is not just a challenge to overcome -- it is a
   fundamental structural risk that may be insurmountable in certain markets.

3. **Institutional resistance is real.** Changing how companies hire means
   changing processes that hiring managers, recruiters, and HR departments
   have built careers around. The resistance is not rational -- it is political.

4. **The founder's reputation does not substitute for product-market fit.**
   McKenzie's blog readers and Hacker News followers were not the buyers.
   The buyers were corporate recruiting departments who had never heard of
   patio11.

5. **Building a great product and building a great business are different
   challenges.** Starfighter may have been a better product than the hiring
   processes it aimed to replace. That was not sufficient.

### How It Reflects His Mental Models

- **Systemic problems require systemic solutions.** Hiring is broken at the
  system level, not at the individual tool level. A better assessment tool
  cannot fix a broken incentive structure.
- **Know the difference between "this should exist" and "this can be a
  business."** Many valuable things cannot be profitably built.
- **Failure is data.** McKenzie did not treat Starfighter's shutdown as a
  personal defeat but as an expensive experiment that produced valuable
  information about market structure.
- **Institutional buyers are not individual buyers.** Selling to companies
  requires understanding organizational dynamics, not just individual needs.

---

## 5. Joining Stripe

### Context and Constraints

By 2016, McKenzie had spent over a decade running small software businesses
from Japan. He had built Bingo Card Creator, Appointment Reminder, and
Starfighter. He had written hundreds of thousands of words about software
business. He was, by any measure, one of the most successful indie hackers
in the community.

But he was also at a crossroads. Starfighter had failed. His remaining
businesses were profitable but small. He had written extensively about how
the software industry works but had never worked inside a high-growth
technology company. His perspective, while valuable, was necessarily limited
to the solo-founder, bootstrapped-business view of the world.

Stripe was building infrastructure for the internet economy -- payments,
incorporation (Atlas), fraud detection, and more. The company's mission
aligned with McKenzie's interests in financial infrastructure and
international business. Patrick Collison, Stripe's co-founder, had been
involved with Starfighter and knew McKenzie well.

### The Decision Itself

Join Stripe as an employee, transitioning from indie hacker to operator at
a high-growth technology company. His initial focus was on Stripe Atlas,
a service helping entrepreneurs worldwide incorporate US businesses, open
bank accounts, and start accepting payments.

### Why He Joined

Several factors converged:

**Mission alignment.** Stripe Atlas directly addressed a problem McKenzie
had experienced personally -- the difficulty of starting a software business
as a non-US-based entrepreneur. His years in Japan had given him firsthand
knowledge of the friction international founders face.

**Scale of impact.** As an indie hacker, McKenzie's products served thousands
of customers. At Stripe, he could help millions of businesses. The leverage
of a platform versus a product was compelling.

**Learning opportunity.** McKenzie had never experienced how a high-growth
company operates. Joining Stripe was a deliberate decision to learn a
different mode of building -- one characterized by rapid scaling, complex
systems, and organizational complexity.

**Personal relationship.** McKenzie knew the Collison brothers through
Starfighter and the broader tech community. The trust and shared intellectual
framework made the transition natural.

### His Role and Contributions

At Stripe, McKenzie worked primarily on Atlas, helping shape the product
and writing extensively about the mechanics of incorporating a business,
navigating US tax and banking systems, and building a company as a
non-US founder. His writing -- both internal and external -- became a
significant part of how Atlas communicated its value.

McKenzie brought his indie hacker sensibility to a platform product:
obsessive attention to the customer experience, deep understanding of the
pain points of small business owners, and a willingness to write
comprehensive documentation that treated customers as intelligent adults.

### How It Changed His Perspective

Working at Stripe expanded McKenzie's mental models in several ways:

**From product to platform.** Building a product (Appointment Reminder) is
fundamentally different from building a platform (Stripe Atlas). Platforms
require thinking about ecosystems, not just individual customer outcomes.

**From solo to systems.** Indie hacking is a solo sport. Working inside a
large, fast-growing company required understanding organizational dynamics,
cross-functional collaboration, and the politics of prioritization at scale.

**From bootstrapped to venture-backed.** McKenzie had always operated with
capital constraints. At Stripe, he experienced what happens when capital is
abundant and the constraint is execution speed and organizational capacity.

**From writing as marketing to writing as operations.** At Stripe, McKenzie's
writing was not just blog posts for potential customers -- it was internal
documentation, product specifications, and strategic communication that
shaped how a large organization understood its own products.

**From "charge more" to "build more value."** McKenzie's pricing philosophy
evolved at Stripe. The question shifted from "how do I extract more revenue
from existing value?" to "how do I build infrastructure that creates
exponentially more value for the ecosystem?"

### How It Reflects His Mental Models

- **Deliberate skill expansion.** McKenzie joined Stripe not because he
  needed a job but because he identified a gap in his experience and chose
  to fill it.
- **The best learning happens at the edge of your competence.** Moving from
  indie hacking to platform building placed McKenzie in a zone of productive
  discomfort.
- **Reputation compounds across contexts.** McKenzie's blog and community
  standing opened the door at Stripe. His work at Stripe then opened new
  doors in fintech and policy.
- **Contribution to a larger mission can be more leveraged than solo
  entrepreneurship.** McKenzie's impact at Stripe likely exceeded what he
  could have achieved with another solo venture.

---

## 6. Writing Career

### Context and Constraints

McKenzie started blogging at Kalzumeus.com early in his software career,
initially writing about his experiences running Bingo Card Creator and
navigating the Japanese IT industry. The blog was not a strategic play --
it was a developer sharing what he learned.

The constraint was that McKenzie had no particular advantages as a writer.
He was not a journalist, not a professional marketer, and not a natural
prose stylist. What he had was: direct experience running software businesses,
a willingness to be specific and quantitative, and the discipline to write
consistently over years.

### The Decision Itself

Write extensively and publicly about the mechanics of running software
businesses -- pricing, marketing, hiring, negotiation, customer acquisition,
and the economics of small software companies. Share specific numbers,
real experiments, and actionable advice rather than vague platitudes.

### The Content Strategy

McKenzie's writing strategy had several distinctive characteristics:

**Radical specificity.** Where other business bloggers wrote "charge what
you're worth," McKenzie wrote "I raised prices from $X to $Y and here is
what happened to conversion rate, churn, and revenue per customer." This
specificity made his advice actionable rather than inspirational.

**Intersection positioning.** McKenzie positioned himself at the intersection
of marketing and engineering: "I'm not the best marketer or engineer in the
world, but I'm a better engineer than almost all marketers and a better
marketer than almost all engineers." This hybrid positioning made him the
go-to voice for technical founders who needed business advice.

**Long-form, high-density.** McKenzie's posts were long -- often thousands
of words -- and dense with specific examples, frameworks, and counterintuitive
insights. He did not write for skimmers. He wrote for people who wanted to
actually understand how things work.

**Repeatable frameworks.** McKenzie did not just share stories; he extracted
generalizable principles. His pricing framework ("charge more"), his career
advice framework ("don't call yourself a programmer"), and his negotiation
framework ("never give a number first") became widely cited mental models.

**Consistency over years.** McKenzie wrote regularly for over a decade.
The compounding effect of hundreds of high-quality posts built an
authority that no single viral post could match.

### Key Posts and Their Impact

**"Don't Call Yourself a Programmer"** -- Reframed how engineers think about
their economic value. The core argument: you are not paid to write code;
you are paid to solve business problems. Code is just the medium. This post
has been read millions of times and fundamentally shifted how many developers
approach their careers.

**"Salary Negotiation: Make More Money, Be More Valued"** -- A comprehensive
guide to negotiation that argued salary negotiation is "probably the most
important financial decision you will ever make." The post's specific tactics
(never give a number first, negotiate after "Yes-If," reveal hidden value)
became standard advice in the developer community.

**"Let's Raise Prices"** and related pricing posts -- Codified McKenzie's
pricing experiments into actionable advice. These posts are among the most
cited references in SaaS pricing discussions.

**"The Business of Open Source"** -- Applied business thinking to the open
source ecosystem, helping developers understand how to build sustainable
businesses around open source projects.

### The Outcome

Writing became McKenzie's most valuable asset -- more valuable than any
individual software product he built. The blog:

1. **Opened doors.** McKenzie's blog led directly to speaking invitations,
   consulting engagements ($30k/week), his relationship with the Stripe
   founders, and his eventual role at Stripe.

2. **Created a personal brand.** patio11 became one of the most recognized
   handles on Hacker News and in the indie software community. The brand
   was built entirely on the quality and consistency of the writing.

3. **Compounded over time.** Each post added to a body of work that
   demonstrated expertise, built trust, and attracted an audience. The
   compounding effect meant that later posts had larger audiences and
   more impact than earlier ones.

4. **Became a moat.** McKenzie's writing created a reputation that no
   competitor could easily replicate. You can clone a software product;
   you cannot clone a decade of specific, credible, public thinking.

5. **Transcended any individual business.** When Bingo Card Creator wound
   down and Starfighter shut down, McKenzie's reputation and audience
   persisted. The writing was the asset; the businesses were experiments
   that fed the writing.

### How It Reflects His Mental Models

- **Writing is thinking made permanent.** McKenzie used writing as a tool
  for clarifying his own thinking, not just for communicating it. The act
  of writing forced precision that casual thinking does not require.

- **Generosity compounds.** McKenzie gave away his best ideas for free.
  The return on this generosity came in the form of reputation, network,
  and opportunities that no amount of paid consulting could have purchased.

- **Specificity is the soul of credibility.** Vague advice ("charge what
  you're worth") is forgettable. Specific advice ("I raised prices 10x
  and conversion improved") is actionable and memorable.

- **Consistency beats virality.** A decade of weekly high-quality posts
  built more authority than any single viral moment could have.

- **Your perspective is your product.** McKenzie's unique combination of
  engineering skill, marketing knowledge, Japan experience, and indie
  hacker credibility was irreplicable. Writing was the medium through
  which this unique perspective created value.

- **Time horizons matter.** McKenzie's writing career only makes sense on
  a multi-year time horizon. The first year of blogging produced almost
  no visible return. The tenth year produced career-defining opportunities.

---

## Cross-Cutting Themes

### Decision Pattern: Experiments Over Plans

Every major decision McKenzie made can be understood as an experiment:

| Decision | Hypothesis | Test | Result |
|---|---|---|---|
| Move to Japan | Cultural distance produces useful perspectives | Live and work there for years | Confirmed; shaped entire business philosophy |
| Bingo Card Creator | Tiny niches can sustain micro-businesses | Build and sell for $60 in capital | Confirmed; profitable on 5 hours/week |
| Pricing experiments | Developers dramatically undercharge | Systematically raise prices and measure | Confirmed; 10x price increases improved all metrics |
| Starfighter | Game-based recruiting can fix hiring | Build platform and attract both sides | Disproved; institutional resistance was insurmountable |
| Join Stripe | Platform leverage exceeds solo impact | Work inside a high-growth company | Confirmed; expanded mental models significantly |
| Writing career | Sharing specific knowledge builds irreplaceable assets | Write consistently for a decade | Confirmed; writing became most valuable career asset |

### Decision Pattern: Asymmetric Bets

McKenzie consistently made decisions with asymmetric payoff profiles:

- Moving to Japan: downside was a few years of unconventional career path;
  upside was a unique perspective that would compound for decades.
- Pricing experiments: downside was losing some price-sensitive customers;
  upside was discovering that dramatically higher prices improve every metric.
- Writing: downside was time spent writing instead of coding; upside was
  building an irreplaceable reputation and network.
- Joining Stripe: downside was giving up indie autonomy; upside was learning
  platform-scale operations and having outsized impact.

### Decision Pattern: Learning From Systems, Not Just Products

McKenzie's most valuable insights came from observing systems -- the Japanese
IT industry, the American hiring pipeline, the SaaS pricing ecosystem --
rather than from building individual products. His products were experiments
within systems; his writing was the synthesis of what those experiments revealed.

### Decision Pattern: The Outsider Advantage

In nearly every context, McKenzie was an outsider: an American in Japan,
an indie developer in the startup ecosystem, a bootstrapper in a
venture-funded world, an engineer in marketing, a marketer in engineering.
This outsider status was not a disadvantage -- it was the source of his
most valuable observations. Outsiders see assumptions that insiders
cannot perceive.

---

## Sources and References

- Kalzumeus.com blog archive (https://www.kalzumeus.com/)
- Patrick McKenzie's "Greatest Hits" page
- "Don't Call Yourself a Programmer, And Other Career Advice" (Kalzumeus)
- "Salary Negotiation: Make More Money, Be More Valued" (Kalzumeus)
- "Running A Software Business On 5 Hours A Week" (Kalzumeus)
- "The Fantasy of Tarsnap" / pricing-related posts (Kalzumeus)
- Patrick McKenzie's Hacker News contributions (as patio11)
- Stripe Atlas documentation and blog posts
- Patrick McKenzie's about page (kalzumeus.com/about/)
- Bits About Money newsletter (https://www.bitsaboutmoney.com/)
- Complex Systems podcast
- Microconf and Business of Software conference talks
