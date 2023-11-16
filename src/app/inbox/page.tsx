"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function page() {
  const [data, setData] = useState([]);

  const handleAllClick = () => {
    console.log("clicked");
    fetchData();
  }

  const handleUnread = () => {
    console.log("clicked unread");
    fetchUnreadData();
  }

  async function fetchUnreadData() {
    try {
      const response = await fetch('http://localhost:3000/google/gmail/inbox/unread')
      const unreadData = await response.json();
      console.log("unreadData", unreadData)
      setData(unreadData);
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  async function fetchData() {
    try {
      // Make a GET request to your local API endpoint.
      const response = await fetch(`http://localhost:3000/google/gmail/inbox`);
      console.log("response", response);
      const result = await response.json();
      setData(result);
      console.log("result", result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <button className='bg-blue-800 text-white p-2 m-2' onClick={handleUnread}>Unread</button>
      <button className='bg-blue-800 text-white p-2 m-2' onClick={handleAllClick}>All</button>

      <div>
        {Array.isArray(data) ? (
          data.map((item) => (
            <div key={item?.id}>
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
    </>

  );
}
