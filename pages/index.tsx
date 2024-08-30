import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/sheets', fetcher);

  return (
    <div className="flex flex-col p-4 min-h-screen w-full">
      <div>
        <Link href="/search"className="text-4xl font-bold text-center my-2 selection:rounded-xl">
          <h1>Search Runner</h1>
        </Link>
      </div>
    </div>
  );
}
