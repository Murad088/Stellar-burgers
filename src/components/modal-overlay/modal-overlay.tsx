import React from 'react';
import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};

export default ModalOverlay;
