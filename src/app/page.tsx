// "use client"
// import Link from 'next/link';
// import { useEffect, useState } from 'react'
// import { useSession, signIn, signOut } from 'next-auth/react';

// export default function Home() {
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Make a GET request to your local API endpoint.
//         const response = await fetch(`http://localhost:3000/google`);
//         console.log("response", response);
//         const result = await response;
//         console.log("result", result)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }


//     fetchData();
//   }, []);
//   const { data: session } = useSession();
//   if (!session) {
//     return (
//       <div>
//         Not signed in <br />
//         <button onClick={() => signIn('google')}>Sign in with Google</button>
//       </div>
//     );
//   }
//   return (

//     <>

//       {/* <div>
//         <Link href={'/inbox'}>
//           <button type="button" className='bg-blue-800 p-2 m-2 text-white'>Inbox</button>
//         </Link>
//         <Link href={'/sent'}>
//           <button type="button" className='bg-blue-800 p-2 m-2 text-white'>Sent</button>
//         </Link>
//         <Link href={'/draft'}>
//           <button type="button" className='bg-blue-800 p-2 m-2 text-white'>Draft</button>
//         </Link>
//       </div> */}
//       <div>
//         Welcome, {session?.user?.name}! <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>

//     </>
//   );
// }

import React, { Component, useMemo, useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
function Home({ Component, pageProps }) { // i have added it here since I am not using _app.js file
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
const abc = ({ json }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};