declare module 'react-google-recaptcha' {
    import { Component } from 'react';

    interface ReCAPTCHAProps {
        sitekey: string;
        onChange?: (value: string) => void;
        size?: 'compact' | 'normal';
        theme?: 'light' | 'dark';
    }

    class ReCAPTCHA extends Component<ReCAPTCHAProps> { }

    export default ReCAPTCHA;
}