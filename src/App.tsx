import { useState } from 'react';
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
  UserCheck
} from 'lucide-react';

// Reviews Data
const REVIEWS = [
  {
    name: "מיכל כהן",
    role: "מתאמנת כשנה בסטודיו",
    text: "האימון הכי יעיל שעשיתי בחיים שלי. בתור אמא לשניים ועובדת במשרה מלאה, 20 דקות פעם בשבוע סוגרות לי את הפינה של הכושר. גל מאמנת מדהימה וקשובה!",
    stars: 5
  },
  {
    name: "דוד לוי",
    role: "הגיע בגלל כאבי גב",
    text: "הגעתי ל-EMS Action בגלל כאבי גב כרוניים שלא עברו. אחרי חודשיים של אימונים ממוקדים פעם בשבוע, כאבי הגב נעלמו כמעט לחלוטין. מומלץ בחום לכל מי שסובל או מחפש פתרון מהיר.",
    stars: 5
  },
  {
    name: "שירה אזולאי",
    role: "ירדה 8 קילו בחיטוב",
    text: "שילוב של אימוני EMS ותזונה נכונה בסטודיו עשה פלאים. הליווי האישי של גל והמעקב השבועי נתנו לי את המוטיבציה שלא מצאתי באף חדר כושר רגיל.",
    stars: 5
  }
];

export default function App() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
      // Here you would normally send to API or WhatsApp
    }
  };

  return (
    <div className="app-container" dir="rtl">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="logo-area">
            <span className="logo-badge"><Zap size={20} /></span>
            <span className="logo-text">EMS Action</span>
          </div>
          <nav className="nav-links">
            <a href="#about">השיטה</a>
            <a href="#benefits">יתרונות</a>
            <a href="#pricing">חבילות</a>
            <a href="#reviews">המלצות</a>
          </nav>
          <div className="nav-cta">
            <a href="https://wa.me/972547471117?text=היי%20גל%20אשמח%20לקבל%20פרטים%20על%20אימון%20ניסיון%20ב-EMS%20Action" className="btn-primary-sm">
              אימון ניסיון ⚡
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-tag">
            <Zap size={14} className="tag-icon" />
            <span>סטודיו בוטיק לאימוני EMS אישיים ביהוד</span>
          </div>
          <h1 className="hero-title">
            להתאמן <span className="highlight">20 דקות</span> בשבוע<br />
            לקבל תוצאות של <span className="highlight">4 שעות</span> בחדר כושר
          </h1>
          <p className="hero-subtitle">
            בסטודיו EMS Action ביהוד בהובלת גל נימני, אנחנו משלבים טכנולוגיית גירוי שרירים חשמלי (EMS) מתקדמת יחד עם אימון אישי 1-על-1 לחיסכון מקסימלי בזמן ותוצאות מהירות.
          </p>
          <div className="hero-ctas">
            <a href="#lead-form" className="btn-primary">
              תיאום אימון ניסיון במחיר מוזל
            </a>
            <a href="https://wa.me/972547471117?text=היי%20גל%20אשמח%20לקבל%20פרטים%20על%20אימון%20ניסיון%20ב-EMS%20Action" className="btn-secondary">
              שיחה מהירה בוואטסאפ
            </a>
          </div>
          <div className="hero-badges">
            <span className="hero-badge"><Clock size={16} /> 20 דקות בשבוע בלבד</span>
            <span className="hero-badge"><UserCheck size={16} /> אימון אישי 1:1 צמוד</span>
            <span className="hero-badge"><ShieldCheck size={16} /> טכנולוגיה מאושרת רפואית</span>
          </div>
        </div>
      </section>

      {/* Intro to the Method */}
      <section id="about" className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">איך זה עובד?</span>
            <h2>מה זה בכלל אימון EMS?</h2>
            <p className="section-desc">
              טכנולוגיית EMS (Electro Muscle Stimulation) מפעילה 90% מסיבי השריר בגוף בו-זמנית בעזרת פולסים חשמליים עדינים ומבוקרים.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon"><Zap size={24} /></div>
              <h3>כיווץ שרירים עמוק</h3>
              <p>הפולסים החשמליים מגיעים גם לשרירים המייצבים והעמוקים ביותר, אלו שקשה להפעיל באימון משקולות רגיל.</p>
            </div>
            <div className="about-card">
              <div className="about-icon"><Clock size={24} /></div>
              <h3>חיסכון אדיר בזמן</h3>
              <p>אימון אחד של 20 דקות שווה ערך לכ-4 שעות של אימון אינטנסיבי מסורתי. מושלם לאנשים עסוקים.</p>
            </div>
            <div className="about-card">
              <div className="about-icon"><Award size={24} /></div>
              <h3>בטוח לחלוטין וללא עומס</h3>
              <p>בלי להעמיס משקל כבד על המפרקים והגב. מתאים במיוחד לשיקום מכאבי גב ופציעות ספורט.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding bg-dark">
        <div className="container">
          <div className="benefits-layout">
            <div className="benefits-text">
              <span className="section-label">התוצאות שלך</span>
              <h2>למי אימון EMS Action הכי מתאים?</h2>
              <div className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <div>
                  <h4>לאנשים עסוקים שאין להם זמן</h4>
                  <p>20 דקות פעם בשבוע בלבד וסיימתם. אין יותר תירוצים של "אין לי זמן ללכת לחדר כושר".</p>
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <div>
                  <h4>למעוניינים בחיטוב, ירידה במשקל ובניית שריר</h4>
                  <p>הפעלת השרירים האינטנסיבית מגבירה את קצב חילוף החומרים בגוף ומסייעת בשריפת שומנים מואצת.</p>
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle className="benefit-icon" />
                <div>
                  <h4>למי שסובל מכאבי גב ומפרקים</h4>
                  <p>האימון מחזק את שרירי הליבה התומכים בעמוד השדרה ללא כל עומס על מפרקים וסחוסים.</p>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <TrendingUp size={48} className="visual-icon" />
                <h3>תוצאות מוכחות מדעית</h3>
                <p className="visual-number">90%</p>
                <p className="visual-label">הפעלה של סיבי השריר בכל אימון</p>
                <div className="visual-divider"></div>
                <p className="visual-desc">אימון EMS מפעיל גם את השרירים המייצבים והעמוקים ביותר שאינם פעילים באימון קונבנציונלי.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="pricing" className="section-padding bg-darker">
        <div className="container">
          <div className="section-header">
            <span className="section-label">מחירון ותוכניות</span>
            <h2>חבילות האימון של EMS Action</h2>
            <p className="section-desc">השקעה ממוקדת בגוף ובבריאות שלך. בחר את המסלול המתאים ביותר עבורך.</p>
            
            <div className="toggle-container">
              <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>חבילה חודשית</span>
              <button 
                className={`toggle-switch ${isYearly ? 'active' : ''}`} 
                onClick={() => setIsYearly(!isYearly)}
              >
                <span className="toggle-handle"></span>
              </button>
              <span className={`toggle-label ${isYearly ? 'active' : ''}`}>כרטיסיית אימונים (הנחת כמות)</span>
            </div>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-badge">הכי פופולרי</div>
              <h3>מסלול כושר אישי</h3>
              <div className="price-display">
                <span className="price-number">{isYearly ? "₪140" : "₪170"}</span>
                <span className="price-period">/ אימון</span>
              </div>
              <p className="price-sub">מתאים למתאמנים המעוניינים בהתמדה שבועית צמודה</p>
              <ul className="price-features">
                <li><CheckCircle size={16} /> אימון אישי 1-על-1 צמוד עם גל</li>
                <li><CheckCircle size={16} /> התאמת חליפת אלקטרודות אישית</li>
                <li><CheckCircle size={16} /> ליווי תזונתי ומעקב מדדים שבועי</li>
                <li><CheckCircle size={16} /> בניית תוכנית עבודה מותאמת אישית</li>
                <li><CheckCircle size={16} /> זמני אימון גמישים בתיאום מראש</li>
              </ul>
              <a href="#lead-form" className="btn-pricing">תיאום אימון ניסיון</a>
            </div>

            <div className="pricing-card premium">
              <h3>מסלול שיקום וחיזוק גב</h3>
              <div className="price-display">
                <span className="price-number">{isYearly ? "₪160" : "₪190"}</span>
                <span className="price-period">/ אימון</span>
              </div>
              <p className="price-sub">מסלול ממוקד להקלה על כאבים וחיזוק שרירי ליבה מייצבים</p>
              <ul className="price-features">
                <li><CheckCircle size={16} /> אימון אישי מותאם למגבלות פיזיות</li>
                <li><CheckCircle size={16} /> דגש מיוחד על שרירי ליבה וגב תחתון</li>
                <li><CheckCircle size={16} /> מעקב שבועי אחר רמת הכאב והשיפור</li>
                <li><CheckCircle size={16} /> התאמה ע״י מאמנת מוסמכת בשיקום</li>
                <li><CheckCircle size={16} /> ייעוץ ארגונומי ליום-יום</li>
              </ul>
              <a href="#lead-form" className="btn-pricing-premium">תיאום אימון ניסיון</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Reviews Slider */}
      <section id="reviews" className="section-padding bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-label">מתאמנים מספרים</span>
            <h2>מה אומרים עלינו ביהוד?</h2>
          </div>

          <div className="reviews-slider-container">
            <div className="review-card">
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
              <button onClick={prevReview} className="slider-btn">
                <ChevronRight size={20} />
              </button>
              <span className="slider-indicator">
                {activeReview + 1} / {REVIEWS.length}
              </span>
              <button onClick={nextReview} className="slider-btn">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact / Lead Form */}
      <section id="lead-form" className="section-padding bg-darker form-section">
        <div className="container small-container">
          <div className="form-box">
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon"><Zap size={48} /></div>
                <h3>הפנייה התקבלה בהצלחה!</h3>
                <p>גל תחזור אלייך בהקדם לקביעת אימון הניסיון שלך בסטודיו ביהוד.</p>
                <a 
                  href="https://wa.me/972547471117?text=היי%20גל%20השארתי%20פרטים%20באתר%20אשמח%20לדבר%20ולקבוע%20אימון" 
                  className="btn-whatsapp-success"
                  target="_blank"
                  rel="noreferrer"
                >
                  שלח הודעה ישירה לוואטסאפ לזירוז
                </a>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2>אימון ניסיון ב-EMS Action</h2>
                  <p>השאירו פרטים וגל תחזור אליכם לתיאום אימון ניסיון מותאם אישית ביהוד.</p>
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
                    <label htmlFor="phone">מספר טלפון</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="מספר טלפון"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="note">הערה / בקשה מיוחדת (כאבי גב, ירידה במשקל וכדומה)</label>
                    <textarea 
                      id="note" 
                      rows={3} 
                      placeholder="למשל: סובל מכאבי גב תחתון / מעוניינת בחיטוב לקראת אירוע..."
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit">
                    שלחו לי פרטים לאימון ניסיון
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map & Contact Footer */}
      <section className="contact-footer section-padding bg-dark">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <h3>פרטי הסטודיו</h3>
              <div className="info-row">
                <MapPin className="info-icon" />
                <span>מתחם אשכנזי (רחוב אשכנזי 21), יהוד-מונוסון</span>
              </div>
              <div className="info-row">
                <Phone className="info-icon" />
                <span>054-7471117 (יצירת קשר עם גל)</span>
              </div>
              <div className="info-row">
                <Clock className="info-icon" />
                <span>ימים א׳ - ה׳: 08:00 - 20:00 | יום ו׳: 08:00 - 12:00 | שבת: סגור</span>
              </div>
              <div className="social-links">
                <a href="#" className="social-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" className="social-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-map">
              <div className="map-placeholder">
                <MapPin size={32} className="map-pin-icon" />
                <h4>EMS Action - יהוד-מונוסון</h4>
                <p>אשכנזי 21, יהוד (מתחם אשכנזי)</p>
                <a 
                  href="https://waze.com/ul?q=אשכנזי%2021%20יהוד" 
                  className="btn-waze"
                  target="_blank"
                  rel="noreferrer"
                >
                  ניווט באמצעות Waze 🚗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="footer-main bg-darker">
        <p>© 2026 EMS Action - סטודיו בוטיק לאימוני EMS ביהוד. כל הזכויות שמורות.</p>
        <p className="footer-credit">עוצב ונבנה ע״י גל נימני שיווק דיגיטלי & אסטרטגיה</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/972547471117?text=היי%20גל%20אשמח%20לקבל%20פרטים%20על%20אימון%20ניסיון%20ב-EMS%20Action" 
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <span className="tooltip">דברו איתי בוואטסאפ</span>
        <svg viewBox="0 0 24 24" className="whatsapp-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
