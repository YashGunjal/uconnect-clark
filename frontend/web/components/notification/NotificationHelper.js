import { Store } from 'react-notifications-component';

const notificationCommonParts = {
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true
    }
  };

export function SuccessMessage(title, message, options){
  Store.addNotification({
      ...notificationCommonParts,
    title: title || "Alert!!",
    message: message || "successful",
    type: "success",
    ...options
  });
}

export function ErrorMessage(title, message, options){
  Store.addNotification({
      ...notificationCommonParts,
    title: title || "Error!!",
    message: message || "Something Went Wrong!",
    type:"danger",
    ...options
  })
}