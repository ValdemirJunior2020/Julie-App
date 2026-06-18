import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Check,
  Crown,
  Gem,
  HeartHandshake,
  Camera,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  MousePointer2,
  Palette,
  PencilLine,
  Play,
  Quote,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LanguageToggle } from './components/LanguageToggle';
import { Logo } from './components/Logo';
import { MusicController } from './components/MusicController';
import { contact, content, type Language } from './data/siteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const serviceIcons = [Crown, MessageCircle, Target, PencilLine];
const metricIcons = [BarChart3, HeartHandshake, TrendingUp, Star];
const pillarIcons = [Gem, Sparkles, MousePointer2];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = content[language];
  const whatsappMessage = useMemo(
    () =>
      language === 'en'
        ? `Hi Julie, I saw your portfolio and would like to talk about marketing support.`
        : `Oi Julie, vi seu portfólio e gostaria de conversar sobre suporte de marketing.`,
    [language]
  );

  return (
    <div className="appShell">
      <div className="backgroundGlow glowOne" />
      <div className="backgroundGlow glowTwo" />

      <header className="siteHeader" id="home">
        <Logo />
        <nav className="desktopNav" aria-label="Primary navigation">
          {t.nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="headerActions">
          <LanguageToggle language={language} label={t.languageLabel} onToggle={() => setLanguage(language === 'en' ? 'pt' : 'en')} />
          <a className="headerCta" href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">
            {t.hero.secondary}
          </a>
          <button className="menuButton" type="button" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MusicController labels={t.music} />

      <main>
        <section className="heroSection sectionContainer">
          <motion.div className="heroCopy" variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7 }}>
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            <div className="heroActions">
              <a href="#projects" className="primaryButton">
                {t.hero.primary} <ArrowRight size={18} />
              </a>
              <a href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer" className="secondaryButton">
                {t.hero.secondary} <MessageCircle size={17} />
              </a>
            </div>
          </motion.div>

          <motion.div className="heroVisual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <div className="orb orbPink" />
            <div className="orb orbPurple" />
            <div className="dotPattern" />
            <div className="portraitCard">
              <div className="portraitImage" aria-label="Julie Sutherland creative marketing portrait illustration">
                <div className="portraitHead" />
                <div className="portraitHair hairLeft" />
                <div className="portraitHair hairRight" />
                <div className="portraitBody" />
                <div className="laptop" />
                <div className="coffee" />
              </div>
              <div className="experienceBadge">
                <Sparkles size={18} />
                <strong>{t.hero.badgeTop}</strong>
                <span>{t.hero.badgeBottom}</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="aboutSection sectionContainer" id="about">
          <motion.div className="videoCard" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="videoPortrait">
              <div className="miniPortrait" />
              <button className="playButton" type="button" aria-label="Play Julie introduction">
                <Play size={22} fill="currentColor" />
              </button>
            </div>
          </motion.div>

          <motion.div className="aboutCopy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2>{t.about.title}</h2>
            <p>{t.about.body}</p>
            <a href="#contact" className="textLink">
              {t.about.link} <ArrowRight size={16} />
            </a>
          </motion.div>

          <div className="pillarList">
            {t.about.pillars.map(([title, description], index) => {
              const Icon = pillarIcons[index];
              return (
                <motion.div className="pillarItem" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                  <span className="smallIcon"><Icon size={18} /></span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="servicesSection sectionContainer" id="services">
          <SectionHeading eyebrow="Services" title={t.servicesTitle} />
          <div className="cardGrid fourGrid">
            {t.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.article className="serviceCard glassCard" key={service.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                  <span className={`serviceIcon tone${index + 1}`}><Icon size={24} /></span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#packages" aria-label={`${service.title} package`}><ArrowRight size={18} /></a>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="projectsSection sectionContainer" id="projects">
          <SectionHeading eyebrow="Portfolio" title={t.projectsTitle} />
          <div className="projectGrid">
            {t.projects.map((project, index) => (
              <motion.article className={`projectCard project${index + 1}`} key={project.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#contact">View case <ArrowRight size={15} /></a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="metricsStrip sectionContainer" aria-label="Marketing results">
          <span className="eyebrow centerEyebrow">{t.resultsTitle}</span>
          <div className="metricsGrid">
            {t.metrics.map(([value, label], index) => {
              const Icon = metricIcons[index];
              return (
                <div className="metricItem" key={label}>
                  <span><Icon size={22} /></span>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="packagesSection sectionContainer" id="packages">
          <SectionHeading eyebrow="Deals" title={t.packagesTitle} subtitle={t.packagesSubtitle} />
          <div className="packageGrid">
            {t.packages.map((pack, index) => (
              <motion.article className={`packageCard ${index === 2 ? 'featuredPackage' : ''}`} key={pack.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.07 }}>
                {index === 2 && <span className="popularBadge">Best Value</span>}
                <h3>{pack.name}</h3>
                <p className="packageDescription">{pack.description}</p>
                <div className="priceLine">
                  <strong>{pack.price}</strong>
                  <span>{pack.cadence}</span>
                </div>
                <ul>
                  {pack.features.map((feature) => (
                    <li key={feature}><Check size={17} /> {feature}</li>
                  ))}
                </ul>
                <a href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(`${pack.name}: ${whatsappMessage}`)}`} target="_blank" rel="noreferrer">
                  {pack.cta} <ArrowRight size={16} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="testimonialsSection sectionContainer" id="testimonials">
          <SectionHeading eyebrow="Testimonials" title={t.testimonialsTitle} />
          <div className="testimonialGrid">
            {t.testimonials.map((testimonial, index) => (
              <motion.article className="testimonialCard" key={testimonial.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                <Quote size={24} />
                <p>{testimonial.quote}</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="responsivePreview sectionContainer" aria-label="Mobile preview">
          <div className="previewCopy">
            <span className="eyebrow">Responsive UX</span>
            <h2>Built mobile-first, refined for every screen.</h2>
            <p>
              The layout keeps Julie's brand premium on phones, tablets and desktop screens with fast sections, clear actions and an elegant bilingual experience.
            </p>
          </div>
          <div className="phoneMockup" aria-hidden="true">
            <div className="phoneTop"><Logo compact /><Menu size={19} /></div>
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h3>{t.hero.title}</h3>
            <p>{t.hero.subtitle}</p>
            <button>{t.hero.primary}</button>
            <div className="phonePortrait" />
            <h4>{t.about.title}</h4>
          </div>
        </section>
      </main>

      <footer className="siteFooter sectionContainer" id="contact">
        <div className="footerBrand">
          <Logo />
          <h2>{t.footer.headline}</h2>
          <p>{t.footer.body}</p>
          <div className="footerSocials">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={20} /></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={20} /></a>
            <a href={`mailto:${contact.email}`} aria-label="Email Julie"><Mail size={20} /></a>
          </div>
        </div>
        <div className="footerDetails">
          <h3>{contact.name}</h3>
          <p>{contact.role}</p>
          <p><MapPin size={16} /> {contact.location}</p>
          <p><Mail size={16} /> {contact.email}</p>
          <p><MessageCircle size={16} /> {contact.phoneDisplay}</p>
        </div>
        <div className="newsletterBox">
          <h3>Newsletter</h3>
          <p>{t.footer.newsletter}</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input aria-label="Email address" placeholder={t.footer.emailPlaceholder} />
            <button type="submit"><ArrowRight size={18} /></button>
          </form>
        </div>
      </footer>

      <FloatingWhatsApp number={contact.whatsappNumber} label={t.whatsapp} message={whatsappMessage} />
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="sectionHeading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
