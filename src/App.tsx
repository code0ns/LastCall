import React, { useState } from "react";
import { MapPin, Clock, Tag, Search, ChevronLeft } from 'lucide-react';

const deals = [
  {
    id: 1,
    business: "Sweet Treats Bakery",
    type: "Food",
    description: "70% off all remaining pastries",
    originalPrice: "$12",
    discountedPrice: "$3.60",
    timeRemaining: "45 mins",
    distance: "0.3 mi",
    details: "Assorted fresh pastries - chocolate croissants, fruit tarts, and apple danishes"
  },
  {
    id: 2,
    business: "Urban Yoga Studio",
    type: "Fitness",
    description: "Last-minute yoga class - 50% off",
    originalPrice: "$20",
    discountedPrice: "$10",
    timeRemaining: "30 mins",
    distance: "0.5 mi",
    details: "Remaining spots in evening vinyasa flow class"
  },
  {
    id: 3,
    business: "Curl Up Salon",
    type: "Beauty",
    description: "Surprise haircut special",
    originalPrice: "$45",
    discountedPrice: "$25",
    timeRemaining: "1 hr",
    distance: "0.7 mi",
    details: "Walk-in haircut with experienced stylists"
  }
];

const LastCallApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const filteredDeals = selectedCategory 
    ? deals.filter(deal => deal.type === selectedCategory)
    : deals;

  const ReservationScreen = ({ deal }) => {
    const [quantity, setQuantity] = useState(1);

    const handleReserve = () => {
      setReservationConfirmed(true);
    };

    return (
      <div className="bg-white h-screen max-w-md mx-auto">
        <header className="bg-blue-600 text-white p-4 flex items-center">
          <button onClick={() => setSelectedDeal(null)}>
            <ChevronLeft className="mr-4" />
          </button>
          <h1 className="text-xl font-bold">{deal.business}</h1>
        </header>

        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{deal.description}</h2>
            <p className="text-gray-600 mb-4">{deal.details}</p>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="line-through text-gray-500 mr-2">{deal.originalPrice}</span>
                <span className="text-green-600 font-bold text-xl">{deal.discountedPrice}</span>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-white border">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={handleReserve}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Reserve {quantity} Item{quantity > 1 ? 's' : ''}
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-bold mb-2">Reservation Details</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Available Until:</span>
              <span>{deal.timeRemaining}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>{deal.distance} away</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmationScreen = () => (
    <div className="bg-white h-screen max-w-md mx-auto flex flex-col justify-center items-center p-4 text-center">
      <div className="bg-green-100 rounded-full p-6 mb-4">
        <Tag className="text-green-600 w-16 h-16" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
      <p className="text-gray-600 mb-6">Your deal is reserved. Show this screen at Sweet Treats Bakery to redeem.</p>
      <button 
        onClick={() => {
          setReservationConfirmed(false);
          setSelectedDeal(null);
        }}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        Back to Deals
      </button>
    </div>
  );

  if (reservationConfirmed) return <ConfirmationScreen />;
  if (selectedDeal) return <ReservationScreen deal={selectedDeal} />;

  return (
    <div className="bg-white h-screen max-w-md mx-auto">
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">LastCall</h1>
          <MapPin className="text-white" />
        </div>
        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder="Find deals near you" 
            className="w-full p-2 rounded text-black"
          />
          <Search className="absolute right-3 top-3 text-gray-500" />
        </div>
      </header>

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {['Food', 'Fitness', 'Beauty'].map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredDeals.map(deal => (
          <div 
            key={deal.id} 
            className="bg-white shadow rounded-lg p-4 mb-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">{deal.business}</h2>
              <span className="text-green-600 font-bold">{deal.discountedPrice}</span>
            </div>
            <p className="text-gray-600 mb-2">{deal.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {deal.timeRemaining} left
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {deal.distance}
              </div>
            </div>
            <button 
              onClick={() => setSelectedDeal(deal)}
              className="w-full bg-blue-600 text-white py-2 rounded mt-3"
            >
              Reserve Deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastCallApp;