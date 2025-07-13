import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import CookieSettings from "../../components/informationalPages/CookieSettings";
import Feedback from "../../components/informationalPages/Feedback";
import HowAreMaterialsSelected from "../../components/informationalPages/HowAreMaterialsSelected";
import SearchHistory from "../../components/informationalPages/SearchHistory";
import SearchTips from "../../components/informationalPages/SearchTips";
import WhatIsLibrary from "../../components/informationalPages/WhatIsLibrary";
import Welcome from "../layout/Welcome";
import Libraries from "../../components/libraries/Libraries";
import Events from "../../components/navbarLinks/Events";
import Information from "../../components/navbarLinks/Information";
import Content from "../../components/navbarLinks/Content";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
          { path: 'welcome', element: <Welcome /> },
          { path: 'cookie-settings', element: <CookieSettings /> },
          { path: 'feedback', element: <Feedback /> },
          { path: 'how-are-materials-selected', element: <HowAreMaterialsSelected /> },
          { path: 'libraries', element: <Libraries /> },
          { path: 'events', element: <Events /> },
          { path: 'info', element: <Information /> },
          { path: 'content', element: <Content /> },
          { path: 'search-history', element: <SearchHistory /> },
          { path: 'search-tips', element: <SearchTips /> },
          { path: 'what-is-library', element: <WhatIsLibrary /> }
    ],
  }
])