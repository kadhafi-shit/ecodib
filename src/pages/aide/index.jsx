"use client"

import { useState, useEffect } from "react";
import "./stylesaide.css";
import { Link } from "react-router-dom"

const SupportComponent = () => {
  const [theme, setTheme] = useState("light")


    // données developpers

  const developers = [
    {
      name: "Dibopieu Josue .S",
      role: "Chef de groupe",
      bio: "Etudiant, chargés du Backend et toute la Logique derriere l'App.",
      avatar: "/avatr-Stan.jpg",
      instagram: "https://www.instagram.com/stvn.___._",
      whatsapp: "https://wa.me/2250153003369",
    },
    {
      name: "Ekra Marc",
      role: "Designer",
      bio: "Etudiant, chargés du Frontend.",
      avatar: "/avatar-marco.jpg",
      whatsapp: "https://wa.me/2250594264154",
    },
    {
      name: "Coulibaly Keneya",
      role: "Chargé BDD",
      bio: "Etudiant, chargés de la Base de Données.",
      avatar: "/avatar-keneya.jpg",
      instagram: "https://instagram.com/keneyaa_c",
      whatsapp: "https://wa.me/2250705895158",
    },
  ]

  // Données pour resources

  const resources = [
    {
      title: "Site Internet ne marche pas ?",
      description: "solution",
      link: "https://youtu.be/9eAvPxIAouc?si=HbQenj2yIEo2PDY6",
      iconColor: "#F60B9A",
    },
    {
      title: "Des bugs ?",
      description: "video tutoriel",
      link: "https://youtube.com/shorts/3fIy4rWMmwI?si=KNa9PD_jlq4dY2YW",
      iconColor: "#F60B9A",
    },
    {
      title: "Mot de passe oublié ?",
      description: "Envoyez un message",
      link: "https://accounts.google.com/v3/signin/recoveryidentifier?flowName=GlifWebSignIn&dsh=S906726140%3A1748557257093203",
      iconColor: "#F60B9A",
    },
    {
      title: "Supprimer votre Compte",
      description: "Envoyez un message",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=dibopieustanejosue@gmail.com",
      iconColor: "red",
    },
  ]

  // données pour credits
  const credits = [
    { title: "Version", name: "1.0.0" },
    { title: "App", name: "© écodib 2025" },
    { title: "Theme", name: "Light/Dark Mode" },
  ]

  // le Theme toggle
  useEffect(() => {

    // verifie le theme préferer
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // utiliser le theme
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark")
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      setTheme("light")
      document.documentElement.setAttribute("data-theme", "light")
    }

    // memoriser le changement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="support-icon"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  )

  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="support-icon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )

  const InstagramIcon = () => (
    <svg
      className="support-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  )

  const WhatsAppIcon = () => (
    <svg
      className="support-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )

  const EmailIcon = () => (
    <svg
      className="support-icon-medium support-text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  )

  const PhoneIcon = () => (
    <svg
      className="support-icon-medium support-text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )

  const WebIcon = () => (
    <svg
      className="support-icon-medium support-text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="M2 12h20"></path>
    </svg>
  )

  const ResourceIcon = ({ color }) => (
    <svg
      className="support-icon-medium support-text-primary"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="M2 12h20"></path>
    </svg>
  )

  return (
    <div>
      {/* Boutton theme */}
      <button className="support-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="support-container support-py-8 support-px-4">
        <div className="support-space-y-2 support-text-center support-mb-12">
          <h1 className="support-text-3xl support-font-bold support-tracking-tight">Support et Aides 🔍</h1>
          <div className="support-separator support-my-6"></div>
        </div>

        {/* Section Developers */}
        <section className="support-mb-16">
          <h2 className="support-text-2xl support-font-semibold support-mb-6">La Team .</h2>
          <div className="support-grid support-grid-cols-1 support-md-grid-cols-2 support-lg-grid-cols-3 support-gap-6">
            {developers.map((developer, index) => (
              <div key={index} className="support-card">
                <div className="support-card-header support-pb-2">
                  <div className="support-flex support-items-center support-gap-4">
                    <div className="support-h-12 support-w-12 support-rounded-full support-overflow-hidden support-bg-muted support-flex support-items-center support-justify-center">
                      <img
                        src={developer.avatar || "/placeholder.svg"}
                        alt={developer.name}
                        className="support-h-full support-w-full support-object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="support-card-title">{developer.name}</h3>
                      <p className="support-card-description">{developer.role}</p>
                    </div>
                  </div>
                </div>
                <div className="support-card-content">
                  <p className="support-text-sm support-text-muted-foreground">{developer.bio}</p>
                  <div className="support-flex support-gap-2 support-mt-4">
                    {developer.instagram && (
                      <a
                        href={developer.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="support-button support-button-outline support-button-icon"
                      >
                        <InstagramIcon />
                        <span className="support-sr-only">Instagram</span>
                      </a>
                    )}
                    {developer.whatsapp && (
                      <a
                        href={developer.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="support-button support-button-outline support-button-icon"
                      >
                        <WhatsAppIcon />
                        <span className="support-sr-only">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Support */}
        <section className="support-mb-16">
          <h2 className="support-text-2xl support-font-semibold support-mb-6">Documentation 📄</h2>
          <div className="support-grid support-grid-cols-1 support-md-grid-cols-2 support-gap-8">
            <div className="support-card">
              <div className="support-card-header">
                <h3 className="support-card-title">Contactez nous !</h3>
              </div>
              <div className="support-card-content support-space-y-4">
                <div className="support-flex support-items-center support-gap-3">
                  <EmailIcon />
                  <span>écrivez directement au numéro🤙 ou par mail.</span>
                </div>
                <div className="support-flex support-items-center support-gap-3">
                  <PhoneIcon />
                  <span>+225 01 53 00 33 69</span>
                </div>
                <div className="support-flex support-items-center support-gap-3">
                  <WebIcon />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=dibopieustanejosue@gmail.com"
                    className="support-text-primary support-hover-underline"
                  >
                    dibopieustanejosue@gmail.com
                  </a>
                </div>
                <div className="support-mt-6">
                  <Link to="/ecodib">
                  <button className="support-button support-button-primary support-button-full">
                      Retour au Tableau de bord
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="support-card">
              <div className="support-card-header">
                <h3 className="support-card-title">Ressources utiles :</h3>
              </div>
              <div className="support-card-content">
                <ul className="support-space-y-3">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.link}
                        className="support-flex support-items-center support-gap-2 support-p-3 support-rounded-md support-hover-bg-muted support-transition-colors"
                      >
                        <ResourceIcon color={resource.iconColor} />
                        <div>
                          <p className="support-font-medium">{resource.title}</p>
                          <p className="support-text-sm support-text-muted-foreground">{resource.description}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll bar de credit */}
        <section className="support-relative support-mt-16 support-mb-8 support-overflow-hidden support-h-16 support-bg-muted support-rounded-md">
          <div className="support-absolute support-whitespace-nowrap support-py-4 support-animate-scroll">
            {/* credits */}
            {credits.map((credit, index) => (
              <span key={`first-${index}`} className="support-inline-block support-mx-8">
                <span className="support-font-semibold">{credit.title}:</span> {credit.name}
              </span>
            ))}
            {/* . */}
            {credits.map((credit, index) => (
              <span key={`second-${index}`} className="support-inline-block support-mx-8">
                <span className="support-font-semibold">{credit.title}:</span> {credit.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SupportComponent
