import { notification } from 'antd';
import SucessInfoIcon from '../images/SucessInfoIcon.svg';
import SuccessCloseIcon from '../images/SuccessCloseIcon.svg';
const openNotification = (
  placement,
  description,
  msg,
  icon,
  onClose = () => {},
  onClick = () => {},
  duration = 5,
  style
) => {
  notification.warning({
    duration: duration,
    message: <div style={{ color: '#f0ede4' }}>{msg}</div>,
    onClick: () => onClick(),
    onClose: () => onClose(),
    description: description,
    placement,
    icon: (
      <img
        alt=""
        unoptimized={true}
        src={
          typeof SucessInfoIcon === 'object'
            ? SucessInfoIcon.src
            : SucessInfoIcon
        }
      />
    ),
    closeIcon: (
      <img
        alt=""
        unoptimized={true}
        src={
          typeof SuccessCloseIcon === 'object'
            ? SuccessCloseIcon.src
            : SuccessCloseIcon
        }
      />
    ),

    style: {
      width: 419,

      backgroundColor: '#363636',
      color: '#f0ede4',
      borderRadius: 10,
      padding: 16,
    },
  });
};
export default openNotification;
