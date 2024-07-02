import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import RightBar from '../components/RightBar';
import BottomNavBar from '../components/BottomNavBar';
import ProfileSection from '../components/ProfileSection';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('../');
    }
  }, []);
  return (
    <div className="mx-auto h-screen flex xl:max-w-[1200px]">
      {userId && (
        <>
          <SideBar />
          <div className="w-full xl:w-1/2 h-screen overflow-y-auto ">
            {/* <Header /> */}
            <ProfileSection />
          </div>
          <RightBar />
          <BottomNavBar />
        </>
      )}
    </div>
  );
}

export default Profile;
