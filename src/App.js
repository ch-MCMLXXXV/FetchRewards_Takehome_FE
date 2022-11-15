import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from 'react';
import { TextField, CssBaseline } from '@mui/material';

function App() {
   const [fullname, setFullname] = useState('');
   const [email, setEmail] = useState('');
   const [value, setValue] = useState('');
   const [password, setPassword] = useState('');
   const [occupations, setOccupations] = useState([]);
   const [states, setStates] = useState([]);
   const URL = 'https://frontend-take-home.fetchrewards.com/form';

   const fetchData = () => {
      fetch(`${URL}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);

            const occ = data.occupations.map((occupation) => {
               return occupation;
            });
            const sts = data.states.map(({ name, abbrevation }) => {
               return name;
            });
            setStates(sts);
            setOccupations(occ);
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
               sx={{
                  mt: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Box component='form' autoComplete='off'>
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined'
                     label='Full Name'
                     value={fullname}
                     onChange={(e) => {
                        console.log(e.target.value);
                        setFullname(e.target.value);
                     }}
                  ></TextField>
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined'
                     label='Email'
                     value={email}
                     onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value);
                     }}
                  ></TextField>
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined'
                     type='password'
                     label='Password'
                     value={password}
                     onChange={(e) => {
                        console.log(e.target.value);
                        setPassword(e.target.value);
                     }}
                  ></TextField>

                  <TextField
                     margin='auto'
                     sx={{ mb: 3, mt: 2 }}
                     fullWidth
                     id='outlined-uncontrolled'
                     select
                     label='Occupation'
                     defaultValue='Head of Shrubbery'
                     onChange={(e) => {
                        console.log(e.target.value);
                        setValue(e.target.value);
                     }}
                  >
                     {occupations.map((occupation) => (
                        <MenuItem
                           key={occupation.id}
                           value={occupation}
                        >
                           {occupation}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     margin='auto'
                     id='outlined-uncontrolled'
                     select
                     label='State'
                     defaultValue='Alabama'
                     onChange={(e) => {
                        console.log(e.target.value);
                        setValue(e.target.value);
                     }}
                  >
                     {states.map((name, abbrevation) => (
                        <MenuItem key={name} value={name}>
                           {name}
                        </MenuItem>
                     ))}
                  </TextField>
                  <Button
                     type='submit'
                     variant='contained'
                     fullWidth
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </Container>
      </>
   );
}

export default App;
