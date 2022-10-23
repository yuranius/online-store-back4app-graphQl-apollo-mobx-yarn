import {useState} from "react";



export const useShowMessageToasts = () => {
    const [showToasts, setShowToasts] = useState(false);
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [title, setTitle] = useState('')

    const showWarning = (message, title) => {
        {title ? setTitle(title) : setTitle('⚠️ Внимание! ⚠️')}
        setShowToasts(true);
        setVariant('Warning')
        setMessage(message)
    }

    const showDanger = (message, title) => {
        {title ? setTitle(title) : setTitle('🚫️ Ошибка! 🚫️')}
        setShowToasts(true);
        setVariant('Danger')
        setMessage(message)
    }

    const showSuccess = (message, title) => {
        {title ? setTitle(title) : setTitle('🏆 Отлично! 🏆')}
        setShowToasts(true);
        setVariant('Success')
        setMessage(message)
    }




    return {showWarning, showSuccess, showDanger, variant, message, showToasts, title, setShowToasts};

}