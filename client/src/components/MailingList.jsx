export default function MailingList() {
    return (
        <div className="gap-2 flex flex-col items-center justify-around p-12 border-4 border-primary bg-primary w-full text-white">
            <h1 className="primary">Save time and money!</h1>
            <h2 className="font-semibold text-lg">Subscribe to receive our best deals</h2>
            <div className="flex items-center justify-around gap-2">
                <input type="text" placeholder="Enter your email..." />
                <button className="primary">Subscribe</button>
            </div>
        </div>
    )
}