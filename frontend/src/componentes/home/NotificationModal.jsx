import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchNotification,
  viewNotification,
} from "../../../redux/actions/actionUSER";

export default function NotificationModal({ usuario }) {
  if (!usuario) " ";
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(searchNotification());
  }, []);

  function viewAll() {
    notification?.map((e) => {
      dispatch(viewNotification(e._id));
    });
  }

  function setTrue(e) {
    dispatch(viewNotification(e._id));
    dispatch(searchNotification());
  }
  return notification ? (
    <div id="contNotification" className="contNotification displayNone">
      <ul>
        {notification.length > 0 ? (
          notification?.map((e, i) => {
            if (i < 4) {
              return (
                <li
                key={i}
                  onClick={() => setTrue(e)}
                  className={e.visto ? "notification" : "notiFalse"}
                >
                  {e.msg}
                </li>
              );
            } else {
              return;
            }
          })
        ) : (
          <li className="notification">Not notification</li>
        )}
      </ul>
      <div className="viewAll">
        <a onClick={() => viewAll()}>-- view all --</a>
      </div>
    </div>
  ) : null;
}
