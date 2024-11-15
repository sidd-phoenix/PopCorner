import React from "react";
import { useNavigate } from "react-router-dom";

const TicketSummary = ({seatCount,seatlist}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/payment', { state: { seatCount, seatlist } });
    }

    return(
        <div className="summary bg-base-100 shadow-md w-80 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Ticket Summary</h2>
        <div>
            <p className="mb-2">
            <span className="font-semibold">Selected Seats:</span>
            </p>
            <ul className="list-disc list-inside mb-4">
            {seatlist.map((seat, index) => (
                <li key={index} className="text-sm">
                {seat}
                </li>
            ))}
            </ul>
            <p className="mb-2">
            <span className="font-semibold">Number of Seats:</span> {seatlist.length}
            </p>
            {/* <p className="mb-4">
            <span className="font-semibold">Total Price:</span> ₹{totalPrice}
            </p> */}
            <button className="btn btn-primary w-full" onClick={handleClick}>Proceed to Checkout</button>
        </div>
        </div>
    )
}

export default TicketSummary;