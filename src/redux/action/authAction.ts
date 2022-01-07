import { Dispatch } from "redux";

import { postAPI, getOneAPI } from "../../utills/FetchData";
import { IUser } from "../../utills/TypeScript";

import { AUTH, CREATE_USER, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";

export const login =
  (userLogin: IUser) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getOneAPI("user", userLogin.username);
      
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.user._id,
          user: {
            username: res.data.user.username,
          },
        },
      });

      dispatch({ type: ALERT, payload: { success: "login success !!!" } });

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const createUser =
  (user: IUser) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("user", user, "");
      dispatch({
        type: CREATE_USER,
        payload: {
          token: res.data.user._id,
          user: {
            username: res.data.user.username,
          },
        },
      });

      dispatch({ type: ALERT, payload: { loading: false } });

    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      // console.log(err);
    }
  };
