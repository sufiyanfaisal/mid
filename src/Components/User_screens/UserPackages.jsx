import React from 'react'

const UserPackages = () => {
    const [packages, setPackages] = useState([
      { id: 1, name: "Luxury Package", price: "$500", duration: "5 Days", amenities: ["Spa", "Airport Pickup", "Free Breakfast"] },
      { id: 2, name: "Budget Package", price: "$200", duration: "3 Days", amenities: ["Free Wi-Fi", "Breakfast", "Gym Access"] },
    ]);
  
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">User Packages</h2>
        <ul>
          {packages.map((pkg) => (
            <li key={pkg.id} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-semibold">{pkg.name} - {pkg.price}</h3>
              <p><strong>Duration:</strong> {pkg.duration}</p>
              <p><strong>Amenities:</strong> {pkg.amenities.join(", ")}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Book Now</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div>UserPackages</div>
  )

export default UserPackages