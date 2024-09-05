import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { readSheet } from '../lib/googleSheets';
import Link from 'next/link';
import styles from '../styles/SearchPage.module.css'; // Assuming you create a CSS module for styles

interface SearchPageProps {
    initialData: string[][];
}

const SearchPage: React.FC<SearchPageProps> = ({ initialData }) => {
    const [searchResults, setSearchResults] = useState<string[][]>(initialData);
    const [isSearched, setIsSearched] = useState<boolean>(false);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('query') as string;

        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data.results);
        setIsSearched(true); // Mark that a search has been performed
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}><button className={styles.backButton}>กลับหน้าหลัก</button></Link>
                <h1 className={styles.title}>ตรวจสอบรายชื่อผู้สมัคร</h1>
            </div>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input 
                    name="query" 
                    placeholder="กรุณากรอกชื่อหรือนามสกุล" 
                    className={styles.searchInput} 
                />
                <button type="submit" className={styles.searchButton}>
                    ค้นหา
                </button>
            </form>
            <table className={styles.resultsTable}>
                <thead>
                    <tr>
                        {initialData[0]?.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                {isSearched && (
                    <tbody>
                        {searchResults.slice(0).map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const initialData = await readSheet('A3:F6'); // Include the header row in the initial data
    return { props: { initialData } };
};

export default SearchPage;
