import React, { useEffect } from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import './card.css'
import TodoCard from '../cards/TodoCard';
import GroceryCard from '../cards/GroceryCard';

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

  const clicked: EventListener = (e) => {
    const card = (e.target as HTMLDivElement);
    if (card.getAttribute('data-card')) {
      rearrange(parseInt(card.getAttribute('data-card') || '0', 10));
    }
  };

  const rearrange = (card: number) => {
    const cards = document.querySelectorAll('.cards .card') as NodeListOf<HTMLDivElement>;
    console.log(cards.length);
    
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
  };

  return (
    <div className="cards">
      <MuiCard className="fill-orange card" data-card="0">
        <div className="card__icon" data-icon="0"></div>
        <CardContent>
          <Typography variant="h5">details</Typography>
        </CardContent>
      </MuiCard>
      <MuiCard className="fill-blue card" data-card="1">
        <div className="card__icon" data-icon="1"></div>
        <TodoCard/>
      </MuiCard>
      <MuiCard className="fill-green card" data-card="2">
        <div className="card__icon" data-icon="2"></div>
        <CardContent>
          <Typography variant="h5">details</Typography>
        </CardContent>
      </MuiCard>
      <MuiCard className="fill-red card" data-card="3">
        <div className="card__icon" data-icon="3"></div>
        <CardContent>
          <Typography variant="h5">details</Typography>
        </CardContent>
      </MuiCard>
    </div>
  );
};

export default RotateCards;
