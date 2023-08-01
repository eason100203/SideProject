import { useEffect } from 'react';

const useDisableBodyScroll = (open) => {
    useEffect(() => {
        if (open) {
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.position = 'fixed';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
        }
    }, [open]);
};

export default useDisableBodyScroll;