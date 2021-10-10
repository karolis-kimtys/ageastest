import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Users.module.scss';
import userList from '../assets/userlist.txt';

import active from '../assets/statusActive.svg';
import away from '../assets/statusAway.svg';
import inactive from '../assets/statusInactive.svg';

export default function Users() {
  const [isUsers, setIsUsers] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const [isStatus, setIsStatus] = useState('all');
  const [isOrder, setIsOrder] = useState('az');

  const ageLimit = 18;

  useEffect(() => {
    fetch(userList)
      .then((response) => response.json())
      .then((json) => {
        setIsUsers(json);
        setIsLoaded(true);
      });
  }, []);

  //   let userListAZ;
  //   let userListZA;

  //   isLoaded &&
  //     (userListAZ = isUsers.sort((a, b) =>
  //       a.firstName.localeCompare(b.firstName)
  //     ));

  //   isLoaded &&
  //     (userListZA = isUsers.sort((a, b) =>
  //       a.firstName.localeCompare(b.firstName)
  //     ));

  //   console.log('AZ', userListAZ);
  //   console.log('ZA', userListZA);

  const handleStatusOrder = (e) => {
    e.preventDefault();
    setIsStatus(e.target.value);
  };

  const handleAlphabeticOrder = (e) => {
    e.preventDefault();
    e.target.value === 'az'
      ? isUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
      : isUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
    console.log(isUsers);
    e.target.value === 'az' ? setIsOrder('za') : setIsOrder('az');
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Panel}>
        <h1>Members List</h1>

        <div className={styles.OptionsWrapper}>
          <div className={styles.Status}>
            <label htmlFor="cars">Status</label>
            <select
              id="status"
              name="status"
              onChange={(e) => handleStatusOrder(e)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="away">Away</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.Order}>
            <label htmlFor="order">Order by</label>
            <select
              id="order"
              name="order"
              onChange={(e) => handleAlphabeticOrder(e)}>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>
        </div>

        <div className={styles.UserPanel}>
          {isLoaded &&
            Object.values(isUsers).map((values, key) => {
              {
                /* console.log(values); */
              }

              const userAge = moment(values.dateOfBirth)
                .fromNow()
                .split(' ')[0];

              return (
                <div key={key}>
                  {userAge > ageLimit && (
                    <div>
                      {isStatus === 'all' ? (
                        <div>
                          <div className={styles.User}>
                            <div className={styles.StatusIndicator}>
                              {values.status === 'active' ? (
                                <img src={active} alt="" />
                              ) : values.status === 'away' ? (
                                <img src={away} alt="" />
                              ) : (
                                <img src={inactive} alt="" />
                              )}
                            </div>

                            <div className={styles.UserStatusWrapper}>
                              <div className={styles.UserName}>
                                {values.firstName} {values.lastName}
                              </div>
                              <div className={styles.UserStatus}>
                                {values.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        values.status === isStatus && (
                          <div>
                            <div className={styles.User}>
                              <div className={styles.StatusIndicator}>
                                {values.status === 'active' ? (
                                  <img src={active} alt="" />
                                ) : values.status === 'away' ? (
                                  <img src={away} alt="" />
                                ) : (
                                  <img src={inactive} alt="" />
                                )}
                              </div>

                              <div className={styles.UserStatusWrapper}>
                                <div className={styles.UserName}>
                                  {values.firstName} {values.lastName}
                                </div>
                                <div className={styles.UserStatus}>
                                  {values.status}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
