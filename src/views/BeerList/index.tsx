import { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';
import styles from './BeerList.module.css';
import { Link } from 'react-router-dom';

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Brewery Type',
        accessor: 'brewery_type',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: beerList,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <div className={styles.filterContainer}>
            <TextField
              label='Search...'
              variant='outlined'
              className={styles.searchInput}
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Button variant='contained' onClick={() => fetchData(setBeerList)}>
              Reload list
            </Button>
          </div>

          <Table className={styles.table} {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup: any) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <TableCell {...cell.getCellProps()}>
                        {/* Rendering Link component for the beer name */}
                        <Link to={`/beer/${row.original.id}`}>
                          {cell.render('Cell')}
                        </Link>
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>{' '}
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;