import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';



export default function Content(object) {

    const insert = (object.object === "placeholder") ? "placeholder" : object.object[0].name;
    let url = process.env.PUBLIC_URL + "/markdown/" + insert + ".md"
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const text = await response.text();
            setMarkdown(text);
        }

        fetchData();
    }, [url]);

    return (
        <div className='text'>
            <ReactMarkdown children={markdown} className='markdown'></ReactMarkdown>
        </div>
    );

}