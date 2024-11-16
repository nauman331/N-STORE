import React from 'react';
  import { Popup } from 'react-popupify';

  const CustomPopup = ({children}) => {
  
    return (
          <Popup
            popupId="customPopupId"
            animation="bounce"
            open={false}
            closeOnEscape={true}
            closeOnOutsideClick={true}
            closeButton={true}
        >
         {children}
        </Popup>
    );
  }

export default CustomPopup