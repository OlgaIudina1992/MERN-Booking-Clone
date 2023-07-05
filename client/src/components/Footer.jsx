export default function Footer() {
    return (
        <div className="w-full font-sans text-sm bf-white text-primary p-2">
            <div className="w-full flex justify-around mb-4">
                <ul className="cursor-pointer">
                    <li className="active">Countries</li>
                    <li className="active">Regions</li>
                    <li className="active">Cities</li>
                    <li className="active">Districts</li>
                    <li className="active">Airports</li>
                    <li className="active">Hotels</li>
                </ul>
                <ul className="cursor-pointer">
                    <li className="active">Homes</li>
                    <li className="active">Apartments</li>
                    <li className="active">Resorts</li>
                    <li className="active">Villas</li>
                    <li className="active">Hostels</li>
                    <li className="active">Guest Houses</li>
                </ul>
                <ul className="cursor-pointer">
                    <li className="active">Unique places to stay</li>
                    <li className="active">Reviews</li>
                    <li className="active">Unpacked: Travel articles</li>
                    <li className="active">Travel communities</li>
                    <li className="active">Seasonal and holiday deals</li>
                    <li className="active">Tips</li>
                </ul>
                <ul className="cursor-pointer">
                    <li className="active">Car rental</li>
                    <li className="active">Flight Finder</li>
                    <li className="active">Restaurant reservations</li>
                    <li className="active">Travel Agents</li>
                </ul>
                <ul className="cursor-pointer">
                    <li className="active">Curtomer Service</li>
                    <li className="active">Partner Help</li>
                    <li className="active">Careers</li>
                    <li className="active">Sustainability</li>
                    <li className="active">Press center</li>
                    <li className="active">Safety Resource Center</li>
                    <li className="active">Investor relations</li>
                    <li className="active">Terms & conditions</li>
                </ul>
            </div>
            <div className="p-4 flex justify-end font-bold font-serif">
            <span>Made with </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span> by <a className="hover:text-blue-600" href="https://github.com/OlgaIudina1992" target="_blank" rel="noopener noreferrer">Olga</a>, 2023</span>
            </div>
        </div>
    )
}