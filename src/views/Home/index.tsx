import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);

  // Here beer list is fetched on component mount
  useEffect(() => {
    fetchData(setBeerList);

    // Load the saved list from localStorage
    const savedListFromStorage = JSON.parse(localStorage.getItem('savedList') || '[]');
    setSavedList(savedListFromStorage);
  }, []);

  // Function for handling beerlist to the saved list
  const handleSaveBeer = (beer: Beer, isChecked: boolean) => {
    setSavedList(prevSavedList => {
      if (isChecked) {
        // check if checkbox is pressed then add the beer to the saved list
        if (!prevSavedList.some((savedBeer) => savedBeer.id === beer.id)) {
          const updatedSavedList = [...prevSavedList, beer];
          localStorage.setItem('savedList', JSON.stringify(updatedSavedList));
          return updatedSavedList;
        }
      } else {
        // check if checkbox is unchecked then remove the beer from the saved list
        const updatedSavedList = prevSavedList.filter((savedBeer) => savedBeer.id !== beer.id);
        localStorage.setItem('savedList', JSON.stringify(updatedSavedList));
        return updatedSavedList;
      }
      // lastly if checkbox is pressed and the beer is already in the saved list then return the previous state
      return prevSavedList;
    });
  };

  
  const handleRemoveAllBeers = () => {
    setSavedList([]);
    localStorage.removeItem('savedList');
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' />
                <Button variant='contained' onClick={() => fetchData(setBeerList)}>
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox onChange={(e) => handleSaveBeer(beer, e.target.checked)} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant='contained'
                  size='small'
                  onClick={handleRemoveAllBeers}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;