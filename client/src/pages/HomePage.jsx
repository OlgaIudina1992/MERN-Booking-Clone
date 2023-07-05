import Favorites from "../components/Favorites";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MailingList from "../components/MailingList";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="flex flex-col items-center mt-2 gap-4">
                <Featured />
                <h1 className="primary text-primary mb-4">Browse properties by type</h1>
                <PropertyList />
                <h1 className="primary text-primary my-4">Accomodations guests love</h1>
                <Favorites />
                <MailingList />
                <Footer />
            </div>
        </div>
    )
}