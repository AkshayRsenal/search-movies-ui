// import logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

 

 

  const [searchResults, setSearchResults] = useState([]);
  // const HandleInput = event => {
    
  //   useEffect(() => {
  //     axios.get('http://localhost:5000/movies/all/' + event.target.value).then(res => {
  //       console.log(res.data)
  //       setSearchResults(res.data)
  //       console.log(searchResults)
  //     })
  //   }, []);
  // };


  
  var resultsSearched = [];
  const HandleInput = event => {
    if(event.target.value.length > 1)
    {  
      axios.get('http://localhost:5000/movies/all/' + event.target.value).then(res => {
        // console.log(res.data)
        resultsSearched = res.data
        resultsSearched.forEach(element => {
          console.log(element._index)
        });
      })
    }

          
  };




  return (
    <div>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Search Movie content" onChange={HandleInput} placeholder="Enter name" />
          <Button
            color="primary"
            // onClick={() => {
            //   // getSearchResults();
            // }}
          >
            Search
          </Button>
        </form>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Director</TableCell>
                <TableCell align="center">Plot</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                resultsSearched.forEach(element => {
                  return <TableRow key={element._index}>
                    <TableCell align="center">{element._index}</TableCell>
                    <TableCell align="center">{element._index}</TableCell>
                    <TableCell align="center">{element._index}</TableCell>
                  </TableRow>
                })
              } 

                {/* <TableBody>
                  <TableRow key="index">
                    <TableCell component="th" scope="row">1</TableCell>
                    <TableCell align="center">Test Name</TableCell>
                    <TableCell align="center">Test Age</TableCell>
                    <TableCell align="center">Test Address</TableCell>
                    <TableCell align="center">Test City</TableCell>
                    <TableCell align="center">Test ContactNum</TableCell>
                    <TableCell align="center">Test Salary</TableCell>
                    <TableCell style={{ paddingRight: "114px" }} align="center">pDepartment</TableCell>
                  </TableRow>
                </TableBody>   */}
                 

            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );
}

export default App;
