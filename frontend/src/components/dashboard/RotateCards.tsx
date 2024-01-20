import React, { useEffect } from 'react';
import { Card as MuiCard, CardContent, Typography, Grid, Button } from '@mui/material';
import './rotateCards.css';
import TodoCard from '../cards/TodoCard';
import GroceryCard from '../cards/GroceryCard';
import { Link } from 'react-router-dom';
import Chat from '../chat/Chat';
import WGnotLoggedIn from '../login/WGnotLoggedIn';
import MeAndAmigos from '../accountDetails/meAndAmigos';
import WGDetailsCard from '../cards/wgDetailsCard';

interface CardsProps {}

const RotateCards: React.FC<CardsProps> = () => {
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const cardsContainer = document.querySelector('.cards');
    if (cardsContainer) {
      const cards = cardsContainer.querySelectorAll('.card');
      cardsContainer.addEventListener('click', clicked as EventListener, false);
      (cards[1] as HTMLElement).click();
    }
  };

  //Needed so we can click to move around
  const clicked: EventListener = (e) => {
    const card = (e.target as HTMLDivElement);
    if (card.getAttribute('data-card')) {
      rearrange(parseInt(card.getAttribute('data-card') || '0', 10));
    }
  };

  //Reaarange Logic to make the card go around in correct order
  const rearrange = (card: number) => {
    const cards = document.querySelectorAll('.cards .card') as NodeListOf<HTMLDivElement>;
    
    for (let n = 0; n < cards.length; n++) {
      cards[n].classList.remove('card--left', 'card--center', 'card--right', 'card--hidden');
    }
    cards[card].classList.add('card--center');
    
  if (card === 0) {
    cards[3].classList.add('card--left');
    cards[1].classList.add('card--right');
    cards[2].classList.add('card--hidden');
  }

  if (card === 1) {
    cards[0].classList.add('card--left');
    cards[2].classList.add('card--right');
    cards[3].classList.add('card--hidden');
  }

  if (card === 2) {
    cards[1].classList.add('card--left');
    cards[3].classList.add('card--right');
    cards[0].classList.add('card--hidden');
  }

  if (card === 3) {
    cards[2].classList.add('card--left');
    cards[0].classList.add('card--right');
    cards[1].classList.add('card--hidden');
  }
  
  //card--front is used for making sure you can click around on the front card
  // Remove the 'card--front' class from all cards
  cards.forEach((card) => card.classList.remove('card--front'));

  // Add the 'card--front' class to the front card
  cards[card].classList.add('card--front');
  };


  const buttonStyles = {
    color: 'var(--primary)',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    '&:hover': {
      color: 'var(--highlight)',
    },
  };

  
  return (
    <div className="cards">
      {/* Orange Card with Shopping List */}
      <MuiCard className="fill-orange card" data-card="0">
        <Button className="full-width-button" sx={buttonStyles} component={Link} to="/cart">
          Shopping List
        </Button>
        <CardContent style={{ flex: 1 }}>
          <GroceryCard />
        </CardContent>
      </MuiCard>
      {/* Blue Card with Todo List */}
      <MuiCard className="fill-blue card" data-card="1">
        <Button className="full-width-button" sx={buttonStyles} component={Link} to="/todo">
          Todo List
        </Button>
        <CardContent style={{ flex: 1 }}>
          <TodoCard />
        </CardContent>
      </MuiCard>
      {/* Green Card with Chat */}
      <MuiCard className="fill-green card" data-card="2">
        <Button className="full-width-button" sx={buttonStyles} component={Link} to="/chat">
          Chat
        </Button>
        <CardContent style={{ flex: 1 }}>
          <Chat />
        </CardContent>
      </MuiCard>
      {/* Purple Card */}
      <MuiCard className="fill-purple card" data-card="3">
        <Button className="full-width-button" sx={buttonStyles} component={Link} to="/wg-details">
         WG Details
        </Button>
        <CardContent className='card-detail'>
          <WGDetailsCard/>
        </CardContent>
      </MuiCard>
    </div>
  );
};

export default RotateCards;
