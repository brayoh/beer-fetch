import React, { Fragment } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

// presentational components
import Title from '../../Text/Title';

const TwoLinesList = ({ title, description }) => {
  return (
    <Fragment>
      <Title style={{ position: 'relative', width: '100%' }}>{title}</Title>
      <Text
        style={{
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.54)',
          lineHeight: 20
        }}
      >
        {description}
      </Text>
    </Fragment>
  );
};

TwoLinesList.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default TwoLinesList;
