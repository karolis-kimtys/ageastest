import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Users.module.scss';
import userList from '../assets/userlist.txt';

import statusActive from '../assets/statusActive.svg';
import statusAway from '../assets/statusAway.svg';
import statusInactive from '../assets/statusInactive.svg';

export default function Users() {
  const [isUsers, setIsUsers] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStatus, setIsStatus] = useState('all');

  useEffect(() => {
    fetch(userList)
      .then((response) => response.json())
      .then((json) => {
        setIsUsers(json);
        setIsLoaded(true);
      });
  }, []);

  const handleStatusOrder = (e) => {
    e.preventDefault();
    setIsStatus(e.target.value);
    console.log(e.target.value);
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
            <select id="order" name="order">
              <option value="A---Z">A---Z</option>
              <option value="Z---A">Z---A</option>
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
                  {values.status === isStatus}
                  <div>
                    {userAge >= 18 && (
                      <div className={styles.User}>
                        <div className={styles.StatusIndicator}>
                          {values.status === 'active' ? (
                            <img src={statusActive} alt="" />
                          ) : values.status === 'away' ? (
                            <img src={statusAway} alt="" />
                          ) : (
                            <img src={statusInactive} alt="" />
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
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
