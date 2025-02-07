// src/Badge.jsx
import React from 'react';
import { Typography } from '@mui/material';

const Badge = ({ score }) => {
  let badge;

  if (score >= 10) {
    badge = "Gold";
  } else if (score >= 5) {
    badge = "Silver";
  } else {
    badge = "Bronze";
  }

  return <Typography variant="h6">You earned a {badge} badge!</Typography>;
};

export default Badge;
