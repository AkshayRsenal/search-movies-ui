import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useState } from 'react';
import Button from '@material-ui/core/Button';

function SearchTable() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },

  }));

  const classes = useStyles();
  const [searchResults, setSearchResults] = useState({
    result: [],
    tableCaption: 'No data found try refining your search and giving the entire keyword like : space'
  });



  const handleSearch = async (event) => {
    if (event.target.value.length > 1) {
      const result = await axios.get(`${process.env.REACT_APP_SEARCH_MOVIE_SERVICE_HOST}all/` + event.target.value);
      if (result.data.length > 0) {
        setSearchResults({
          result: result.data,
          tableCaption: result.data.length + " record(s) fetched"
        });
      } else {
        setSearchResults({
          result: [],
          tableCaption: 'No data found, try refining your search and giving the entire keyword like : space'
        });
      }
    }

  }

  return (
    <div center="align">
      <div>
        <TextField id="standard-basic" label="search movie" onChange={handleSearch} placeholder="Enter Search Term" />
        {/* <Button variant="contained" color="primary">{console.log(useLocation())}</Button> */}
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <caption>{searchResults.tableCaption}</caption>
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Director</TableCell>
                <TableCell align="left">Plot</TableCell>
                <TableCell align="left">Poster</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.result.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="left">{row._source.title}</TableCell>
                  <TableCell align="left">{row._source.director}</TableCell>
                  <TableCell align="left">{row._source.plot}</TableCell>
                  {/* <TableCell align="left">{row._source.poster}</TableCell> */}
                  <TableCell align="left">{(row._source.poster == "N/A" ) ? ( 'Not Available' ) : (<a href={row._source.poster} target="_blank">View Poster</a>) }</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default SearchTable;
