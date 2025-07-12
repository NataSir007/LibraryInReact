import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import CookieSettingsInfo from "../../components/footerLinks/CookieSettingsInfo";
import FeedbackInfo from "../../components/footerLinks/FeedbackInfo";
import HowAreMaterialsSelectedInfo from "../../components/footerLinks/HowAreMaterialsSelectedInfo";
import SearchHistoryInfo from "../../components/footerLinks/SearchHistoryInfo";
import SearchTipsInfo from "../../components/footerLinks/SearchTipsInfo";
import WhatIsLibraryInfo from "../../components/footerLinks/WhatIsLibraryInfo";
import Welcome from "../layout/Welcome";
import LibrariesInfo from "../../components/navbarLinks/LibrariesInfo";
import EventsInfo from "../../components/navbarLinks/EventsInfo";
import InformationInfo from "../../components/navbarLinks/InformationInfo";
import ContentInfo from "../../components/navbarLinks/ContentInfo";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
          { path: 'welcome', element: <Welcome /> },
          { path: 'cookie-settings', element: <CookieSettingsInfo /> },
          { path: 'feedback', element: <FeedbackInfo /> },
          { path: 'how-are-materials-selected', element: <HowAreMaterialsSelectedInfo /> },
          { path: 'libraries', element: <LibrariesInfo /> },
          { path: 'events', element: <EventsInfo /> },
          { path: 'info', element: <InformationInfo /> },
          { path: 'content', element: <ContentInfo /> },
          { path: 'search-history', element: <SearchHistoryInfo /> },
          { path: 'search-tips', element: <SearchTipsInfo /> },
          { path: 'what-is-library', element: <WhatIsLibraryInfo /> }
    ],
  }
])