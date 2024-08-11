import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const styles = {
  navbar: `relative flex items-center justify-between p-4 bg-white text-black `, // Updated height to 20% of viewport height
  top: `absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-red-500 italic mb-5 mt-5`,
  userSection: `flex items-center ml-auto mr-3`,
  userIcon: `text-4xl cursor-pointer `,
  userEmail: `ml-4 text-black`,
  logoutButton: `ml-4 bg-black hover:bg-red-700 text-white py-1 px-3 rounded`
};

const Navbar = ({ user, onUserIconClick, showUserDetails, handleLogout }) => {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.top}>r e m i n d e r</h1>
      <div className={styles.userSection}>
        <FaUserCircle className={styles.userIcon} onClick={onUserIconClick} />
        {showUserDetails && (
          <>
            <span className={styles.userEmail}>{user?.email}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
