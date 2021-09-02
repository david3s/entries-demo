import type { NextPage } from 'next'
import Head from 'next/head'
import React, {SyntheticEvent, useState} from "react";
import useSWR from 'swr';

interface Entry {
  id: number
  value: string
}

const Home: NextPage = () => {
  const [entry, setEntry] = useState('');
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, mutate } = useSWR<Entry[]>('/api/entry', fetcher);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { value: entry };
      await fetch('/api/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await mutate();
      setEntry('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async (e: SyntheticEvent) => {
    e.preventDefault();
    const entryId = e.currentTarget.getAttribute('data-id');
    try {
      const body = { value: entry };
      await fetch('/api/entry/' + entryId, {
        method: 'DELETE'
      });
      await mutate();
    } catch (error) {
      console.error(error);
    }
  }

  const rows = (data) ? data.map(row => <>
    <div>{row.id}</div>
    <div>{row.value}</div>
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
        data-id={row.id}
        onClick={deleteEntry}
      >
        delete
      </button>
    </div>
  </>) : <div>LOADING...</div>;

  return (
    <>
      <Head>
        <title>Entries Demo</title>
        <meta name="description" content="Entries Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-3">
        <h1 className="text-center text-5xl font-bold">
          Entries Demo
        </h1>
      </header>
      <main className="flex justify-center p-3">
        <article>
          <section className="p-3">
            <form onSubmit={submitData}>
              <fieldset>
                <input
                  autoFocus
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="type entry"
                  type="text"
                  value={entry}
                  className="border-2"
                />
                <input
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
                  type="submit"
                  value="Create"
                  disabled={!entry}
                />
              </fieldset>
            </form>
          </section>
          <section className="flex justify-center p-3">
            <div className="grid grid-cols-3 text-center">
              <div className="font-bold">ID</div>
              <div className="font-bold">Value</div>
              <div>&nbsp;</div>
              {rows}
            </div>
          </section>
        </article>
      </main>
    </>
  )
}

export default Home
