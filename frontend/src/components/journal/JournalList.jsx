import React from 'react';
import { Link } from 'react-router-dom';

const JournalList = ({ journals }) => {
  return (
    <div className="my-7 mx-14">
      <div className='flex justify-between mx-14'>
      <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>
      <h1 className='text-2xl font-bold mb-4'>Created Date</h1>
      </div>
      <div className="border-[1px] border-black mb-4"></div>
      <ul className='mx-10'>
        {journals.map((journal) => (
          <Link>
          <li key={journal.id} className="mb-4">
            <div className='flex justify-between mx-6'>
            <h3 className="text-lg font-semibold">{journal.entry}</h3>
            <p className="text-gray-500">{journal.createdDate}</p>
            </div>
            <div className='border border-gray-400 my-2'></div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default JournalList;
