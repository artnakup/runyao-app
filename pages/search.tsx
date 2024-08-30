import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { readSheet } from '../lib/googleSheets';
import Link from 'next/link';

interface SearchPageProps {
    initialData: string[][];
}

const SearchPage: React.FC<SearchPageProps> = ({ initialData }) => {
    const [searchResults, setSearchResults] = useState<string[][]>(initialData);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('query') as string;

        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data.results);
    };

    return (
        <div>
            <div>
                <Link href="/">Back to Home</Link>
            </div>
            <h1>Search your Name</h1>
            <form onSubmit={handleSearch}>
                <input name="query" placeholder="Enter your name" />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map((row, index) => (
                    <li key={index}>{row.join(' | ')}</li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const initialData = await readSheet('A2:F6');
    return { props: { initialData } };
};

export default SearchPage;
