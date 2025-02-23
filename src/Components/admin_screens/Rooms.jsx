import React, { useEffect, useState } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        rooms.map((room) => (
          <div key={room.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Category:</strong> {room.category}</p>
            <p><strong>Size:</strong> {room.size}</p>
            <p><strong>Floor:</strong> {room.floor}</p>
            <p><strong>Room Number:</strong> {room.roomNumber}</p>
            <p><strong>Room Price:</strong> {room.roomPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Rooms;