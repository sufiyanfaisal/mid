import React, { useEffect, useState } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Typography } from '@mui/material';

const Packages = () => {
    const [packagesData, setPackagesData] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'packages'));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPackagesData(data);
            } catch (error) {
                console.error('Error fetching packages: ', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Packages
            </Typography>
            {packagesData.length === 0 ? (
                <Typography>No packages available.</Typography>
            ) : (
                packagesData.map(pkg => (
                    <div
                        key={pkg.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography>
                            <strong>Package Duration:</strong> {pkg.packageDuration}
                        </Typography>
                        <Typography>
                            <strong>Package Name:</strong> {pkg.packageName}
                        </Typography>
                        <Typography>
                            <strong>Meal Included:</strong> {pkg.mealIncluded}
                        </Typography>
                        <Typography>
                            <strong>Air Conditioner:</strong> {pkg.airConditioner}
                        </Typography>
                    </div>
                ))
            )}
        </div>
    );
};

export default Packages;