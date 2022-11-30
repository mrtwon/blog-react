import React, { useEffect, useState } from 'react';

import './App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  Route,
  Routes
} from 'react-router-dom';
import { RedirectComponent } from './components/RedirectComponent';
import { RegistrationComponent } from './components/RegistrationComponent';
import { LoginComponent } from './components/LoginComponent';
import { CreatePostComponent } from './components/CreatePostComponent';
import { PostComponent } from './components/PostComponent';
import { GlobalComponent } from './components/GlobalComponent';
import { PostListComponent } from './components/PostListComponent';
import { DashboardComponent } from './components/DashboardComponent';

function App() {
  return (
      <Routes>
        <Route path='/' element={<GlobalComponent/>}>
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/registration' element={<RegistrationComponent/>}/>
            <Route path='*' element={<h3>Not found</h3>}/>

            <Route path='/' element={<RedirectComponent/>}>
                <Route path='/dashboard' element={<DashboardComponent/>}/>
            </Route>
        </Route>
        
      </Routes>
  );
}

export default App;