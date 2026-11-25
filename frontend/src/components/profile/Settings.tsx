import { useEffect, useState } from "react";
import {
  FaCog,
  FaBell,
  FaPlay,
  FaMoon,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { languageNames, LanguageCode } from "../../i18n";


const Settings = () => {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(
      localStorage.getItem("notifications") ?? "true"
    );
  });

  const [autoplay, setAutoplay] = useState(() => {
    return JSON.parse(
      localStorage.getItem("autoplay") ?? "true"
    );
  });

const {
  darkMode,
  setDarkMode,
} = useTheme();

  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("language");
    const migrated =
      saved === "Hindi" ? "hi" : saved === "Marathi" ? "mr" : saved === "English" ? "en" : saved;
    return migrated && migrated in languageNames ? (migrated as LanguageCode) : "en";
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "autoplay",
      JSON.stringify(autoplay)
    );
  }, [autoplay]);



  useEffect(() => {
    localStorage.setItem("language", language);
    void i18n.changeLanguage(language);
  }, [language, i18n]);

  const Toggle = ({
    enabled,
    onClick,
  }: {
    enabled: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full transition ${enabled
          ? "bg-purple-600"
          : "bg-gray-700"
        }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled
            ? "left-6"
            : "left-1"
          }`}
      />
    </button>
  );
// const handleSave = () => {
//     console.log({
//     notifications,
//     autoplay,
//     darkMode,
//     language,
//   });
//   localStorage.setItem(
//     "notifications",
//     JSON.stringify(notifications)
//   );

//   localStorage.setItem(
//     "autoplay",
//     JSON.stringify(autoplay)
//   );

 

//   localStorage.setItem(
//     "language",
//     language
//   );

// Swal.fire({
//   icon: "success",
//   title: "Saved Successfully!",
//   html: "<span style='color:#cbd5e1'>Your preferences have been saved.</span>",
//   background: "#141222",
//   color: "#fff",
//   confirmButtonColor: "#8B5CF6",
//   iconColor: "#22C55E",
//   timer: 1800,
//   showConfirmButton: false,
//   customClass: {
//     popup: "rounded-2xl",
//   },
// });
// };

const handleSave = () => {
  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

  localStorage.setItem(
    "autoplay",
    JSON.stringify(autoplay)
  );

  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );

  localStorage.setItem(
    "language",
    language
  );

  Swal.fire({
    icon: "success",
    title: t("settings.saved"),
    html: `<span style='color:#cbd5e1'>${t("settings.savedDescription")}</span>`,
    background: "#141222",
    color: "#fff",
    confirmButtonColor: "#8B5CF6",
    iconColor: "#22C55E",
    timer: 1800,
    showConfirmButton: false,
    customClass: {
      popup: "rounded-2xl",
    },
  });
};
  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
          <FaCog />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("settings.title")}
          </h2>

          <p className="text-sm text-gray-500">
            {t("settings.subtitle")}
          </p>
        </div>

      </div>

      <div className="space-y-3">

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1a2b] p-4">

          <div className="flex items-center gap-4">

            <FaBell className="text-green-400" />

            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t("settings.notifications")}
              </p>

              <p className="text-xs text-gray-500">
                {t("settings.notificationsDescription")}
              </p>
            </div>

          </div>

          <Toggle
            enabled={notifications}
            onClick={() =>
              setNotifications(!notifications)
            }
          />

        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1a2b] p-4">

          <div className="flex items-center gap-4">

            <FaPlay className="text-blue-400" />

            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t("settings.autoplay")}
              </p>

              <p className="text-xs text-gray-500">
                {t("settings.autoplayDescription")}
              </p>
            </div>

          </div>

          <Toggle
            enabled={autoplay}
            onClick={() =>
              setAutoplay(!autoplay)
            }
          />

        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1a2b] p-4">

          <div className="flex items-center gap-4">

            <FaMoon className="text-purple-400" />

            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t("settings.darkMode")}
              </p>

              <p className="text-xs text-gray-500">
                {t("settings.darkModeDescription")}
              </p>
            </div>

          </div>

          <Toggle
            enabled={darkMode}
            onClick={() =>
              setDarkMode(!darkMode)
            }
          />

        </div>

      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          {t("settings.language")}
        </label>

        <select className="w-full rounded-xl border border-white/10 bg-[#1b1a2b] px-4 py-3 text-gray-900 dark:text-white outline-none focus:border-purple-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        >
          {(Object.keys(languageNames) as LanguageCode[]).map((code) => (
            <option key={code} value={code}>
              {languageNames[code]}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-gray-900 dark:text-white transition hover:scale-[1.01]"
      >
        {t("settings.save")}
      </button>

    </div>
  );
};

export default Settings;