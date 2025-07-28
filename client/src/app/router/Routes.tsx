import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import CookieSettings from "../../components/informationalPages/CookieSettings";
import Feedback from "../../components/informationalPages/Feedback";
import HowAreMaterialsSelected from "../../components/informationalPages/HowAreMaterialsSelected";
import SearchHistory from "../../components/informationalPages/SearchHistory";
import SearchTips from "../../components/informationalPages/SearchTips";
import WhatIsLibrary from "../../components/informationalPages/WhatIsLibrary";
import Libraries from "../../components/libraries/Libraries";
import Events from "../../components/events/Events";
import LibraryCardAndLoans from "../../components/informationalPages/LibraryCardAndLoans";
import LoanPeriodsAndFees from "../../components/informationalPages/LoanPeriodsAndFees";
import EventDetails from "../../components/events/EventsDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
          { path: 'cookie-settings', element: <CookieSettings /> },
          { path: 'feedback', element: <Feedback /> },
          { path: 'how-are-materials-selected', element: <HowAreMaterialsSelected /> },
          { path: 'libraries', element: <Libraries /> },
          { path: 'events', element: <Events /> },
          { path: 'events/:eventId', element: <EventDetails /> },
          { path: 'search-history', element: <SearchHistory /> },
          { path: 'search-tips', element: <SearchTips /> },
          { path: 'what-is-library', element: <WhatIsLibrary /> },
          { path: 'library-card-and-loans', element: <LibraryCardAndLoans /> },
          { path: 'loan-periods-and-fees', element: <LoanPeriodsAndFees /> }
    ],
  }
])