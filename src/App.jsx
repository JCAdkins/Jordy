import StickyNavbar from "./navigation/StickyNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Podcasts from "./pages/Podcasts";
import Members from "./pages/Members";
import Profile from "./pages/Profile";
import UserSettings from "./pages/UserSettings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import PodcastProvider from "./contexts/PodcastProvider";
import ProtectedRoute from "./navigation/ProtectedRoute";
import NewAccount from "./pages/NewAccount";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import getUser from "./services/getUser";
import MemberSignInModal from "./components/Modals/MemberSignInModal";
import EventInfo from "./pages/EventInfo";
import DavosFooter from "./navigation/DavosFooter";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [user, setUser] = useState();
  const [podcast, setPodcast] = useState();
  const [modal, setModal] = useState();

  const resetModal = () => {
    setModal(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (tUser) => {
      if (tUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        getUser({ uid: tUser.uid }).then((data) => {
          console.log("data: ", data);
          data ? setUser({ ...data }) : {};
        });
      } else {
        // User is signed out
        setTimeout(() => setModal(true), 2000);
      }
    });
  }, []);

  return (
    <div className="bg-cover bg-fixed w-screen">
      <UserContext.Provider value={{ user, setUser }}>
        <PodcastProvider.Provider value={{ podcast, setPodcast }}>
          <Router>
            <StickyNavbar />
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/events" element={<Events />} />
              <Route exact path="/events/info" element={<EventInfo />} />
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/new_account"
                element={
                  <ProtectedRoute isAllowed={!user}>
                    <NewAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin"
                element={
                  <ProtectedRoute
                    isAllowed={user ? user.roles?.includes("admin") : false}
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/members"
                element={
                  <ProtectedRoute isAllowed={!!user}>
                    <Members />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/podcasts" element={<Podcasts />} />
              <Route
                exact
                path="/profile"
                element={
                  <ProtectedRoute isAllowed={!!user}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/profile/settings"
                element={
                  <ProtectedRoute isAllowed={!!user}>
                    <UserSettings user={user} />
                  </ProtectedRoute>
                }
              />
            </Routes>
            {modal && <MemberSignInModal resetModal={resetModal} />}
            <DavosFooter />
          </Router>
        </PodcastProvider.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
