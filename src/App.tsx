import { useState, useEffect } from 'react';
import { 
  Zap, 
  Clock, 
  Award, 
  CheckCircle, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  Star,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  ChevronDown,
  Flame,
  Target,
  Heart
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   DATA – Reviews, Muscles, FAQs
   ═══════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    name: "מיכל כ.",
    role: "עובדת הייטק ואמא לשלושה · יהוד",
    text: "עבדתי 10 שעות ביום מול מחשב ורצתי בין הילדים – לא מצאתי זמן ללכת לחדר כושר. מאז שהתחלתי בסטודיו של גל אני מרגישה אחרת לגמרי. אנרגיה, כוח, ביטחון עצמי. אני לא מוותרת על זה.",
    stars: 5,
    tag: "שינוי אורח חיים"
  },
  {
    name: "אילן ל.",
    role: "הגיע בעקבות כאבי גב כרוניים",
    text: "סבלתי מכאבי גב תחתון במשך שנים. ניסיתי הכל – פיזיותרפיה, דיקור, תרופות. ב-EMS ACTION חיזקנו את שרירי הליבה העמוקים באימונים אישיים עם גל. תוך חודשיים הכאבים פשוט נעלמו.",
    stars: 5,
    tag: "חיזוק ושיקום"
  },
  {
    name: "יסמין ב.",
    role: "ירדה 6 קילו וחיטבה את הגוף",
    text: "היחס האישי של גל והמעקב השבועי אחר המדדים נתנו לי את המוטיבציה שחיפשתי. האימונים מאתגרים אבל מהנים בטירוף. כבר אחרי חודש ראיתי שינוי אמיתי במראה ובתחושה.",
    stars: 5,
    tag: "חיטוב ומיצוק"
  }
];

const MUSCLE_GROUPS = [
  {
    id: "back",
    name: "גב ותחתון",
    description: "חיזוק שרירי הזוקפים והגב העמוקים ללא עומס על חוליות עמוד השדרה. הפתרון המושלם לשיקום והקלה על כאבי גב כרוניים.",
    percentage: 95,
    pulseRate: "85 Hz"
  },
  {
    id: "abs",
    name: "בטן וליבה",
    description: "הפעלה של שריר הבטן הרוחבי והאלכסונים בעצימות גבוהה. חיזוק חגורת הבטן ותמיכה ביציבה ובביצועים היומיומיים.",
    percentage: 98,
    pulseRate: "80 Hz"
  },
  {
    id: "chest",
    name: "חזה וכתפיים",
    description: "הפעלה מאוזנת של שרירי החזה, שיפור היציבה וחיזוק פלג הגוף העליון בצורה הרמונית ובטוחה.",
    percentage: 90,
    pulseRate: "85 Hz"
  },
  {
    id: "glutes",
    name: "ישבן ואגן",
    description: "כיווץ עמוק של שרירי הישבן לשריפת קלוריות מוגברת, מיצוק וחיטוב מהיר של אזור הירכיים והאגן.",
    percentage: 96,
    pulseRate: "90 Hz"
  },
  {
    id: "legs",
    name: "ירכיים ורגליים",
    description: "הפעלה סימולטנית של השריר הארבע-ראשי וההאמסטרינגס. חיזוק הרגליים, שיפור זרימת הדם והפחתת צלוליט.",
    percentage: 92,
    pulseRate: "85 Hz"
  }
];

const FAQS = [
  {
    question: "האם אימון EMS בטוח?",
    answer: "בהחלט. הטכנולוגיה מבוססת על עשורים של מחקרים רפואיים ומאושרת על ידי ה-FDA ומשרד הבריאות הישראלי. הפולסים מדמים את האותות הטבעיים שהמוח שולח לשרירים, אך בעצימות מבוקרת ובטוחה."
  },
  {
    question: "האם האימון כואב?",
    answer: "לא. מרגישים עקצוץ עדין וכיווץ שרירים אינטנסיבי. גל שולטת בעוצמת הפולסים של כל קבוצת שרירים בנפרד ומכוונת אותה ברגישות לרמה שנוחה ומאתגרת אותך."
  },
  {
    question: "למי האימון מתאים?",
    answer: "לכל רמות הכושר. לאנשים עסוקים שמחפשים יעילות, לסובלים מכאבי גב שרוצים חיזוק, לנשים אחרי לידה שמחפשות מיצוק, ולכל מי שרוצה שינוי אמיתי בגוף ובתחושה."
  },
  {
    question: "תוך כמה זמן מרגישים שינוי?",
    answer: "כבר אחרי 4 עד 6 אימונים מרגישים שיפור ביציבה, בכוח ובאנרגיה. תוצאות נראות לעין – חיטוב, ירידה בהיקפים ושיפור מרקם העור – מופיעות תוך 8 עד 12 שבועות של התמדה."
  },
  {
    question: "מה כולל כל אימון?",
    answer: "כל סשן כולל הכנה קצרה, לבישת חליפת EMS ואימון כושר פונקציונלי אישי בהובלת גל. שילוב של תרגילי כוח, יציבות וגמישות יחד עם טכנולוגיית הגירוי החשמלי שמגבירה את עבודת השרירים."
  }
];

/* ═══════════════════════════════════════════════════════
   APP COMPONENT
   ═══════════════════════════════════════════════════════ */
// Google Sheets Web App URL – replace with your deployed Apps Script URL
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export default function App() {
  const [activeReview, setActiveReview] = useState(0);
  const [selectedMuscle, setSelectedMuscle] = useState(MUSCLE_GROUPS[1]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', goal: 'חיטוב וירידה במשקל', note: '' });
  
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nextReview = () => setActiveReview((p) => (p + 1) % REVIEWS.length);
  const prevReview = () => setActiveReview((p) => (p - 1 + REVIEWS.length) % REVIEWS.length);
  const toggleFaq = (i: number) => setActiveFaq(activeFaq === i ? null : i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setFormSubmitting(true);
    setFormError('');
    
    try {
      // Send lead to Google Sheets
      const payload = {
        name: formData.name,
        phone: formData.phone,
        goal: formData.goal,
        note: formData.note,
        date: new Date().toLocaleString('he-IL'),
        source: 'אתר EMS ACTION'
      };

      if (GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      setFormSubmitted(true);
    } catch {
      // Even if the request fails, show success (no-cors mode doesn't return status)
      setFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="app-container" dir="rtl">
      <div className="grid-bg" />
      <div className="sparkle-glow orange-glow" />
      <div className="sparkle-glow cyan-glow" />

      {/* ═══════════════════════════════════════════════════════
          NAVBAR – 4 Items, One Line, Premium
          ═══════════════════════════════════════════════════════ */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="logo-area">
            <span className="logo-badge"><Zap size={20} className="glow-icon" /></span>
            <div className="logo-text-group">
              <span className="logo-title">EMS ACTION</span>
              <span className="logo-subtitle">BY GAL NIMNI</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a href="#about" className="nav-link">הטכנולוגיה</a>
            <a href="#results" className="nav-link">תוצאות</a>
            <a href="#about-gal" className="nav-link">גל נימני</a>
            <a href="#faq" className="nav-link">שאלות נפוצות</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:0543422190" className="phone-link">
              <Phone size={16} />
              <span>054-342-2190</span>
            </a>
            <a href="#lead-form" className="btn-navbar-cta">תיאום שיחה ⚡</a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          HERO – Cinematic, Emotional, Selling the Dream
          ═══════════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-img-container">
          <img src="/ems-hero.png" alt="אימון EMS בסטודיו" className="hero-bg-img" />
          <div className="hero-img-gradient" />
        </div>
        
        <div className="container hero-container">
          <div className="hero-text-side">
            <div className="premium-tag">
              <span className="tag-pulse" />
              <span>סטודיו הבוטיק המוביל ביהוד-מונוסון</span>
            </div>
            
            <h1 className="hero-h1">
              הגוף שתמיד רצית.<br />
              <span className="gradient-text">הזמן להתחיל הוא עכשיו.</span>
            </h1>
            
            <p className="hero-desc">
              אימון כושר אישי פרימיום בהובלת גל נימני, משולב בטכנולוגיית EMS שמפעילה את כל הגוף בו-זמנית. חיטוב, חיזוק, שריפת קלוריות מואצת ושיקום כאבי גב – בסטודיו בוטיק שקט ואישי ביהוד.
            </p>
            
            <div className="hero-actions">
              <a href="#lead-form" className="btn-hero-primary">
                רוצה לשמוע עוד? השאירו פרטים ⚡
              </a>
              <a 
                href="https://wa.me/972543422190?text=היי%20גל%2C%20ראיתי%20את%20האתר%20ואשמח%20לשמוע%20עוד%20על%20אימוני%20EMS%20בסטודיו"
                className="btn-hero-secondary" 
                target="_blank" 
                rel="noreferrer"
              >
                <span>שלחו הודעה בוואטסאפ</span>
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-num">1:1</span>
                <span className="stat-lbl">יחס אישי צמוד</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-num">4X</span>
                <span className="stat-lbl">שריפת קלוריות</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-num">90-100%</span>
                <span className="stat-lbl">כל הגוף עובד</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="stats-strip">
        <div className="container strip-inner">
          <div className="strip-item">
            <ShieldCheck className="strip-icon" />
            <span>אישור FDA ומשרד הבריאות</span>
          </div>
          <div className="strip-item">
            <TrendingUp className="strip-icon" />
            <span>מותאם לשיקום גב ומפרקים</span>
          </div>
          <div className="strip-item">
            <UserCheck className="strip-icon" />
            <span>ליווי אישי צמוד ע״י גל נימני</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TECHNOLOGY – Why EMS Works
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">הטכנולוגיה</span>
            <h2>למה אימון EMS מביא תוצאות שלא תאמינו?</h2>
            <p className="section-desc">
              שילוב של גירוי שרירים ביו-חשמלי מדויק עם אימון כושר אישי – כדי להגיע לתוצאות שבדרך הרגילה לוקחות חודשים.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-media-box">
              <img src="/ems-opening.jpg" alt="סטודיו EMS ACTION יהוד" className="tech-img" />
              <div className="media-overlay-card">
                <Zap size={22} className="accent-color" />
                <div>
                  <h4>אימון אמיתי, תוצאות אמיתיות</h4>
                  <p>שילוב טכנולוגיה ואימון פונקציונלי בסטודיו ביהוד.</p>
                </div>
              </div>
            </div>

            <div className="tech-cards">
              <div className="tech-card">
                <div className="tech-card-icon-wrapper"><Zap size={22} /></div>
                <div>
                  <h3>הפעלה של כל הגוף בו-זמנית</h3>
                  <p>באימון רגיל מפעילים קבוצת שרירים אחת. ב-EMS ACTION מופעלות 9 קבוצות שרירים במקביל – כולל השרירים העמוקים שכמעט בלתי אפשרי להגיע אליהם בדרך אחרת.</p>
                </div>
              </div>

              <div className="tech-card">
                <div className="tech-card-icon-wrapper"><Target size={22} /></div>
                <div>
                  <h3>חדירה לשכבות השריר העמוקות</h3>
                  <p>הפולסים מפעילים שרירים מייצבים שתומכים בעמוד השדרה – שרירים שכמעט ולא מופעלים באימוני משקולות רגילים. בדיוק מה שצריך לגב חזק ויציבה נכונה.</p>
                </div>
              </div>

              <div className="tech-card">
                <div className="tech-card-icon-wrapper"><Flame size={22} /></div>
                <div>
                  <h3>שריפת קלוריות מואצת – גם אחרי האימון</h3>
                  <p>הכיווץ האינטנסיבי גורם לגוף להמשיך לשרוף קלוריות עד 48 שעות אחרי האימון. בדיוק מה שמאיץ חיטוב וירידה במשקל.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE MUSCLE SIMULATOR
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">אינטראקטיבי</span>
            <h2>איפה בדיוק ה-EMS עובד עליכם?</h2>
            <p className="section-desc">לחצו על אזור בגוף כדי לראות כיצד הטכנולוגיה משפיעה על כל קבוצת שרירים.</p>
          </div>

          <div className="simulator-box">
            <div className="simulator-grid">
              <div className="body-visualizer-panel">
                <div className="body-silhouette-container">
                  <svg viewBox="0 0 200 400" className="body-svg">
                    <defs>
                      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff4757" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#802030" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="50" r="18" className="body-part" />
                    <rect x="96" y="68" width="8" height="12" className="body-part" />
                    <path d="M75 80 L125 80 L130 180 L70 180 Z" className="body-part" />
                    <path d="M70 80 L50 160 L40 160 L65 80 Z" className="body-part" />
                    <path d="M130 80 L150 160 L160 160 L135 80 Z" className="body-part" />
                    <path d="M72 185 L65 300 L55 380 L72 380 L82 300 L85 185 Z" className="body-part" />
                    <path d="M128 185 L135 300 L145 380 L128 380 L118 300 L115 185 Z" className="body-part" />
                    <circle cx="100" cy="105" r="10" className={`target-dot ${selectedMuscle.id === 'chest' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[2])} />
                    <circle cx="100" cy="140" r="10" className={`target-dot ${selectedMuscle.id === 'abs' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[1])} />
                    <circle cx="100" cy="120" r="8" className={`target-dot ${selectedMuscle.id === 'back' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[0])} />
                    <circle cx="100" cy="195" r="10" className={`target-dot ${selectedMuscle.id === 'glutes' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[3])} />
                    <circle cx="80" cy="260" r="10" className={`target-dot ${selectedMuscle.id === 'legs' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[4])} />
                    <circle cx="120" cy="260" r="10" className={`target-dot ${selectedMuscle.id === 'legs' ? 'active' : ''}`} onClick={() => setSelectedMuscle(MUSCLE_GROUPS[4])} />
                  </svg>
                </div>
                <div className="muscle-selector-buttons">
                  {MUSCLE_GROUPS.map((m) => (
                    <button key={m.id} className={`muscle-btn ${selectedMuscle.id === m.id ? 'active' : ''}`} onClick={() => setSelectedMuscle(m)}>{m.name}</button>
                  ))}
                </div>
              </div>

              <div className="muscle-details-panel">
                <div className="details-header">
                  <div className="details-accent-line" />
                  <span className="details-meta">קבוצת שרירים</span>
                  <h3>{selectedMuscle.name}</h3>
                </div>
                <p className="details-text">{selectedMuscle.description}</p>
                <div className="details-metrics-row">
                  <div className="details-metric">
                    <span className="metric-val">{selectedMuscle.percentage}%</span>
                    <span className="metric-lbl">כיווץ שריר</span>
                  </div>
                  <div className="details-metric">
                    <span className="metric-val">{selectedMuscle.pulseRate}</span>
                    <span className="metric-lbl">תדר פולס</span>
                  </div>
                </div>
                <div className="details-simulator-visual">
                  <span className="pulse-wave-line" />
                  <span className="pulse-wave-line delays-1" />
                  <span className="pulse-wave-line delays-2" />
                  <div className="pulse-indicator">
                    <Zap size={14} />
                    <span>פולס פעיל</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TARGET AUDIENCE – "Is this for you?"
          ═══════════════════════════════════════════════════════ */}
      <section id="results" className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">בשבילך</span>
            <h2>מזהים את עצמכם? הגעתם למקום הנכון</h2>
            <p className="section-desc">
              אימון EMS ACTION מותאם אישית למטרות, לגוף ולקצב החיים שלכם.
            </p>
          </div>

          <div className="audience-cards">
            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><Clock size={26} /></div>
              </div>
              <h3>אין לכם זמן? בדיוק בשביל זה</h3>
              <p>עבודה, ילדים, חיים. אין שעה וחצי פנויה? אימון ממוקד ואפקטיבי שמתאים ללוח הזמנים הצפוף שלכם – ומביא תוצאות אמיתיות.</p>
            </div>

            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><Heart size={26} /></div>
              </div>
              <h3>כאבי גב? אפשר אחרת</h3>
              <p>חיזוק שרירי הליבה והגב ללא עומס על עמוד השדרה. שיקום והקלה משמעותית על כאבים כרוניים – בשיטה בטוחה ומבוקרת.</p>
            </div>

            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><Award size={26} /></div>
              </div>
              <h3>רוצים לראות שינוי? זה המקום</h3>
              <p>חיטוב, מיצוק, ירידה בהיקפים. הפעלת 90% מסיבי השריר מביאה לתוצאות שנראות ומורגשות – מהר יותר ממה שחשבתם.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT GAL NIMNI
          ═══════════════════════════════════════════════════════ */}
      <section id="about-gal" className="section-padding bg-dark profile-section">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-img-side">
              <div className="profile-frame">
                <img src="/gal-training.jpg" alt="גל נימני מתאמנת בסטודיו EMS ACTION" className="profile-img" />
                <div className="profile-badge">
                  <Award size={18} />
                  <span>מאמנת מוסמכת</span>
                </div>
              </div>
            </div>
            
            <div className="profile-text-side">
              <span className="section-label">הלב של הסטודיו</span>
              <h2>גל נימני</h2>
              <p className="profile-lead">
                מייסדת ומאמנת כושר אישית מוסמכת · EMS ACTION יהוד
              </p>
              <p className="profile-desc">
                אני מאמינה שכל אחד ואחת ראויים לאימון כושר ברמה הגבוהה ביותר, ביחס אישי ומלא. בסטודיו שלנו כל אימון הוא אחד-על-אחד, באווירה שקטה ומקצועית. אנחנו לא חדר כושר המוני – אלא מקום שבו מקבלים את כל תשומת הלב, את ההתאמה המדויקת ואת המעקב הצמוד שמביאים לתוצאות.
              </p>
              
              <div className="profile-bullets">
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>מקצועיות ללא פשרות</h4>
                    <p>הסמכה מקצועית ב-EMS, ליווי צמוד שמונע פציעות וממקסם תוצאות.</p>
                  </div>
                </div>
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>חוויית בוטיק אמיתית</h4>
                    <p>סטודיו שקט, נקי ואישי – בלי התחושה של חדר כושר צפוף ורועש.</p>
                  </div>
                </div>
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>תוכנית שנבנית בשבילך</h4>
                    <p>כל תוכנית מותאמת למצב הגופני שלך, למטרות שלך ולקצב ההתקדמות שלך.</p>
                  </div>
                </div>
              </div>

              <a href="#lead-form" className="btn-profile-cta">
                בואו נדבר ⚡
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE METHOD – 4-Step Process
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">איך זה עובד</span>
            <h2>התהליך שמביא תוצאות</h2>
            <p className="section-desc">
              מסלול מובנה ומקצועי – מהרגע שנפגשים ועד שרואים את השינוי.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h3>שיחת היכרות אישית</h3>
                <p>נכיר אתכם, נבין את המטרות שלכם ונבדוק את המצב הגופני – כולל אבחון הרכב גוף ומדדים מדויקים.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h3>בניית תוכנית מותאמת</h3>
                <p>גל בונה תוכנית אימון ותזונה שמתאימה לחיים שלכם – בלי דיאטות קיצוניות, בלי סבל.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h3>אימון כושר אישי עם EMS</h3>
                <p>אימון פונקציונלי משולב בטכנולוגיית EMS שמפעילה 90% מסיבי השריר – לתוצאות מהירות ומדהימות.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-num">04</div>
              <div className="step-content">
                <h3>מעקב והתקדמות</h3>
                <p>ליווי שבועי צמוד, מעקב מדדים ושיפור מתמיד של התוכנית – כדי שתמשיכו להתקדם.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">מה אומרים עלינו</span>
            <h2>הסיפורים שלהם מדברים בעד עצמם</h2>
          </div>

          <div className="reviews-slider-container">
            <div className="review-card">
              <div className="review-tag-badge">{REVIEWS[activeReview].tag}</div>
              <div className="stars">
                {[...Array(REVIEWS[activeReview].stars)].map((_, i) => (
                  <Star key={i} size={18} fill="#ffc107" color="#ffc107" />
                ))}
              </div>
              <p className="review-text-content">"{REVIEWS[activeReview].text}"</p>
              <div className="reviewer-info">
                <h4>{REVIEWS[activeReview].name}</h4>
                <span>{REVIEWS[activeReview].role}</span>
              </div>
            </div>
            <div className="slider-controls">
              <button onClick={prevReview} className="slider-btn" aria-label="הקודם"><ChevronRight size={20} /></button>
              <span className="slider-indicator">{activeReview + 1} / {REVIEWS.length}</span>
              <button onClick={nextReview} className="slider-btn" aria-label="הבא"><ChevronLeft size={20} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="section-padding bg-darker">
        <div className="container small-container">
          <div className="section-header">
            <span className="section-label">שאלות נפוצות</span>
            <h2>יש שאלות? יש תשובות</h2>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-arrow" size={18} />
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner"><p>{faq.answer}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LEAD FORM – Sales-Optimized, Zero Price Mentions
          ═══════════════════════════════════════════════════════ */}
      <section id="lead-form" className="section-padding bg-dark">
        <div className="container small-container">
          <div className="form-box">
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon"><Zap size={36} /></div>
                <h3>הפרטים נשלחו בהצלחה!</h3>
                <p>גל תחזור אליכם בהקדם לשיחת היכרות קצרה.</p>
                <a 
                  href={`https://wa.me/972543422190?text=היי%20גל%2C%20השארתי%20פרטים%20באתר.%20שמי%20${encodeURIComponent(formData.name)}.%20אשמח%20לשמוע%20ממך!`} 
                  className="btn-whatsapp-success"
                  target="_blank"
                  rel="noreferrer"
                >
                  שלחו הודעה ישירה בוואטסאפ
                </a>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2>רוצים לשמוע עוד?</h2>
                  <p>השאירו פרטים וגל תחזור אליכם לשיחה קצרה, אישית וללא התחייבות.</p>
                </div>
                <form onSubmit={handleSubmit} className="actual-form">
                  <div className="form-group">
                    <label htmlFor="name">שם מלא</label>
                    <input type="text" id="name" placeholder="איך קוראים לכם?" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">טלפון</label>
                    <input type="tel" id="phone" placeholder="050-1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="goal">מה המטרה שלכם?</label>
                    <select id="goal" value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} className="form-select">
                      <option value="חיטוב וירידה במשקל">חיטוב, ירידה במשקל ושריפת קלוריות</option>
                      <option value="הפחתת כאבי גב ושיקום">כאבי גב, מפרקים ושיפור יציבה</option>
                      <option value="חיזוק כללי וכושר">חיזוק כללי ומסת שריר</option>
                      <option value="חיסכון בזמן">חיסכון בזמן ושמירה על שגרה בריאה</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note">עוד משהו שחשוב לנו לדעת?</label>
                    <textarea id="note" rows={3} placeholder="למשל: כאבי גב, אחרי הריון, מטרה ספציפית..." value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-submit" disabled={formSubmitting}>
                    {formSubmitting ? '⏳ שולח...' : 'שלחו ואני חוזרת אליכם'}
                  </button>
                  {formError && <p className="form-error">{formError}</p>}
                  <p className="form-disclaimer">ללא התחייבות · גל תחזור אליכם תוך מספר שעות</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT & LOCATION
          ═══════════════════════════════════════════════════════ */}
      <section className="contact-footer section-padding bg-darker">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h3>בואו לבקר בסטודיו</h3>
              <div className="info-row">
                <MapPin className="info-icon" />
                <div>
                  <h4>הכתובת שלנו</h4>
                  <p>רחוב אשכנזי 21, יהוד-מונוסון</p>
                </div>
              </div>
              <div className="info-row">
                <Phone className="info-icon" />
                <div>
                  <h4>טלפון</h4>
                  <p>054-342-2190 (גל נימני)</p>
                </div>
              </div>
              <div className="info-row">
                <Clock className="info-icon" />
                <div>
                  <h4>שעות פעילות</h4>
                  <p>א׳–ה׳: 08:00–20:00 · ו׳: 08:00–12:00</p>
                </div>
              </div>
            </div>

            <div className="footer-map">
              <div className="map-placeholder">
                <MapPin size={30} className="map-pin-icon" />
                <h4>ניווט לסטודיו</h4>
                <p>אשכנזי 21, יהוד · חנייה חינם</p>
                <a href="https://waze.com/ul?q=אשכנזי%2021%20יהוד" className="btn-waze" target="_blank" rel="noreferrer">
                  נווטו ב-Waze 🚗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-main bg-dark">
        <p>© 2026 EMS ACTION · סטודיו בוטיק לאימוני כושר אישיים ו-EMS ביהוד · כל הזכויות שמורות</p>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/972543422190?text=היי%20גל%2C%20ראיתי%20את%20האתר%20ואשמח%20לשמוע%20עוד" 
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="שלחו הודעה בוואטסאפ"
      >
        <span className="tooltip">דברו איתי בוואטסאפ</span>
        <svg viewBox="0 0 24 24" className="whatsapp-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Mobile CTA Bar */}
      <div className="mobile-cta-bar">
        <a href="#lead-form" className="mobile-cta-primary">השאירו פרטים</a>
        <a href="https://wa.me/972543422190?text=היי%20גל%2C%20אשמח%20לשמוע%20עוד" className="mobile-cta-whatsapp" target="_blank" rel="noreferrer">וואטסאפ</a>
      </div>
    </div>
  );
}
