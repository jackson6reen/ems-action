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
  ChevronDown
} from 'lucide-react';

// Reviews Data
const REVIEWS = [
  {
    name: "מיכל כהן",
    role: "עובדת הייטק ואמא לשלושה (יהוד)",
    text: "בתור מישהי שעובדת 10 שעות ביום מול מחשב ורצה בין הילדים, לא מצאתי זמן ללכת לחדר כושר. אימון ה-EMS בסטודיו של גל שינה לי את החיים. 20 דקות פעם בשבוע, האימון הכי ממוקד ויעיל שחוויתי. מומלץ ביותר!",
    stars: 5,
    tag: "חיסכון בזמן"
  },
  {
    name: "אילן לוי",
    role: "הגיע לסטודיו בעקבות כאבי גב כרוניים",
    text: "סבלתי מכאבי גב תחתון במשך שנים. ניסיתי פיזיותרפיה, דיקור ומה לא. ב-EMS Action חיזקנו את שרירי הליבה העמוקים באימונים ממוקדים 1-על-1 עם גל. היום, חודשיים אחרי, הכאבים פשוט נעלמו. אין מילים להודות.",
    stars: 5,
    tag: "שיקום גב"
  },
  {
    name: "יסמין ברק",
    role: "ירדה 6 קילו וחיטבה את הגוף",
    text: "היחס האישי של גל והמעקב השבועי אחר אחוזי השומן והמדדים נתנו לי את המוטיבציה שהייתה חסרה לי. האימונים אינטנסיביים, מאתגרים אבל כיפיים בטירוף. מרגישים את השרירים עובדים בכל שנייה!",
    stars: 5,
    tag: "חיטוב וירידה במשקל"
  }
];

// Muscle Stimulation Data
const MUSCLE_GROUPS = [
  {
    id: "back",
    name: "גב ותחתון",
    description: "חיזוק שרירי הזוקפים והגב העמוקים ללא עומס על חוליות עמוד השדרה. הפתרון המושלם לשיקום והקלה על כאבי גב כרוניים ויציבה כפופה.",
    percentage: 95,
    pulseRate: "85 Hz"
  },
  {
    id: "abs",
    name: "בטן וליבה",
    description: "הפעלה בעצימות גבוהה של שריר הבטן הרוחבי (Transversus abdominis) והאלכסונים. מחזק את חגורת הבטן ומספק תמיכה קריטית ליציבה.",
    percentage: 98,
    pulseRate: "80 Hz"
  },
  {
    id: "chest",
    name: "חזה וכתפיים",
    description: "אימון EMS מפעיל את שרירי החזה באופן מאוזן ויעיל, משפר את היציבה ומסייע בעיצוב וחיזוק פלג הגוף העליון בצורה הרמונית.",
    percentage: 90,
    pulseRate: "85 Hz"
  },
  {
    id: "glutes",
    name: "ישבן ואגן",
    description: "כיווץ עמוק ויעיל במיוחד של שרירי הישבן (Gluteus maximus). מעודד שריפת קלוריות מוגברת, מיצוק וחיטוב מהיר של אזור הירכיים והאגן.",
    percentage: 96,
    pulseRate: "90 Hz"
  },
  {
    id: "legs",
    name: "ירכיים ורגליים",
    description: "הפעלה סימולטנית של השריר הארבע-ראשי וההאמסטרינגס. מחזק את הרגליים, משפר את זרימת הדם ומסייע בהפחתת צלוליט.",
    percentage: 92,
    pulseRate: "85 Hz"
  }
];

// FAQs Data
const FAQS = [
  {
    question: "האם אימון EMS בטוח לבריאות?",
    answer: "כן, בהחלט. הטכנולוגיה מבוססת על עשורים של מחקרים רפואיים ומאושרת על ידי ה-FDA ומשרד הבריאות הישראלי. הפולסים החשמליים של המכשיר מדמים במדויק את האותות החשמליים שהמוח שולח באופן טבעי לשריר כדי לכווץ אותו, אך בעצימות גבוהה ומבוקרת יותר, ללא כל סיכון."
  },
  {
    question: "האם זה כואב?",
    answer: "לא, האימון אינו כואב. הוא מורגש כעקצוץ עדין או כיווץ אינטנסיבי של השרירים. גל נימני, כמאמנת מוסמכת, שולטת בעוצמת הפולסים של כל קבוצת שרירים בנפרד במהלך האימון, ומכוונת אותה בדיוק לרמה שנוחה ומאתגרת אותך באופן אישי."
  },
  {
    question: "למה האימון נחשב לקצר ואפקטיבי כל כך?",
    answer: "אימוני הבוטיק שלנו משלבים ליווי אישי ממוקד יחד עם טכנולוגיית ה-EMS ACTION. בזמן אימון כושר רגיל המוח מפעיל רק חלק קטן מסיבי השריר, בעוד שגירוי ה-EMS הפעיל (הנמשך כ-20 דקות מתוך הסשן המלא) מפעיל כ-90% מסיבי השריר בגוף בו-זמנית, כולל השרירים המייצבים והעמוקים ביותר. זה מאפשר להגיע לאפקט אימון מירבי ועמוק ללא צורך בשעות ארוכות בחדר הכושר."
  },
  {
    question: "תוך כמה זמן אראה תוצאות?",
    answer: "כבר לאחר 4-6 אימונים תתחילו להרגיש שיפור משמעותי ביציבה, בחוזק הכללי והקלה בכאבי גב. תוצאות ויזואליות של חיטוב הגוף, ירידה בהיקפים ושיפור מרקם העור יופיעו לרוב תוך 8-12 שבועות של התמדה שבועית ותזונה מאוזנת."
  }
];

export default function App() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [selectedMuscle, setSelectedMuscle] = useState(MUSCLE_GROUPS[1]); // abs as default
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  
  // Header scrolled state for premium sticky navbar design
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="app-container" dir="rtl">
      
      {/* Dynamic Grid Background Overlay */}
      <div className="grid-bg"></div>

      {/* Floating Sparkles Behind Content */}
      <div className="sparkle-glow orange-glow"></div>
      <div className="sparkle-glow cyan-glow"></div>

      {/* Header / Premium Sticky Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="logo-area">
            <span className="logo-badge">
              <Zap size={20} className="glow-icon" />
            </span>
            <div className="logo-text-group">
              <span className="logo-title">EMS ACTION</span>
              <span className="logo-subtitle">BY GAL NIMNI</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a href="#about" className="nav-link">הטכנולוגיה</a>
            <a href="#simulator" className="nav-link">סימולטור השרירים</a>
            <a href="#benefits" className="nav-link">קהל יעד</a>
            <a href="#about-gal" className="nav-link">המאמנת גל</a>
            <a href="#pricing" className="nav-link">תוכניות</a>
            <a href="#faq" className="nav-link">שאלות נפוצות</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:0543422190" className="phone-link">
              <Phone size={18} />
              <span>054-3422190</span>
            </a>
            <a href="#lead-form" className="btn-navbar-cta">
              חבילת התנעה ⚡
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-img-container">
          <img src="/ems-hero.png" alt="EMS Fitness Training" className="hero-bg-img" />
          <div className="hero-img-gradient"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-text-side">
            <div className="premium-tag">
              <span className="tag-pulse"></span>
              <span>סטודיו הבוטיק המוביל ביהוד-מונוסון</span>
            </div>
            
            <h1 className="hero-h1">
              אימון כושר אישי פרימיום<br />
              משולב טכנולוגיית <span className="gradient-text">EMS ACTION</span>
            </h1>
            
            <p className="hero-desc">
              שילוב מנצח של אימון כושר פונקציונלי ממוקד וטכנולוגיית EMS ACTION מתקדמת לשריפת קלוריות מואצת וחיזוק הליבה. ליווי אישי 1-על-1 בהובלת גל נימני, כולל אבחון הרכב גוף ובניית תוכנית תזונה לשינוי גופני מובטח.
            </p>
            
            <div className="hero-actions">
              <a href="#lead-form" className="btn-hero-primary">
                קבלו את חבילת ההתנעה ב-₪99 בלבד ⚡
              </a>
              <a href="https://wa.me/972543422190?text=היי%20גל%2C%20אשמח%20לקבל%20פרטים%20על%20חבילת%20ההתנעה%20ב-99%20ש%22ח%20בסטודיו%20EMS%20ACTION" className="btn-hero-secondary" target="_blank" rel="noreferrer">
                <span>שיחת ייעוץ בוואטסאפ</span>
              </a>
            </div>

            <div className="offer-callout-hero">
              <span className="offer-fire">🔥</span>
              <span><strong>הצעה שלא ניתן לסרב לה:</strong> אימון היכרות פרימיום + אבחון הרכב גוף + תוכנית תזונה ב-<strong>₪99 בלבד</strong> (במקום ₪350). פלוס התחייבות לתוצאות ב-30 יום!</span>
            </div>
            
            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-num">3X</span>
                <span className="stat-lbl">קצב שריפת קלוריות</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <span className="stat-num">90%</span>
                <span className="stat-lbl">הפעלת סיבי שריר</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <span className="stat-num">1:1</span>
                <span className="stat-lbl">אימון אישי צמוד</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <div className="stats-strip">
        <div className="container strip-inner">
          <div className="strip-item">
            <ShieldCheck className="strip-icon" />
            <span>אישור רפואי FDA ומשרד הבריאות</span>
          </div>
          <div className="strip-item">
            <TrendingUp className="strip-icon" />
            <span>מתאים לשיקום גב ומפרקים</span>
          </div>
          <div className="strip-item">
            <UserCheck className="strip-icon" />
            <span>ליווי מקצועי צמוד ע״י גל נימני</span>
          </div>
        </div>
      </div>

      {/* The Tech Behind EMS Section */}
      <section id="about" className="section-padding bg-darker relative-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">טכנולוגיה מנצחת</span>
            <h2>איך אימון קצר ואפקטיבי שווה ל-4 שעות בחדר כושר?</h2>
            <p className="section-desc">
              אימון EMS ACTION משלב גירוי שרירים ביו-חשמלי עדין במהלך אימון כושר פונקציונלי מונחה.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-media-box">
              <img src="/ems-plank.jpg" alt="אימון EMS בסטודיו" className="tech-img" />
              <div className="media-overlay-card">
                <Zap size={24} className="accent-color" />
                <div>
                  <h4>אימון כוח וחיזוק מעשי</h4>
                  <p>שילוב עצימות ביו-חשמלית עם תרגילים פונקציונליים בסטודיו ביהוד.</p>
                </div>
              </div>
            </div>

            <div className="tech-cards">
              <div className="tech-card">
                <div className="tech-card-icon-wrapper">
                  <Zap size={24} />
                </div>
                <div>
                  <h3>עבודה על כל הגוף במקביל</h3>
                  <p>באימון רגיל אנו מפעילים קבוצת שרירים אחת בכל פעם. ב-EMS ACTION אנו מפעילים 9 קבוצות שרירים עיקריות בו-זמנית. רכיב הגירוי החשמלי הפעיל נמשך כ-20 דקות וממקסם את עבודת השריר בפרק זמן קצר.</p>
                </div>
              </div>

              <div className="tech-card">
                <div className="tech-card-icon-wrapper">
                  <Clock size={24} />
                </div>
                <div>
                  <h3>הגעה לסיבים העמוקים</h3>
                  <p>הפולסים מגיעים לעומק השריר ומפעילים שרירים מייצבים (כמו אלו התומכים בעמוד השדרה) שכמעט ולא מופעלים באימוני משקולות סטנדרטיים.</p>
                </div>
              </div>

              <div className="tech-card">
                <div className="tech-card-icon-wrapper">
                  <Award size={24} />
                </div>
                <div>
                  <h3>שריפת קלוריות מוגברת (Afterburn)</h3>
                  <p>בשל הכיווץ האינטנסיבי, הגוף ממשיך לשרוף קלוריות בקצב מוגבר עד 48 שעות לאחר סיום האימון, מה שמאיץ ירידה במשקל וחיטוב.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Muscle Simulator (10,000 NIS custom wow factor) */}
      <section id="simulator" className="section-padding bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">אינטראקטיבי</span>
            <h2>סימולטור השפעת פולס ה-EMS</h2>
            <p className="section-desc">לחץ על אזור בגוף כדי לראות כיצד אימון ה-EMS משפיע עליו ומסייע לחיזוקו.</p>
          </div>

          <div className="simulator-box">
            <div className="simulator-grid">
              
              {/* Graphic body sidebar */}
              <div className="body-visualizer-panel">
                <div className="body-silhouette-container">
                  {/* Human Body SVG Wireframe */}
                  <svg viewBox="0 0 200 400" className="body-svg">
                    <defs>
                      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d2c4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#005080" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    {/* Head */}
                    <circle cx="100" cy="50" r="18" className="body-part" />
                    {/* Neck */}
                    <rect x="96" y="68" width="8" height="12" className="body-part" />
                    {/* Torso */}
                    <path d="M75 80 L125 80 L130 180 L70 180 Z" className="body-part" />
                    {/* Arms */}
                    <path d="M70 80 L50 160 L40 160 L65 80 Z" className="body-part" />
                    <path d="M130 80 L150 160 L160 160 L135 80 Z" className="body-part" />
                    {/* Legs */}
                    <path d="M72 185 L65 300 L55 380 L72 380 L82 300 L85 185 Z" className="body-part" />
                    <path d="M128 185 L135 300 L145 380 L128 380 L118 300 L115 185 Z" className="body-part" />

                    {/* Interactive dots overlay */}
                    {/* Chest dot */}
                    <circle 
                      cx="100" 
                      cy="105" 
                      r="10" 
                      className={`target-dot ${selectedMuscle.id === 'chest' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[2])}
                    />
                    {/* Abs dot */}
                    <circle 
                      cx="100" 
                      cy="140" 
                      r="10" 
                      className={`target-dot ${selectedMuscle.id === 'abs' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[1])}
                    />
                    {/* Back dot */}
                    <circle 
                      cx="100" 
                      cy="120" 
                      r="8" 
                      className={`target-dot ${selectedMuscle.id === 'back' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[0])}
                    />
                    {/* Glutes dot */}
                    <circle 
                      cx="100" 
                      cy="195" 
                      r="10" 
                      className={`target-dot ${selectedMuscle.id === 'glutes' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[3])}
                    />
                    {/* Legs dot */}
                    <circle 
                      cx="80" 
                      cy="260" 
                      r="10" 
                      className={`target-dot ${selectedMuscle.id === 'legs' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[4])}
                    />
                    <circle 
                      cx="120" 
                      cy="260" 
                      r="10" 
                      className={`target-dot ${selectedMuscle.id === 'legs' ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(MUSCLE_GROUPS[4])}
                    />
                  </svg>
                </div>
                
                {/* Visualizer muscle selector buttons */}
                <div className="muscle-selector-buttons">
                  {MUSCLE_GROUPS.map((m) => (
                    <button 
                      key={m.id}
                      className={`muscle-btn ${selectedMuscle.id === m.id ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(m)}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail display side panel */}
              <div className="muscle-details-panel">
                <div className="details-header">
                  <div className="details-accent-line"></div>
                  <span className="details-meta">קבוצת שרירים שנבחרה</span>
                  <h3>{selectedMuscle.name}</h3>
                </div>
                
                <p className="details-text">{selectedMuscle.description}</p>
                
                <div className="details-metrics-row">
                  <div className="details-metric">
                    <span className="metric-val">{selectedMuscle.percentage}%</span>
                    <span className="metric-lbl">רמת כיווץ שריר</span>
                  </div>
                  <div className="details-metric">
                    <span className="metric-val">{selectedMuscle.pulseRate}</span>
                    <span className="metric-lbl">תדר פולס אופטימלי</span>
                  </div>
                </div>

                <div className="details-simulator-visual">
                  <span className="pulse-wave-line"></span>
                  <span className="pulse-wave-line delays-1"></span>
                  <span className="pulse-wave-line delays-2"></span>
                  <div className="pulse-indicator">
                    <Zap size={16} />
                    <span>סימולציית פולס פעילה</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="benefits" className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">קהל יעד</span>
            <h2>למי האימון מתאים?</h2>
            <p className="section-desc">
              אימון ה-EMS ACTION של גל נימני מותאם אישית למטרות ולמצב הבריאותי שלך.
            </p>
          </div>

          <div className="audience-cards">
            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><Clock size={28} /></div>
              </div>
              <h3>אנשים עסוקים שאין להם זמן</h3>
              <p>אם המשרה שלכם עמוסה, הילדים דורשים את שלהם ואין לכם שעה וחצי לפנות שלוש פעמים בשבוע – אימונים ממוקדים וקצרים המשלבים טכנולוגיה מתקדמת יתנו לכם את הפתרון המושלם בזמן מינימלי.</p>
            </div>

            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><TrendingUp size={28} /></div>
              </div>
              <h3>סובלים מכאבי גב וצוואר</h3>
              <p>הפולסים מחזקים את השרירים המקיפים את עמוד השדרה ללא שום עומס על הדיסקים והחוליות, ועוזרים להחזיר את היציבה הנכונה ולמנוע כאב.</p>
            </div>

            <div className="audience-card">
              <div className="audience-img-wrapper">
                <div className="audience-icon"><Award size={28} /></div>
              </div>
              <h3>מעוניינים בחיטוב ומיצוק מהיר</h3>
              <p>אידיאלי לאחר הריונות, ירידה במשקל או כהשלמה לכושר קיים. הפעלה של 90% מסיבי השריר מביאה לחיזוק שרירים ומיצוק העור במהירות שיא.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Gal Nimni & Studio Section */}
      <section id="about-gal" className="section-padding bg-darker profile-section">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-img-side">
              <div className="profile-frame">
                <img src="/ems-opening.jpg" alt="גל נימני - פתיחת סטודיו EMS ACTION" className="profile-img" />
                <div className="profile-badge">
                  <Award size={20} />
                  <span>פתיחה חגיגית 🥂</span>
                </div>
              </div>
            </div>
            
            <div className="profile-text-side">
              <span className="section-label">הלב של הסטודיו</span>
              <h2>גל נימני – המאמנת האישית שלך</h2>
              <p className="profile-lead">
                נעים להכיר, אני גל נימני, מייסדת ומאמנת כושר מוסמכת בסטודיו הבוטיק EMS ACTION ביהוד.
              </p>
              <p className="profile-desc">
                החזון שלי הוא להנגיש את מהפכת ה-EMS ACTION בצורה המקצועית והאישית ביותר. בסטודיו שלנו, כל אימון הוא 1-על-1 באווירה בוטיקית ושקטה. אנו לא עוד חדר כושר המוני – אנו מעניקים לך ליווי אישי צמוד, התאמה מדויקת של עוצמת המכשיר לכל קבוצת שרירים, ומעקב מדדים שבועי כדי להבטיח תוצאות מקסימליות בזמן קצר.
              </p>
              
              <div className="profile-bullets">
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>מקצועיות ללא פשרות</h4>
                    <p>הסמכת EMS מקצועית וליווי צמוד המונע פציעות וממקסם את עבודת השריר.</p>
                  </div>
                </div>
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>חוויית סטודיו בוטיק</h4>
                    <p>אימון שקט וממוקד, ללא רעש והמוניות של מכוני כושר רגילים.</p>
                  </div>
                </div>
                <div className="bullet-item">
                  <CheckCircle size={18} className="accent-color" />
                  <div>
                    <h4>התאמה למטרות רפואיות וחיטוב</h4>
                    <p>פתרונות שיקום גב, חיזוק שרירי ליבה וחיטוב מואץ בשיטה בטוחה ומבוקרת.</p>
                  </div>
                </div>
              </div>

              <a href="#lead-form" className="btn-profile-cta">
                תיאום אימון ניסיון איתי ⚡
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages Section */}
      <section id="pricing" className="section-padding bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">חבילות הצטרפות</span>
            <h2>ההשקעה בגוף שלך</h2>
            <p className="section-desc">ליווי אישי ממוקד תוצאות. בחר את המסלול המתאים לך.</p>

            <div className="toggle-container">
              <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>אימון בודד / כרטיסייה</span>
              <button 
                className={`toggle-switch ${isYearly ? 'active' : ''}`} 
                onClick={() => setIsYearly(!isYearly)}
              >
                <span className="toggle-handle"></span>
              </button>
              <span className={`toggle-label ${isYearly ? 'active' : ''}`}>מנוי חודשי קבוע (משתלם)</span>
            </div>
          </div>

          {/* Irresistible Kickstart Offer Callout */}
          <div className="kickstart-offer-box">
            <div className="offer-badge-glow">הצעה מיוחדת לזמן מוגבל</div>
            <div className="kickstart-offer-content">
              <div className="offer-text">
                <h3>חבילת התנעה לשינוי גופני מובטח ב-30 יום</h3>
                <p>פגישת אבחון הרכב גוף מקיף + בניית אסטרטגיית תזונה + אימון היכרות אישי 1-על-1 בקליניקה ביהוד בהובלת גל נימני.</p>
                <div className="guarantee-tag">
                  <ShieldCheck size={16} />
                  <span>התחייבות לתוצאות: לא ראית שינוי תוך 30 יום? החזר כספי מלא!</span>
                </div>
              </div>
              <div className="offer-price-area">
                <div className="old-price">₪350</div>
                <div className="new-price">
                  <span className="price-symbol">₪</span>
                  <span className="price-num">99</span>
                </div>
                <p className="price-terms">חד-פעמי לפגישת ההיכרות</p>
                <a href="#lead-form" className="btn-offer-cta">תיאום פגישה ב-₪99 בלבד</a>
              </div>
            </div>
          </div>

          <div className="pricing-grid">
            
            {/* Standard Package */}
            <div className="pricing-card">
              <h3>חבילת חיטוב וכושר שבועי</h3>
              <div className="price-display">
                <span className="price-number">{isYearly ? "₪135" : "₪160"}</span>
                <span className="price-period">/ אימון</span>
              </div>
              <p className="price-sub">מתאים למי שרוצה לשלב כושר אפקטיבי בשגרה שבועית</p>
              
              <div className="price-divider"></div>
              
              <ul className="price-features">
                <li><CheckCircle size={16} /> אימון אישי 1-על-1 בשיטה ההיברידית</li>
                <li><CheckCircle size={16} /> התאמת עוצמת גירוי אישית לכל שריר</li>
                <li><CheckCircle size={16} /> מעקב הרכב גוף שבועי (אחוזי שומן/שריר)</li>
                <li><CheckCircle size={16} /> גישה לתוכנית הבית שלנו לתוצאות מהירות</li>
                <li><CheckCircle size={16} /> גמישות בתיאום שעות האימון</li>
              </ul>
              
              <a href="#lead-form" className="btn-pricing">תיאום פגישת היכרות</a>
            </div>

            {/* Premium Package */}
            <div className="pricing-card premium">
              <div className="pricing-badge">מומלץ לתוצאות</div>
              <h3>חבילת שיקום וכאבי גב</h3>
              <div className="price-display">
                <span className="price-number">{isYearly ? "₪155" : "₪180"}</span>
                <span className="price-period">/ אימון</span>
              </div>
              <p className="price-sub">מסלול משולב לחיזוק שרירים עמוקים והעלמת כאבים</p>
              
              <div className="price-divider"></div>
              
              <ul className="price-features">
                <li><CheckCircle size={16} /> דגש מיוחד על חיזוק זוקפי גב ושרירי ליבה</li>
                <li><CheckCircle size={16} /> תוכנית אימונים אישית למניעת עומס</li>
                <li><CheckCircle size={16} /> טכנולוגיית EMS להקלה מיידית</li>
                <li><CheckCircle size={16} /> מעקב יציבה והרכב גוף מתמשך</li>
                <li><CheckCircle size={16} /> ליווי אישי של גל נימני לאורך כל התהליך</li>
              </ul>
              
              <a href="#lead-form" className="btn-pricing-premium">תיאום פגישת היכרות</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">סיפורי הצלחה ביהוד</span>
            <h2>מה אומרים המתאמנים שלנו?</h2>
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
              <button onClick={prevReview} className="slider-btn" aria-label="הקודם">
                <ChevronRight size={20} />
              </button>
              <span className="slider-indicator">
                {activeReview + 1} מתוך {REVIEWS.length}
              </span>
              <button onClick={nextReview} className="slider-btn" aria-label="הבא">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-dark">
        <div className="container small-container">
          <div className="section-header">
            <span className="section-label">שאלות נפוצות</span>
            <h2>כל מה שרציתם לדעת על EMS ACTION</h2>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className={`faq-item ${activeFaq === i ? 'active' : ''}`}
                onClick={() => toggleFaq(i)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-arrow" size={18} />
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="lead-form" className="section-padding bg-darker relative-section">
        <div className="container small-container">
          <div className="form-box">
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon"><Zap size={40} /></div>
                <h3>פרטיך נשלחו לגל!</h3>
                <p>נציג הסטודיו או גל נימני בעצמה יחזרו אליך לקביעת פגישת היכרות מותאמת אישית ביהוד.</p>
                <a 
                  href={`https://wa.me/972543422190?text=היי%20גל%2C%20אני%20פונה%20מהאתר.%20שמי%20${encodeURIComponent(formData.name)}.%20השארתי%20פרטים%20ואשמח%20לקבוע%20פגישת%20היכרות%20ב-99%20ש%22ח!`} 
                  className="btn-whatsapp-success"
                  target="_blank"
                  rel="noreferrer"
                >
                  מעבר מהיר לתיאום בוואטסאפ
                </a>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2>פגישת היכרות ואימון אישי ב-EMS ACTION</h2>
                  <p>השאירו פרטים ונחזור אליכם לקביעת פגישה מותאמת אישית בסטודיו ביהוד ב-₪99 בלבד.</p>
                </div>
                <form onSubmit={handleSubmit} className="actual-form">
                  <div className="form-group">
                    <label htmlFor="name">שם מלא</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="שם מלא"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">מספר טלפון ליצירת קשר</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="לדוגמה: 050-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="note">מטרה עיקרית או פציעות (כאבי גב, ירידה במשקל, חיזוק)</label>
                    <textarea 
                      id="note" 
                      rows={3} 
                      placeholder="למשל: סובל מכאבי גב תחתון ומחפש הקלה..."
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit">
                    תיאום פגישת היכרות אישית
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map & Location info */}
      <section className="contact-footer section-padding bg-dark">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h3>פרטי קשר ומיקום</h3>
              
              <div className="info-row">
                <MapPin className="info-icon" />
                <div>
                  <h4>הסטודיו שלנו</h4>
                  <p>רחוב אשכנזי 21, יהוד-מונוסון (מתחם אשכנזי)</p>
                </div>
              </div>

              <div className="info-row">
                <Phone className="info-icon" />
                <div>
                  <h4>טלפון לתיאום ובירורים</h4>
                  <p>054-3422190 (גל נימני)</p>
                </div>
              </div>

              <div className="info-row">
                <Clock className="info-icon" />
                <div>
                  <h4>שעות פעילות הסטודיו</h4>
                  <p>ימים א׳ - ה׳: 08:00 - 20:00 | יום ו׳: 08:00 - 12:00 | שבת: סגור</p>
                </div>
              </div>
            </div>

            <div className="footer-map">
              <div className="map-placeholder">
                <MapPin size={32} className="map-pin-icon" />
                <h4>ניווט קל לסטודיו</h4>
                <p>אשכנזי 21, יהוד (חנייה במקום)</p>
                <a 
                  href="https://waze.com/ul?q=אשכנזי%2021%20יהוד" 
                  className="btn-waze"
                  target="_blank"
                  rel="noreferrer"
                >
                  נווט לסטודיו ב-Waze 🚗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="footer-main bg-darker">
        <p>© 2026 EMS ACTION - סטודיו בוטיק לאימוני כושר אישיים ו-EMS ביהוד. כל הזכויות שמורות לגל נימני.</p>
        <p className="footer-credit">אסטרטגיה, מיתוג ופיתוח: גל נימני שיווק דיגיטלי & ייעוץ עסקי</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/972543422190?text=היי%20גל%20אשמח%20לקבל%20פרטים%20על%20פגישת%20היכרות%20ב-EMS%20ACTION" 
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="צ'אט בוואטסאפ"
      >
        <span className="tooltip">דברו איתי בוואטסאפ</span>
        <svg viewBox="0 0 24 24" className="whatsapp-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
