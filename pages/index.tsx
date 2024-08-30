import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import NavItems from './utils/NavItems';
import { FC } from 'react';

interface Props {}

const Home: FC<Props> = (props) => {

    return (
        <div>
          <NavItems />
          <div className={styles.container}>
            
            </div>
        </div>
 
    );
};

export default Home;
function useState(arg0: number): [any, any] {
  throw new Error('Function not implemented.');
}

