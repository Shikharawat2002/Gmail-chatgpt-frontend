"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function page() {
    const [data, setData] = useState([]);

    const handleClick = () => {
        console.log("clicked")
    }

    useEffect(() => {
        async function fetchData() {
            try {
                // Make a GET request to your local API endpoint.
                const response = await fetch(`http://localhost:3000/google/gmail/sent`);
                console.log("response", response);
                const result = await response.json();
                setData(result);
                console.log("result", result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        // <>hello</>
        <div>
            {Array.isArray(data) ? (
                data.map((item) => (
                    <div onClick={handleClick} key={item?.id}>
                        <h1>id:{item?.id}</h1>
                        <Link href={`/readmessage/${item?.id}`} passHref>
                            <button className='border bg-blue-500 p-2 m-2'>Open</button>
                        </Link>
                    </div>
                ))
            ) : (
                <p>Data is not an array.</p>
            )}
        </div>

    );
}
