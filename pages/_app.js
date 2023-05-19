import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MailContextProvider } from "../context/MailContext";
import { AuthProvider } from "../context/AuthContext";
import { GroupContextProvider } from "../context/GroupContext";
import { VolunteerContextProvider } from "../context/VolunteersContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    if (router.pathname === "/dashboard" || router.pathname === "/vip/vipInvite" || router.pathname === "/applicationForm") {
      setShowHeader(false);
      setShowFooter(false);
    } else if (router.pathname === "/signin") {
      setShowFooter(false);
      setShowHeader(true);
    } else {
      setShowHeader(true);
      setShowFooter(true);
    }
  }, [router.pathname]);
  return (
    <AuthProvider>

      <MailContextProvider>
        <VolunteerContextProvider>
          <GroupContextProvider>
            <div>
              {showHeader && <NavBar />}
              <Elements
                stripe={stripePromise}
                options={{
                  locale: locale === "en-US" ? "en" : "fr",
                }}
              >
                <Component {...pageProps} />
              </Elements>
              {showFooter && <Footer />}
            </div>

          </GroupContextProvider>
        </VolunteerContextProvider>

      </MailContextProvider>
    </AuthProvider>

  );
}

export default MyApp;
