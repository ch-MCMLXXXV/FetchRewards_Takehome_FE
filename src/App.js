import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { useState, useEffect } from 'react';
import { TextField, CssBaseline } from '@mui/material';
import axios from 'axios';

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

   const createUser = async () =>
      await axios
         .post(URL, {
            fullname: fullname,
            email: email,
            password: password,
            occupations,
            states,
         })
         .then(({ status }) => status);

   const handleSubmit = async (e) => {
      e.preventDefault();
      createUser();
      alert('Form submitted successfully!');
   };

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
               <Box
                  component='form'
                  onSubmit={handleSubmit}
                  autoComplete='off'
               >
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined-fullname'
                     label='Full Name'
                     value={fullname}
                     onChange={(e) => {
                        setFullname(e.target.value);
                     }}
                  ></TextField>
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined-email'
                     label='Email'
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                  ></TextField>
                  <TextField
                     margin='normal'
                     fullWidth
                     required
                     id='outlined-password'
                     type='password'
                     label='Password'
                     value={password}
                     onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                  ></TextField>

                  <TextField
                     margin='dense'
                     sx={{ mb: 3, mt: 2 }}
                     fullWidth
                     id='outlined-uncontrolled'
                     select
                     label='Occupation'
                     defaultValue='Head of Shrubbery'
                     onChange={(e) => {
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
                     margin='dense'
                     id='outlined-uncontrolled'
                     select
                     label='State'
                     defaultValue='Alabama'
                     onChange={(e) => {
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
                     id='outlined'
                     aria-label='Submit'
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
