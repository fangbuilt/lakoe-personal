import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleChange = (e: any) => {
    setCount(e.target.value);
  };

  return (
    <Flex alignItems="center">
      <Button onClick={handleDecrement}>-</Button>
      <Input
        type="number"
        value={count}
        onChange={handleChange}
        name="calculation"
      />
      <Button onClick={handleIncrement}>+</Button>
    </Flex>
  );
};

export default Counter;
