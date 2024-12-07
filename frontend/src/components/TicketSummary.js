import React, {useState,useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


const TicketSummary = ({seatCount,selectedSeats}) => {
    const [paymentDetails, setPaymentDetails] = useState({
        amount: 500,
        productinfo: 'Movie Ticket',
        firstname: 'John',
        email: 'john.doe@example.com',
        phone: '9876543210',
    });   

    const handleClick = async () => {
        try
        {
            const { data } = await axios.post('http://localhost:3001/payments/', paymentDetails);
            
            // Dynamically create form and submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.action;

            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'action') {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                }
            });

            document.body.appendChild(form);
            form.submit();
        } 
        catch (error) 
        {
            console.error('Error initiating payment:', error);
            alert('Payment initiation failed!');
        }
    };

    return(
        <div className="summary bg-base-100 shadow-md w-80 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Ticket Summary</h2>
        <div>
            <p className="mb-2">
            <span className="font-semibold">Selected Seats:</span>
            </p>
            <ul className="list-disc list-inside mb-4">
            {selectedSeats.map((seat, index) => (
                <li key={index} className="text-sm">
                {seat}
                </li>
            ))}
            </ul>
            <p className="mb-2">
            <span className="font-semibold">Number of Seats:</span> {selectedSeats.length}
            </p>
            <p className="mb-4">
            <span className="font-semibold">Total Price:</span> ₹500
            </p>
            {
            selectedSeats.length===seatCount ?<button className="btn btn-primary w-full" onClick={handleClick}>Proceed to Checkout</button>:<button className="btn btn-primary w-full opacity-50 cursor-not-allowed" disabled>Proceed to Checkout</button>
            }
        </div>
        </div>
    )
}

export default TicketSummary;