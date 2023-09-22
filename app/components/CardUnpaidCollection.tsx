import React from 'react';
import UnpaidCard from './CardUnpaid';
import CardReadyToShip from './CardReadyToShip';
import CardCanceled from './CardCanceled';

const CardUnpaidCollection = () => {
  return (
    <>
      <UnpaidCard />
      <CardReadyToShip />
      <CardCanceled />
    </>
  );
};

export default CardUnpaidCollection;
