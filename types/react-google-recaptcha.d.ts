declare module 'react-google-recaptcha' {
    import { Component } from 'react';

    interface ReCAPTCHAProps {
        sitekey: string;
        onChange?: (value: string) => void;
        size?: 'compact' | 'normal';
        theme?: 'light' | 'dark';
        referrerPolicy?: 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    }

    class ReCAPTCHA extends Component<ReCAPTCHAProps> { }

    export default ReCAPTCHA;
}