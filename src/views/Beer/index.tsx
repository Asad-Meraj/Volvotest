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
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Type:</th>
                <td>{beer?.brewery_type}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{beer?.address_1}, {beer?.address_2}, {beer?.address_3}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{beer?.city}</td>
              </tr>
              <tr>
                <th>State/Province:</th>
                <td>{beer?.state_province}</td>
              </tr>
              <tr>
                <th>Postal Code:</th>
                <td>{beer?.postal_code}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>{beer?.country}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{beer?.phone}</td>
              </tr>
              <tr>
                <th>Website:</th>
                <td><a href={beer?.website_url} className={styles.link}>{beer?.website_url}</a></td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{beer?.state}</td>
              </tr>
              <tr>
                <th>Street:</th>
                <td>{beer?.street}</td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
    </article>
  );
};

export default Beer;
