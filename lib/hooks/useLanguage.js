import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useLanguage(listText) {
    const [text, setText] = useState(listText[0]);
    const language = useSelector((state) => state.app.language);

    useEffect(() => {
        const currentText = listText.find((textObj) => textObj.id === language);
        setText(currentText);
    }, [language]);
    return [text];
}


