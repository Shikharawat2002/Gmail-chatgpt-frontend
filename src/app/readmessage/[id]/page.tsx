"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios'

interface Prompt {
  mail: string,
  input: string
}
interface MailOption {
  to: string,
  subject: string,
  text: string
  // "to": "rawatsikha112@gmail.com",
  // "subject": "test mail",
  // "text": "Hello test mail from nest js"
}

export default function page({ }) {
  const [data, setData] = useState({});
  const [promptInput, setPromptInput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [senderMailId, setSenderMailId] = useState('')

  const { id } = useParams();
  // fetch data 
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await fetch(`http://localhost:3000/google/gmail/inbox/readmessage/${id}`);
          const result = await response.json();
          setData(result);
          console.log("Fetched data result:::", result)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const filterInbox = data?.labelIds?.filter(item => item === "SENT")
  console.log("filterInbox", filterInbox)

  //  generate response 
  const handleResponse = async () => {
    console.log("clicked generate response")
    const prompt: Prompt = {
      mail: data?.snippet,
      input: promptInput
    }

    try {
      axios.post('http://localhost:3000/google/generate-response', JSON.stringify(prompt), {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((res) => {
        console.log('res of generate mail', res);
        setPromptResponse(res.data.response)
        console.log("chatgpt response", res.data.response)
      }).catch((error) => {
        console.log('errors', error)
      })
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  //  send mail 
  const handleSendClick = async () => {
    console.log("send clicked")

    const mail = data?.payload?.headers?.filter(item => item.name === "Sender")
    console.log(' sendermail', mail)
    console.log('mail', mail[0].value)


    setSenderMailId(mail[0].value)
    console.log("Sendmailid::", senderMailId)
    let mailoptions: MailOption = {
      to: 'rawatsikha112@gmail.com',
      subject: "test mail",
      text: promptResponse
    }
    console.table("mailOptions", mailoptions)
    try {
      axios.post('http://localhost:3000/google/send-email', JSON.stringify(mailoptions), {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((res) => {
        console.log('send res', res);
      }).catch((error) => {
        console.log('errors', error)
      })
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  console.log("data?.lableIds", data?.labelIds)
  const labelIds = data?.labelIds;

  return (
    <div>
      {/* fetched data  */}
      <section>
        <div className='font-extrabold'>Message : {data?.id}</div>
        {data?.snippet}
        <br />
        <div className='font-extrabold'>LableID::::
          {

            labelIds?.map((item, index) =>
              (<div key={index}>{item}</div>))
          }
        </div>
      </section>
      <br />

      {/* chatgpt prompt  */}
      {
        !filterInbox &&
        <section>
          {/* Query */}
          <div>
            {/* input  */}
            <input type="text" name="input" id="input" placeholder='Prompt' className='border p-2' defaultValue={promptInput} onChange={(e) => {
              setPromptInput(e.target.value)
            }} />
            {/* buttons  */}
            <button className='rounded bg-blue-500 text-stone-50 p-2 m-2' type="submit" onClick={handleResponse}>Generate Response</button>
            <button onClick={handleSendClick} type="submit" className='rounded bg-blue-500 text-stone-50 p-2'>Send </button>
          </div>
          {/* response  */}
          <div>
            {promptResponse &&
              (<><div className='font-extrabold'>Response</div>
                <div style={{ width: '100%' }}>
                  <textarea className='border w-full' rows={7} defaultValue={promptResponse} />
                </div></>)
            }
          </div>
        </section>
      }
    </div>
  );
}


