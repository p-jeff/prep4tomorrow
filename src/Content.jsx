import './App.css';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

export default function Content() {
    let url = "/markdown/circus.md"
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
            <ReactMarkdown children={markdown}></ReactMarkdown>
        </div>
    );

}