import React, { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => {
    fetchData(setBeer, id);
  }, [id]);

  return (
    <article className={styles.container}>
      <section>
        <header className={styles.header}>
          <h1>{beer?.name}</h1>
        </header>
        <main className={styles.details}>
          <div className={styles.info}>
            <label className={styles.label}>Type:</label>
            <span>{beer?.brewery_type}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Address:</label>
            <span>{beer?.address_1}, {beer?.address_2}, {beer?.address_3}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>City:</label>
            <span>{beer?.city}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>State/Province:</label>
            <span>{beer?.state_province}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Postal Code:</label>
            <span>{beer?.postal_code}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Country:</label>
            <span>{beer?.country}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Phone:</label>
            <span>{beer?.phone}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Website:</label>
            <a href={beer?.website_url} className={styles.link}>{beer?.website_url}</a>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>State:</label>
            <span>{beer?.state}</span>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Street:</label>
            <span>{beer?.street}</span>
          </div>
        </main>
      </section>
    </article>
  );
};

export default Beer;
