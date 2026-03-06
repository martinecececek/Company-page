# UX Audit Report

## Issue 1

**File:** [src/components/Header.astro](src/components/Header.astro)  
**Line:** [src/components/Header.astro#L15](src/components/Header.astro#L15)  
**Title:** No primary navigation on mobile  
**Problem:** The main nav links are hidden below `md` breakpoint (`hidden md:flex`), and there is no mobile menu alternative.  
**Why it is bad UX:** Mobile users cannot discover core pages easily, which increases bounce risk and blocks key tasks.

## Issue 2

**File:** [src/components/Header.astro](src/components/Header.astro)  
**Line:** [src/components/Header.astro#L16-L22](src/components/Header.astro#L16-L22)  
**Title:** No active/current page state in top navigation  
**Problem:** All nav links look identical across pages; there is no visual current-state or `aria-current` indicator.  
**Why it is bad UX:** Users lose orientation in site structure and need extra cognitive effort to know where they are.

## Issue 3

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro)  
**Line:** [src/layouts/Layout.astro#L30](src/layouts/Layout.astro#L30)  
**Title:** Missing skip-to-content mechanism  
**Problem:** There is no skip link before the fixed header/navigation.  
**Why it is bad UX:** Keyboard and screen-reader users must repeatedly tab through the same navigation on every page.

## Issue 4

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro), [src/components/Hero.astro](src/components/Hero.astro)  
**Line:** [src/layouts/Layout.astro#L12](src/layouts/Layout.astro#L12), [src/components/Hero.astro#L14-L33](src/components/Hero.astro#L14-L33)  
**Title:** Language mismatch (document vs UI copy)  
**Problem:** Document language is Czech (`lang="cs"`), while prominent UI text is in English on key sections.  
**Why it is bad UX:** Reduces clarity for Czech users and may cause incorrect pronunciation/reading behavior in assistive tech.

## Issue 5

**File:** [src/components/TrustedBrands.astro](src/components/TrustedBrands.astro)  
**Line:** [src/components/TrustedBrands.astro#L47-L50](src/components/TrustedBrands.astro#L47-L50)  
**Title:** Infinite marquee animation without reduced-motion fallback  
**Problem:** The logo/tech track auto-scrolls infinitely and pauses only on hover.  
**Why it is bad UX:** Motion-sensitive users and touch/keyboard users cannot reliably stop movement, harming readability and comfort.

## Issue 6

**File:** [src/components/TrustedBrands.astro](src/components/TrustedBrands.astro)  
**Line:** [src/components/TrustedBrands.astro#L21](src/components/TrustedBrands.astro#L21)  
**Title:** Potential horizontal overflow pattern  
**Problem:** The section uses `w-screen` + `left-1/2 -translate-x-1/2`, a known overflow-prone pattern.  
**Why it is bad UX:** Can introduce horizontal scrolling/jank, especially on mobile and with browser zoom.

## Issue 7

**File:** [src/components/SuccessStories.astro](src/components/SuccessStories.astro)  
**Line:** [src/components/SuccessStories.astro#L13-L14](src/components/SuccessStories.astro#L13-L14)  
**Title:** CTA button with no navigation/action behavior  
**Problem:** “View All Case Studies” is a button but has no linked destination or handler in the component.  
**Why it is bad UX:** Creates false affordance and user frustration when a prominent control does not do anything meaningful.

## Issue 8

**File:** [src/components/SuccessStories.astro](src/components/SuccessStories.astro)  
**Line:** [src/components/SuccessStories.astro#L21](src/components/SuccessStories.astro#L21), [src/components/SuccessStories.astro#L53](src/components/SuccessStories.astro#L53)  
**Title:** Cards look clickable but are non-interactive  
**Problem:** Cards use `cursor-pointer` and hover treatment but are plain `div` containers (not links/buttons).  
**Why it is bad UX:** Violates interaction expectations and is inaccessible for keyboard users.

## Issue 9

**File:** [src/components/FAQAccordion.astro](src/components/FAQAccordion.astro)  
**Line:** [src/components/FAQAccordion.astro#L23](src/components/FAQAccordion.astro#L23)  
**Title:** Invalid heading semantics inside button  
**Problem:** A heading element (`h3`) is nested directly inside a `button`.  
**Why it is bad UX:** Invalid/fragile semantics can cause inconsistent assistive technology interpretation.

## Issue 10

**File:** [src/components/FAQAccordion.astro](src/components/FAQAccordion.astro)  
**Line:** [src/components/FAQAccordion.astro#L20-L26](src/components/FAQAccordion.astro#L20-L26), [src/components/FAQAccordion.astro#L44-L53](src/components/FAQAccordion.astro#L44-L53)  
**Title:** Accordion panels are not programmatically linked  
**Problem:** Buttons toggle visibility but lack explicit `aria-controls`/panel IDs; state is mostly class-based (`hidden`).  
**Why it is bad UX:** Screen-reader users get weaker context about what control expands which content.

## Issue 11

**File:** [src/pages/configurator.astro](src/pages/configurator.astro)  
**Line:** [src/pages/configurator.astro#L187](src/pages/configurator.astro#L187)  
**Title:** Personal data submitted via GET  
**Problem:** Final configurator form sends name/email/company/message using `method="get"`.  
**Why it is bad UX:** Puts user data in URL/query history, reducing privacy and trust.

## Issue 12

**File:** [src/pages/configurator.astro](src/pages/configurator.astro)  
**Line:** [src/pages/configurator.astro#L404-L407](src/pages/configurator.astro#L404-L407)  
**Title:** Final contact inputs rely on placeholders, no visible labels  
**Problem:** Name/email/company/message fields have placeholders but no associated labels.  
**Why it is bad UX:** Poor accessibility and usability; users lose field context once typing begins.

## Issue 13

**File:** [src/pages/configurator.astro](src/pages/configurator.astro)  
**Line:** [src/pages/configurator.astro#L407](src/pages/configurator.astro#L407)  
**Title:** Message input is single-line field  
**Problem:** “Zpráva” is implemented as `input type="text"` instead of multiline control.  
**Why it is bad UX:** Discourages complete user input and makes long responses uncomfortable.

## Issue 14

**File:** [src/pages/configurator.astro](src/pages/configurator.astro)  
**Line:** [src/pages/configurator.astro#L190-L194](src/pages/configurator.astro#L190-L194)  
**Title:** Stepper/progress not exposed as accessible progress component  
**Problem:** Step count and bar are visual only; no progress semantics (`role="progressbar"` + values) or live announcement strategy.  
**Why it is bad UX:** Assistive-tech users cannot reliably perceive progress changes during the 6-step flow.

## Issue 15

**File:** [src/components/configurator/FeatureCard.astro](src/components/configurator/FeatureCard.astro), [src/pages/configurator.astro](src/pages/configurator.astro)  
**Line:** [src/components/configurator/FeatureCard.astro#L33-L37](src/components/configurator/FeatureCard.astro#L33-L37), [src/pages/configurator.astro#L491-L495](src/pages/configurator.astro#L491-L495)  
**Title:** Tooltip trigger is not keyboard-first  
**Problem:** Tooltip trigger is a `span`, and visibility is tied to card hover/tooltip-open state.  
**Why it is bad UX:** Keyboard and assistive users get inconsistent access to supporting explanations.

## Issue 16

**File:** [src/pages/contact.astro](src/pages/contact.astro)  
**Line:** [src/pages/contact.astro#L31](src/pages/contact.astro#L31)  
**Title:** Contact form has no explicit submit destination/feedback flow  
**Problem:** Form has no `action`/`method` and no visible success/error handling in-page.  
**Why it is bad UX:** Users cannot tell if submission worked, reducing confidence and conversion.

## Issue 17

**File:** [src/pages/contact.astro](src/pages/contact.astro)  
**Line:** [src/pages/contact.astro#L35-L39](src/pages/contact.astro#L35-L39)  
**Title:** Key contact fields are not required  
**Problem:** Name and email inputs are presented as primary fields but not marked required.  
**Why it is bad UX:** Increases incomplete submissions and creates unclear form expectations.

## Issue 18

**File:** [src/components/PricingSection.astro](src/components/PricingSection.astro)  
**Line:** [src/components/PricingSection.astro#L328-L329](src/components/PricingSection.astro#L328-L329)  
**Title:** Intentional text fading reduces readability  
**Problem:** Collapsed card features are dimmed to `opacity: 0.46` and visually truncated.  
**Why it is bad UX:** Important content becomes hard to read, especially for low-vision users.

## Issue 19

**File:** [src/components/PricingSection.astro](src/components/PricingSection.astro)  
**Line:** [src/components/PricingSection.astro#L101](src/components/PricingSection.astro#L101)  
**Title:** Over-emphasized middle card affects scan balance  
**Problem:** One pricing card is permanently offset and scaled (`lg:scale`, negative margin, stronger hover scale).  
**Why it is bad UX:** Distorts comparison flow and can feel visually unstable while scanning options.

## Issue 20

**File:** [src/components/ServicesSection.astro](src/components/ServicesSection.astro)  
**Line:** [src/components/ServicesSection.astro#L9-L10](src/components/ServicesSection.astro#L9-L10)  
**Title:** Heading hierarchy is semantically inverted  
**Problem:** Kicker-like text is marked as `h2`, while the main section title is `h3`.  
**Why it is bad UX:** Screen-reader heading outline becomes less logical, hurting navigation by structure.

## Issue 21

**File:** [src/components/WhyUs.astro](src/components/WhyUs.astro)  
**Line:** [src/components/WhyUs.astro#L25-L26](src/components/WhyUs.astro#L25-L26)  
**Title:** Repeated heading hierarchy inconsistency  
**Problem:** Same inversion pattern (`h2` as label, `h3` as real title) appears in another major section.  
**Why it is bad UX:** Inconsistent information architecture makes pages harder to parse and navigate.

## Issue 22

**File:** [src/pages/services.astro](src/pages/services.astro), [src/pages/portfolio.astro](src/pages/portfolio.astro), [src/components/Header.astro](src/components/Header.astro)  
**Line:** [src/pages/services.astro#L88](src/pages/services.astro#L88), [src/pages/services.astro#L143](src/pages/services.astro#L143), [src/pages/services.astro#L153](src/pages/services.astro#L153), [src/pages/portfolio.astro#L55-L62](src/pages/portfolio.astro#L55-L62), [src/components/Header.astro#L16](src/components/Header.astro#L16)  
**Title:** Inconsistent localization and terminology across UI  
**Problem:** Czech pages mix Czech and English labels in headings, stats, and CTAs (“Home”, “Core služby”, “Case Studies”, “Start configurator”).  
**Why it is bad UX:** Reduces clarity, perceived polish, and trust due to inconsistent language tone across key journeys.
