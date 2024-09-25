import { useState } from "react";
import { GetServerSideProps } from "next";
import { readSheet } from "../lib/googleSheets";
import Link from "next/link";
import styles from "../styles/SearchPage.module.css"; // Assuming you create a CSS module for styles
import Image from "next/image";
import Head from "next/head";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface SearchPageProps {
  initialData: string[][];
}

const SearchPage: React.FC<SearchPageProps> = ({ initialData }) => {
  const [searchResults, setSearchResults] = useState<string[][]>(initialData);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("query") as string;

    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchQuery)}`
    );
    const data = await response.json();
    setSearchResults(data.results);
    setIsSearched(true); // Mark that a search has been performed
  };

  // Define the columns for DataGrid based on your initialData headers
  const columns: GridColDef[] = initialData[0].map((header, index) => ({
    field: `column${index}`,
    headerName: header,
    flex: 1,
  }));

  // Prepare rows for the DataGrid, where each row is given an `id` required by DataGrid
  const rows = searchResults.slice(1).map((row, rowIndex) => ({
    id: rowIndex,
    ...row.reduce((acc, cell, cellIndex) => {
      acc[`column${cellIndex}`] = cell;
      return acc;
    }, {} as Record<string, string>)
  }));

  return (
    <div className={styles.container}>
      <Head>
        <title>ตรวจสอบรายชื่อผู้สมัคร - ระบบค้นหา</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <Image
            src="/BANNER1.jpg"
            alt="searchlogo"
            width={800}
            height={600}
            layout="responsive"
            className={styles.topImage}
          />
        </div>
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

      {isSearched && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
        </div>
      )}

      <div className={styles.imageContainerdown}>
        <Image
          src="/LOGO242.jpg"
          alt="searchlogo"
          width={800}
          height={400}
          layout="responsive"
          className={styles.bottomImage}
        />
        <Link href="/" className={styles.backLink}>
          <button className={styles.backButton}>กลับหน้าหลัก</button>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await readSheet("A3:G6"); // Include the header row in the initial data
  return { props: { initialData } };
};

export default SearchPage;
