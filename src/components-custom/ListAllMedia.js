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
import { useState, useEffect } from 'react';


function ListAllMedia() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },

  }));

  const classes = useStyles();
  // let allMediaResources = {
  //   result: [],
  //   tableCaption: 'No data found'
  // };

  const [allMediaResources, setAllMediaResources] = useState({
    result: [],
    tableCaption: 'No data found'
  })


  var getAllMedia = async () => {
    var resources = await axios.get(`http://localhost:5000/all-media-resources`);
    if (resources.data.length > 0) {
      console.log(resources.data);
      setAllMediaResources({
        result: resources.data,
        tableCaption: resources.data.length + " record(s) fetched"
      });
    } else {
      setAllMediaResources({
        result: [],
        tableCaption: 'No data found, try refining your search and giving the entire keyword like : space'
      });
    }
  }

  useState(() => {
    getAllMedia();
  }, []);


  if (allMediaResources.result) {
    return (
      <div center="align">

        <div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <caption>{allMediaResources.tableCaption}</caption>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Director</TableCell>
                  <TableCell align="left">Plot</TableCell>
                  {/* <TableCell align="left">Actions</TableCell> */}
                  <TableCell align="left">Poster</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allMediaResources.result.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="left">{row._source.title}</TableCell>
                    <TableCell align="left">{row._source.director}</TableCell>
                    <TableCell align="left">{row._source.plot}</TableCell>
                    {/* <TableCell align="left">{row._source.plot}</TableCell> */}
                    <TableCell align="left">{(row._source.poster == "N/A") ? ('Not Available') : (<a href={row._source.poster} target="_blank">View Poster</a>)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

}

export default ListAllMedia;
