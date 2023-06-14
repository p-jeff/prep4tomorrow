import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

export default function Content(object) {
    const [markdown, setMarkdown] = useState('');
    const [isMore, setMore] = useState(false);

    const insert = isMore ? "more" : object.object === "placeholder" ? "placeholder" : object.object[0].name;
    const url = process.env.PUBLIC_URL + "/markdown/" + insert + ".md"

    const handleClick = () => {
        setMore(!isMore);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const text = await response.text();
            setMarkdown(text);
        }

        fetchData();
    }, [url]);

    return (
        <>
            <div className={isMore ? 'more' : 'less'} id='content'>
                <ReactMarkdown children={markdown} className='markdown'></ReactMarkdown>
                {insert !== object.object[0].name && <button id='button' onClick={handleClick}>{isMore ? 'Back' : 'Learn More'}</button >}
            </div>

        </>

    )
} 
