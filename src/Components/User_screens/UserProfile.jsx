import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { db, auth } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    const getData = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.log("No user is logged in.");
            return;
        }
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography
                sx={{
                    fontSize: { xs: '16px', md: '26px' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                Name:{' '}
                <Typography
                    sx={{
                        fontSize: { xs: '14px', md: '26px' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {userData.name}
                </Typography>
            </Typography>
            <Typography
                sx={{
                    fontSize: { xs: '16px', md: '26px' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                City:{' '}
                <Typography
                    sx={{
                        fontSize: { xs: '14px', md: '26px' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {userData.city}
                </Typography>
            </Typography>
            <Typography
                sx={{
                    fontSize: { xs: '16px', md: '26px' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                Phone:{' '}
                <Typography
                    sx={{
                        fontSize: { xs: '14px', md: '26px' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {userData.phone}
                </Typography>
            </Typography>
            <Typography
                sx={{
                    fontSize: { xs: '16px', md: '26px' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                Email:{' '}
                <Typography
                    sx={{
                        fontSize: { xs: '14px', md: '26px' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {userData.email}
                </Typography>
            </Typography>
        </div>
    );
};

export default UserProfile;