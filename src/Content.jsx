import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';


export default function Content(object) {

    const [markdown, setMarkdown] = useState('');
    const [isMore, setMore] = useState(false);

    let insert;

    if (isMore) {
        insert = "more";
    } else if (object.object === "placeholder") {
        insert = "placeholder";
    }
    else {
        insert = object.object[0].name;
    }

    let url = process.env.PUBLIC_URL + "/markdown/" + insert + ".md"


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
            <div className={isMore ? 'text content more' : 'text content less'}>
                <ReactMarkdown children={markdown} className='markdown'></ReactMarkdown>
                {insert !== object.object[0].name && <button id='button' onClick={handleClick}>{isMore ? 'Back' : 'Learn More'}</button >}
            </div>

        </>

    )
} 
